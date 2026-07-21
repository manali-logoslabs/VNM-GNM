/**
 * BILL PARSER V3 - Python OCR Service
 * Sends bill image to Python backend for reliable OCR extraction
 */

export const parseBill = async (imageFile, onProgress) => {
  return new Promise((resolve, reject) => {
    try {
      const formData = new FormData()
      formData.append('file', imageFile)

      if (onProgress) onProgress({ progress: 0.1 })

      fetch('http://localhost:5001/api/ocr/extract', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (onProgress) onProgress({ progress: 0.5 })
          return response.json()
        })
        .then(data => {
          if (onProgress) onProgress({ progress: 1.0 })

          if (!data.success) {
            reject(new Error(data.error || 'OCR extraction failed'))
            return
          }

          resolve(data.data)
        })
        .catch(error => {
          reject(new Error(`Python OCR failed: ${error.message}`))
        })
    } catch (error) {
      reject(error)
    }
  })
}

export const validateExtractedData = (data) => {
  const issues = []
  if (!data.monthlyConsumptionKwh || data.monthlyConsumptionKwh <= 0) {
    issues.push('Monthly consumption not detected')
  }
  if (!data.energyChargeRupees || data.energyChargeRupees <= 0) {
    issues.push('Energy charge not detected')
  }
  return {
    isValid: issues.length === 0,
    issues,
    confidence: data.ocrConfidence || 85
  }
}

export default { parseBill, validateExtractedData }
