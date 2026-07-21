import express from 'express'
import { calculateSavings, checkEligibility } from '../utils/calculator.js'

const router = express.Router()

// POST /api/calculate - Calculate savings
router.post('/', (req, res) => {
  try {
    const {
      monthlyBill,
      monthlyConsumption,
      solarCapacity,
      state,
      consumerType,
      participantCount,
      formulation
    } = req.body

    const savings = calculateSavings({
      monthlyBill: parseFloat(monthlyBill),
      monthlyConsumption: parseFloat(monthlyConsumption),
      solarCapacity: parseFloat(solarCapacity),
      state,
      consumerType,
      participantCount: parseInt(participantCount) || 1,
      formulation: formulation || 'vnm'
    })

    res.json({
      success: true,
      data: savings,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// POST /api/calculate/eligibility - Check eligibility
router.post('/eligibility', (req, res) => {
  try {
    const { state, consumerType, formulation } = req.body

    const eligibility = checkEligibility({
      state,
      consumerType,
      formulation
    })

    res.json({
      success: true,
      data: eligibility,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// POST /api/calculate/batch - Batch calculate for comparison
router.post('/batch', (req, res) => {
  try {
    const { scenarios } = req.body // Array of calculation params

    if (!Array.isArray(scenarios) || scenarios.length === 0) {
      throw new Error('Batch request must contain array of scenarios')
    }

    const results = scenarios.map((scenario, idx) => {
      try {
        return {
          id: idx,
          status: 'success',
          data: calculateSavings({
            monthlyBill: parseFloat(scenario.monthlyBill),
            monthlyConsumption: parseFloat(scenario.monthlyConsumption),
            solarCapacity: parseFloat(scenario.solarCapacity),
            state: scenario.state,
            consumerType: scenario.consumerType || 'residential',
            participantCount: parseInt(scenario.participantCount) || 1,
            formulation: scenario.formulation || 'vnm'
          })
        }
      } catch (err) {
        return {
          id: idx,
          status: 'error',
          error: err.message
        }
      }
    })

    res.json({
      success: true,
      count: results.length,
      data: results,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

export default router
