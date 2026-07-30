// State-specific policies - Backend version
// Same data as frontend, centralized for API access

export const STATE_POLICIES = {
  karnataka: {
    name: 'Karnataka',
    regulatoryBody: 'KERC',
    retailTariff: {
      domestic: 5.80,
      commercial: 7.00,
      industrial: 4.50,
      agricultural: 7.46
    },
    genericTariff: 3.08,
    exportTariff: 2.31,
    capacityLimits: {
      vnm: { min: 5, max: 'sanctioned_load' },
      gnm: { min: 5, max: 'sanctioned_load' }
    },
    vnm: {
      eligible: ['domestic', 'group_housing', 'charitable', 'government', 'local_bodies'],
      billing: 'ratio-based',
      banking: false,
      bankingCharges: 0,
      withdrawalCharges: 0
    },
    gnm: {
      eligible: ['all'],
      billing: 'priority-based',
      banking: false,
      bankingCharges: 0,
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },
    systemCost: 35000,
    peakSunHours: 4.56,
    settlementPeriod: 'monthly'
  },

  rajasthan: {
    name: 'Rajasthan',
    regulatoryBody: 'RERC',
    retailTariff: {
      domestic: {
        type: 'telescopic',
        slabs: [
          { max: 50, rate: 4.75 },
          { max: 150, rate: 5.45 },
          { max: 300, rate: 6.50 },
          { max: Infinity, rate: 7.00 }
        ]
      },
      commercial: {
        type: 'flat',
        rate: 8.15
      },
      industrial: {
        type: 'flat',
        rate: 6.75
      },
      agricultural: {
        type: 'flat',
        rate: 1.88
      }
    },
    exportTariff: 3.26,
    capacityLimits: {
      vnm: { min: 1, max: 'sanctioned_load' },
      gnm: { min: 1, max: 'sanctioned_load' }
    },
    vnm: {
      eligible: ['all'],
      billing: 'ratio-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0
    },
    gnm: {
      eligible: ['all'],
      billing: 'priority-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },
    systemCost: 50000,
    peakSunHours: 5.8,
    settlementPeriod: 'monthly'
  },

  meghalaya: {
    name: 'Meghalaya',
    regulatoryBody: 'MSERC',
    retailTariff: {
      domestic: 5.05,
      commercial: 7.45,
      industrial: 6.60,
      agricultural: 3.15
    },
    exportTariff: null,
    capacityLimits: {
      vnm: { min: 5, max: 500 },
      gnm: { min: 5, max: 500 }
    },
    vnm: {
      eligible: ['domestic', 'agricultural', 'group_housing', 'charitable', 'government', 'local_bodies'],
      billing: 'ratio-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0
    },
    gnm: {
      eligible: ['domestic', 'agricultural', 'group_housing', 'charitable', 'government', 'local_bodies'],
      billing: 'priority-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },
    systemCost: null,
    peakSunHours: null,
    settlementPeriod: 'annual'
  },

  chhattisgarh: {
    name: 'Chhattisgarh',
    regulatoryBody: 'CSERC',
    retailTariff: {
      domestic: {
        type: 'telescopic',
        slabs: [
          { max: 100, rate: 4.10 },
          { max: 200, rate: 4.20 },
          { max: 400, rate: 5.60 },
          { max: 600, rate: 6.60 },
          { max: Infinity, rate: 8.30 }
        ]
      },
      commercial: {
        type: 'telescopic',
        slabs: [
          { max: 100, rate: 6.30 },
          { max: 400, rate: 7.30 },
          { max: Infinity, rate: 8.70 }
        ]
      },
      agricultural: {
        type: 'flat',
        rate: 5.80
      },
      industrial: {
        type: 'telescopic',
        slabs: [
          { max: 25, rate: 6.05 },
          { max: Infinity, rate: 6.80 }
        ]
      }
    },
    exportTariff: null,
    capacityLimits: {
      vnm: { min: 1, max: 500 },
      gnm: { min: 1, max: 500 }
    },
    vnm: {
      eligible: ['domestic', 'group_housing', 'government', 'local_bodies'],
      billing: 'ratio-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0
    },
    gnm: {
      eligible: ['all'],
      billing: 'priority-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },
    systemCost: null,
    peakSunHours: null,
    settlementPeriod: 'monthly'
  },

  delhi: {
    name: 'Delhi',
    regulatoryBody: 'DERC',
    retailTariff: {
      domestic: {
        type: 'telescopic',
        slabs: [
          { max: 200, rate: 3.00 },
          { max: 400, rate: 4.50 },
          { max: 800, rate: 6.50 },
          { max: 1200, rate: 7.00 },
          { max: Infinity, rate: 8.00 }
        ]
      },
      commercial: {
        type: 'flat',
        rate: 8.00
      },
      industrial: {
        type: 'flat',
        rate: 6.75
      },
      agricultural: {
        type: 'flat',
        rate: 1.00
      }
    },
    exportTariff: 5.80,
    capacityLimits: {
      vnm: { min: 1, max: 'sanctioned_load' },
      gnm: { min: 1, max: 'sanctioned_load' }
    },
    vnm: {
      eligible: ['residential', 'group_housing', 'charitable', 'government', 'local_bodies'],
      billing: 'ratio-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0
    },
    gnm: {
      eligible: ['all'],
      billing: 'priority-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },
    systemCost: 50000,
    peakSunHours: 5.3,
    settlementPeriod: 'monthly'
  },

  maharashtra: {
    name: 'Maharashtra',
    regulatoryBody: 'MERC',
    retailTariff: {
      domestic: {
        type: 'telescopic',
        slabs: [
          { max: 100, rate: 3.50 },
          { max: 300, rate: 5.25 },
          { max: 500, rate: 6.75 },
          { max: Infinity, rate: 8.00 }
        ]
      },
      commercial: {
        type: 'telescopic',
        slabs: [
          { max: 1000, rate: 8.50 },
          { max: Infinity, rate: 9.50 }
        ]
      },
      agricultural: {
        type: 'flat',
        rate: 4.00
      },
      industrial: {
        type: 'flat',
        rate: 7.25
      }
    },
    exportTariff: 4.88,
    capacityLimits: {
      vnm: { min: 1, max: 'sanctioned_load' },
      gnm: { min: 1, max: 'sanctioned_load' }
    },
    vnm: {
      eligible: ['residential', 'group_housing'],
      billing: 'ratio-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0
    },
    gnm: {
      eligible: ['all'],
      billing: 'priority-based',
      banking: true,
      bankingCharges: 0,
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },
    systemCost: 42500,
    peakSunHours: 4.9,
    settlementPeriod: 'monthly'
  }
}

export const getAverageTariff = (retailTariff, monthlyConsumption) => {
  if (typeof retailTariff === 'number') return retailTariff

  if (retailTariff.type === 'flat') return retailTariff.rate

  if (retailTariff.type === 'telescopic' && Array.isArray(retailTariff.slabs)) {
    let totalCharge = 0
    let currentUsage = 0

    for (const slab of retailTariff.slabs) {
      const slabSize = Math.min(slab.max, monthlyConsumption) - currentUsage
      if (slabSize <= 0) break
      totalCharge += slabSize * slab.rate
      currentUsage += slabSize
    }

    return totalCharge / monthlyConsumption
  }

  return null
}
