import express from 'express'
import { calculateBillSimulation } from '../utils/billingEngine.js'

const router = express.Router()

/**
 * POST /api/bill-simulator/calculate
 * Calculate solar savings based on actual bill data
 *
 * Request body:
 * {
 *   "monthlyConsumption": 1500,
 *   "sanctionedLoad": 12,
 *   "consumerType": "domestic",
 *   "fixedCharges": 250,
 *   "energyCharge": 8700,
 *   "facPercentage": 3,
 *   "dutyPercentage": 12,
 *   "taxPercentage": 5,
 *   "subsidyAmount": 0,
 *   "daytimeConsumptionPercent": 40
 * }
 */
router.post('/calculate', (req, res) => {
  try {
    const input = req.body

    // Validate required fields
    const required = ['monthlyConsumption', 'sanctionedLoad', 'fixedCharges', 'energyCharge']
    for (const field of required) {
      if (input[field] === undefined || input[field] === null) {
        return res.status(400).json({
          success: false,
          error: `Missing required field: ${field}`
        })
      }
    }

    // Calculate
    const result = calculateBillSimulation(input)

    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * POST /api/bill-simulator/demo
 * Demo calculation with sample bill data
 */
router.post('/demo', (req, res) => {
  try {
    const demoInput = {
      monthlyConsumption: 1500,
      sanctionedLoad: 12,
      consumerType: 'domestic',
      fixedCharges: 250,
      energyCharge: 8700,
      facPercentage: 3,
      dutyPercentage: 12,
      taxPercentage: 5,
      subsidyAmount: 0,
      daytimeConsumptionPercent: 40
    }

    const result = calculateBillSimulation(demoInput)

    res.json({
      success: true,
      message: 'Demo calculation',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
})

export default router
