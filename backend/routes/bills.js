import express from 'express'
import multer from 'multer'
import Tesseract from 'tesseract.js'

const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
})

// POST /api/bills/extract - Extract data from bill image
router.post('/extract', upload.single('bill'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      })
    }

    // Convert buffer to base64
    const base64Image = req.file.buffer.toString('base64')
    const dataUrl = `data:${req.file.mimetype};base64,${base64Image}`

    // Run OCR
    const result = await Tesseract.recognize(dataUrl, 'eng')
    const ocrText = result.data.text

    // Extract key information using regex
    const extractedData = extractBillInfo(ocrText)

    res.json({
      success: true,
      data: {
        serviceNumber: extractedData.accountNumber || 'Unknown',
        tariffCategory: extractedData.consumerType || 'domestic',
        monthlyConsumptionKwh: extractedData.monthlyConsumption || 0,
        sanctionedLoadKw: 10, // Default value
        fixedChargeRupees: 0,
        energyChargeRupees: extractedData.monthlyBill || 0,
        facChargeRupees: 0,
        electricityDutyRupees: 0,
        taxesRupees: 0,
        subsidyRupees: 0,
        totalBillRupees: extractedData.monthlyBill || 0,
        ocrConfidence: result.data.confidence || 0,
        ocrText: ocrText,
        state: extractedData.state || null
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('OCR Error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Bill parsing failed'
    })
  }
})

// Helper function to extract bill information
function extractBillInfo(text) {
  const extracted = {
    state: null,
    consumerType: null,
    monthlyBill: null,
    monthlyConsumption: null,
    accountNumber: null,
    consumerName: null,
    billDate: null,
    confidence: {}
  }

  // Try to detect state from text
  const statePatterns = {
    karnataka: /karnataka|bescom|mescom|cesc|hescom|gescom/i,
    maharashtra: /maharashtra|msedcl|deesl|iwtdcl/i,
    rajasthan: /rajasthan|jvvnl|pvvnl|avvnl|dbf/i,
    meghalaya: /meghalaya|mepdcl/i,
    chhattisgarh: /chhattisgarh|cseb|desco|wesco|southco/i
  }

  for (const [state, pattern] of Object.entries(statePatterns)) {
    if (pattern.test(text)) {
      extracted.state = state
      extracted.confidence.state = 0.85
      break
    }
  }

  // Try to detect consumer type
  const typePatterns = {
    residential: /residential|domestic|house|apartment/i,
    commercial: /commercial|business|shop|office/i,
    industrial: /industrial|industry|factory/i,
    agricultural: /agricultural|agriculture|farm|farming/i,
    government: /government|govt|municipal|municipal corporation/i
  }

  for (const [type, pattern] of Object.entries(typePatterns)) {
    if (pattern.test(text)) {
      extracted.consumerType = type
      extracted.confidence.consumerType = 0.75
      break
    }
  }

  // Extract monthly bill amount
  const billMatch = text.match(/(?:bill|amount|total|payable)\s*:?\s*₹?\s*([\d,]+(?:\.\d{2})?)/i)
  if (billMatch) {
    extracted.monthlyBill = parseFloat(billMatch[1].replace(/,/g, ''))
    extracted.confidence.monthlyBill = 0.80
  }

  // Extract monthly consumption (kWh)
  const consumptionMatch = text.match(/(?:consumption|units?|kwh|energy|units consumed)\s*:?\s*([\d,]+(?:\.\d{2})?)/i)
  if (consumptionMatch) {
    extracted.monthlyConsumption = parseFloat(consumptionMatch[1].replace(/,/g, ''))
    extracted.confidence.monthlyConsumption = 0.80
  }

  // Extract account/consumer number
  const accountMatch = text.match(/(?:account|consumer|reference|number)\s*(?:no\.?|number|#)?\s*:?\s*([a-zA-Z0-9-/]+)/i)
  if (accountMatch) {
    extracted.accountNumber = accountMatch[1].trim()
    extracted.confidence.accountNumber = 0.70
  }

  // Extract consumer name
  const nameMatch = text.match(/(?:consumer|customer|name)\s*(?:name)?\s*:?\s*([a-zA-Z\s]+)/i)
  if (nameMatch) {
    extracted.consumerName = nameMatch[1].trim()
    extracted.confidence.consumerName = 0.65
  }

  // Extract bill date
  const dateMatch = text.match(/(?:bill|date|issue)\s*(?:date)?\s*:?\s*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i)
  if (dateMatch) {
    extracted.billDate = dateMatch[1]
    extracted.confidence.billDate = 0.75
  }

  return extracted
}

// POST /api/bills/manual - Save manual bill data (for when OCR fails)
router.post('/manual', (req, res) => {
  try {
    const { state, consumerType, monthlyBill, monthlyConsumption, accountNumber } = req.body

    if (!state || !consumerType || !monthlyBill || !monthlyConsumption) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: state, consumerType, monthlyBill, monthlyConsumption'
      })
    }

    res.json({
      success: true,
      data: {
        state,
        consumerType,
        monthlyBill: parseFloat(monthlyBill),
        monthlyConsumption: parseFloat(monthlyConsumption),
        accountNumber,
        source: 'manual_entry'
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

export default router
