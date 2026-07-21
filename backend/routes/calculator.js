import express from 'express'
import { calculateSavings } from '../utils/savingsCalculator.js'

const router = express.Router()

/**
 * POST /api/calculate
 * Calculate savings based on bill data
 *
 * Request body:
 * {
 *   "monthlyConsumption": 1000,      // kWh
 *   "sanctionedLoad": 10,            // kW
 *   "importRate": 5.80,              // ₹/kWh (optional, uses default if not provided)
 *   "consumerType": "domestic"       // domestic, commercial, industrial, agricultural
 * }
 *
 * Response: Complete savings analysis with before/after bills, per-unit cost reduction, etc.
 */
router.post('/calculate', (req, res) => {
  try {
    const billData = req.body

    // Validation
    if (!billData.monthlyConsumption) {
      return res.status(400).json({
        error: 'Missing required field: monthlyConsumption (in kWh)'
      })
    }

    if (!billData.sanctionedLoad) {
      return res.status(400).json({
        error: 'Missing required field: sanctionedLoad (in kW)'
      })
    }

    // Calculate
    const analysis = calculateSavings(billData)

    // Return
    res.json({
      success: true,
      data: analysis
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * GET /api/calculate/demo
 * Demo calculation with example data
 */
router.get('/demo', (req, res) => {
  try {
    const demoData = {
      monthlyConsumption: 1000,
      sanctionedLoad: 10,
      importRate: 5.80,
      consumerType: 'domestic'
    }

    const analysis = calculateSavings(demoData)

    res.json({
      success: true,
      message: 'Demo calculation with example data (1000 kWh monthly consumption)',
      data: analysis
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
})

export default router
