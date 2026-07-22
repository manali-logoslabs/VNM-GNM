"""
Real OCR Service - Extracts text from actual bill images using Tesseract
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract
import io
import re
import os

app = Flask(__name__)
CORS(app)

def preprocess_image(image):
    """Enhance image for better OCR accuracy"""
    # Increase contrast
    from PIL import ImageEnhance
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.5)

    # Increase sharpness
    enhancer = ImageEnhance.Sharpness(image)
    image = enhancer.enhance(1.5)

    return image

def extract_bill_data(text):
    """Extract structured bill data from OCR text"""
    data = {
        'serviceNumber': None,
        'tariffCategory': 'domestic',
        'monthlyConsumptionKwh': 0,
        'sanctionedLoadKw': 0,
        'fixedChargeRupees': 0,
        'energyChargeRupees': 0,
        'facChargeRupees': 0,
        'electricityDutyRupees': 0,
        'taxesRupees': 0,
        'subsidyRupees': 0,
        'totalBillRupees': 0,
        'state': None
    }

    upper = text.upper()

    # Find all numbers (including decimals), but exclude years (1900-2100)
    all_numbers = re.findall(r'(\d+\.?\d*)', text)
    numbers = []
    for num_str in all_numbers:
        try:
            num = float(num_str)
            # Skip year-like numbers
            if not (1900 <= num <= 2100):
                numbers.append(num_str)
        except:
            pass

    # Extract consumption - support multiple bill formats
    # Try various patterns used by different utilities
    consumption_patterns = [
        r'UNIT\s+KWH\s+BILLED\s*:?\s*([\d.]+)',  # BESCOM
        r'UNITS?\s+CONSUMED\s*:?\s*([\d.]+)',     # MSEDCL, DEESL
        r'BILLED\s+UNIT(?:S)?\s*:?\s*([\d.]+)',   # Generic
        r'CONSUMPTION\s*:?\s*([\d.]+)',            # Generic
        r'TOTAL\s+UNITS?\s*:?\s*([\d.]+)',        # Generic
    ]

    for pattern in consumption_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            try:
                num = float(match.group(1))
                if 40 < num < 800:
                    data['monthlyConsumptionKwh'] = num
                    break
            except:
                pass

    # If still not found, search in text with flexible keywords
    if data['monthlyConsumptionKwh'] == 0:
        for num_str in numbers:
            try:
                num = float(num_str)
                if 40 < num < 800:
                    idx = text.upper().find(num_str)
                    if idx != -1:
                        context = text[max(0, idx-150):min(len(text), idx+150)].upper()
                        if any(kw in context for kw in ['KWH', 'UNIT', 'CONSUMPTION', 'BILLED', 'CONSUMED']):
                            data['monthlyConsumptionKwh'] = num
                            break
            except:
                pass

    # Extract energy charge - support multiple bill formats
    # ONLY extract if clearly found - if uncertain, leave as 0
    energy_patterns = [
        r'ENERGY\s+CHARGES?\s*:?\s*([\d.]+)',        # BESCOM
        r'ENERGY\s+CHARGE\s+AMOUNT\s*:?\s*([\d.]+)',  # MSEDCL
        r'ELECTRICITY\s+CHARGES?\s*:?\s*([\d.]+)',    # Generic
        r'POWER\s+CHARGES?\s*:?\s*([\d.]+)',          # Generic
        r'UNITS?\s+CHARGE\s*:?\s*([\d.]+)',           # Generic
    ]

    for pattern in energy_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            try:
                charge = float(match.group(1))
                if 50 < charge < 5000:  # Sanity check
                    data['energyChargeRupees'] = charge
                    data['totalBillRupees'] = charge
                    break
            except:
                pass

    # If energy charge NOT found in text, leave as 0 (user will fill manually)

    # Extract sanctioned load - support multiple bill formats
    load_patterns = [
        r'SANCTIONED\s+LOAD\s*:?\s*([\d.]+)',     # BESCOM, MSEDCL
        r'SANCTIONED\s+CAPACITY\s*:?\s*([\d.]+)', # Generic
        r'LOAD\s+LIMIT\s*:?\s*([\d.]+)',          # Generic
        r'(?:KN|CAPACITY)\s*:?\s*([\d.]+)',       # Abbreviated
    ]

    for pattern in load_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            try:
                num = float(match.group(1))
                if 0.5 < num < 20:
                    data['sanctionedLoadKw'] = num
                    break
            except:
                pass

    # If not found via pattern, search in text
    if data['sanctionedLoadKw'] == 0:
        for num_str in numbers:
            try:
                num = float(num_str)
                if 0.5 < num < 20:
                    idx = text.upper().find(num_str)
                    if idx != -1:
                        context = text[max(0, idx-100):min(len(text), idx+100)].upper()
                        if any(kw in context for kw in ['SANCTIONED', 'LOAD', 'CAPACITY']):
                            data['sanctionedLoadKw'] = num
                            break
            except:
                pass

    # Leave as 0 if not found - user can enter manually

    # Extract service/account/consumer number (long digit sequences)
    for num_str in numbers:
        if len(num_str) >= 9 and '.' not in num_str:
            data['serviceNumber'] = num_str
            break

    # Detect tariff category
    if 'DOMESTIC' in upper or 'DS' in upper or 'RESIDENTIAL' in upper:
        data['tariffCategory'] = 'domestic'
    elif 'COMMERCIAL' in upper or 'CS' in upper:
        data['tariffCategory'] = 'commercial'
    elif 'INDUSTRIAL' in upper or 'IS' in upper:
        data['tariffCategory'] = 'industrial'
    elif 'AGRICULTURAL' in upper or 'AS' in upper:
        data['tariffCategory'] = 'agricultural'

    # Detect state from bill text - support multiple utilities
    state_patterns = {
        'karnataka': [r'KARNATAKA', r'BESCOM', r'MESCOM', r'CESC', r'HESCOM', r'GESCOM'],
        'maharashtra': [r'MAHARASHTRA', r'MSEDCL', r'DEESL', r'IWTDCL'],
        'rajasthan': [r'RAJASTHAN', r'JVVNL', r'PVVNL', r'AVVNL', r'DBF'],
        'delhi': [r'DELHI', r'DISCOM', r'BRPL', r'BYPL', r'NDPL'],
        'tamilnadu': [r'TAMIL NADU', r'TANGEDCO'],
        'punjab': [r'PUNJAB', r'PSPCL'],
        'uttarpradesh': [r'UTTAR PRADESH', r'UPPCL', r'LESCO'],
        'westbengal': [r'WEST BENGAL', r'WBSEDCL'],
    }

    for state, patterns in state_patterns.items():
        for pattern in patterns:
            if re.search(pattern, upper):
                data['state'] = state
                break
        if data['state']:
            break

    return data


@app.route('/api/ocr/extract', methods=['POST'])
def extract_ocr():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'No file uploaded'}), 400

        file = request.files['file']
        if not file or file.filename == '':
            return jsonify({'success': False, 'error': 'Invalid file'}), 400

        # Read and process image
        try:
            image = Image.open(io.BytesIO(file.read()))

            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')

            # Preprocess for better OCR
            image = preprocess_image(image)

        except Exception as e:
            return jsonify({'success': False, 'error': f'Cannot read image: {str(e)}'}), 400

        # Extract text using Tesseract OCR
        try:
            ocr_text = pytesseract.image_to_string(image)
        except Exception as e:
            return jsonify({
                'success': False,
                'error': f'OCR processing failed: {str(e)}. Make sure Tesseract is installed: brew install tesseract'
            }), 500

        if not ocr_text or len(ocr_text.strip()) < 10:
            return jsonify({'success': False, 'error': 'Could not extract text from image. Try a clearer bill photo.'}), 400

        # Debug: save OCR text to file
        with open('/tmp/ocr_extracted.txt', 'w') as f:
            f.write(ocr_text)

        # Extract structured data from OCR text
        extracted = extract_bill_data(ocr_text)

        return jsonify({
            'success': True,
            'data': {
                'extracted': extracted,
                'confidence': 0.85,
                'fullText': ocr_text,
                'serviceNumber': extracted['serviceNumber'],
                'tariffCategory': extracted['tariffCategory'],
                'monthlyConsumptionKwh': extracted['monthlyConsumptionKwh'],
                'sanctionedLoadKw': extracted['sanctionedLoadKw'],
                'fixedChargeRupees': extracted['fixedChargeRupees'],
                'energyChargeRupees': extracted['energyChargeRupees'],
                'facChargeRupees': extracted['facChargeRupees'],
                'electricityDutyRupees': extracted['electricityDutyRupees'],
                'taxesRupees': extracted['taxesRupees'],
                'subsidyRupees': extracted['subsidyRupees'],
                'totalBillRupees': extracted['totalBillRupees'],
                'ocrConfidence': 85,
                'ocrText': ocr_text,
                'state': extracted['state']
            }
        })

    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/', methods=['GET', 'HEAD'])
def root():
    return jsonify({'status': 'OCR service ready'}), 200


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OCR service running'}), 200


if __name__ == '__main__':
    print("🚀 Real OCR Service running on http://0.0.0.0:5001")
    print("📸 Extracts text from any electricity bill image")
    app.run(debug=False, port=5001, host='0.0.0.0')
