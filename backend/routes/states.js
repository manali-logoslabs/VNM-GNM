import express from 'express'
import { STATE_POLICIES } from '../models/statePolicy.js'

const router = express.Router()

// GET /api/states - Get all states
router.get('/', (req, res) => {
  try {
    const states = Object.entries(STATE_POLICIES).map(([key, policy]) => ({
      key,
      name: policy.name,
      regulatoryBody: policy.regulatoryBody,
      settlementPeriod: policy.settlementPeriod,
      vnmAvailable: policy.vnm.eligible.length > 0,
      gnmAvailable: policy.gnm.eligible.length > 0
    }))

    res.json({
      success: true,
      count: states.length,
      data: states,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// GET /api/states/:state - Get specific state policy
router.get('/:state', (req, res) => {
  try {
    const state = req.params.state.toLowerCase()
    const policy = STATE_POLICIES[state]

    if (!policy) {
      return res.status(404).json({
        success: false,
        error: `State "${state}" not found`
      })
    }

    res.json({
      success: true,
      data: {
        key: state,
        ...policy
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

// GET /api/states/:state/tariffs - Get tariffs for state
router.get('/:state/tariffs', (req, res) => {
  try {
    const state = req.params.state.toLowerCase()
    const policy = STATE_POLICIES[state]

    if (!policy) {
      return res.status(404).json({
        success: false,
        error: `State "${state}" not found`
      })
    }

    res.json({
      success: true,
      data: {
        state: policy.name,
        retailTariff: policy.retailTariff,
        exportTariff: policy.exportTariff,
        genericTariff: policy.genericTariff,
        systemCost: policy.systemCost,
        peakSunHours: policy.peakSunHours
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

// GET /api/states/:state/eligibility - Get eligibility rules
router.get('/:state/eligibility', (req, res) => {
  try {
    const state = req.params.state.toLowerCase()
    const policy = STATE_POLICIES[state]

    if (!policy) {
      return res.status(404).json({
        success: false,
        error: `State "${state}" not found`
      })
    }

    res.json({
      success: true,
      data: {
        state: policy.name,
        regulatoryBody: policy.regulatoryBody,
        vnm: {
          available: policy.vnm.eligible.length > 0,
          eligible: policy.vnm.eligible,
          billing: policy.vnm.billing,
          banking: policy.vnm.banking,
          capacityLimits: policy.capacityLimits.vnm
        },
        gnm: {
          available: policy.gnm.eligible.length > 0,
          eligible: policy.gnm.eligible,
          billing: policy.gnm.billing,
          banking: policy.gnm.banking,
          capacityLimits: policy.capacityLimits.gnm
        }
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

// GET /api/states/compare - Compare multiple states
router.get('/compare/rates', (req, res) => {
  try {
    const { states } = req.query
    const stateList = states ? states.split(',') : Object.keys(STATE_POLICIES)

    const comparison = stateList.map(s => {
      const state = s.toLowerCase()
      const policy = STATE_POLICIES[state]
      if (!policy) return null

      return {
        state: policy.name,
        retailTariffDomestic: typeof policy.retailTariff.domestic === 'number'
          ? policy.retailTariff.domestic
          : 'Telescopic',
        exportTariff: policy.exportTariff || 'Needs external data',
        systemCost: policy.systemCost || 'Needs external data',
        peakSunHours: policy.peakSunHours || 'Needs external data'
      }
    }).filter(Boolean)

    res.json({
      success: true,
      count: comparison.length,
      data: comparison,
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
