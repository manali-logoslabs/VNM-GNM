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

  maharashtra: {
    name: 'Maharashtra',
    regulatoryBody: 'MERC',
    retailTariff: {
      domestic: 5.65,
      commercial: 9.22,
      industrial: 8.17,
      agricultural: 5.50
    },
    exportTariff: null,
    capacityLimits: {
      vnm: { min: 1, max: 1000 },
      gnm: { min: 1, max: 1000 }
    },
    vnm: {
      eligible: ['residential'],
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
      withdrawalCharges: 0
    },
    systemCost: null,
    peakSunHours: null,
    settlementPeriod: 'monthly'
  },

  rajasthan: {
    name: 'Rajasthan',
    regulatoryBody: 'RERC',
    retailTariff: {
      domestic: 6.00,
      commercial: 7.75,
      industrial: 6.25,
      agricultural: 6.13
    },
    exportTariff: null,
    capacityLimits: {
      vnm: { min: 1, max: 1000 },
      gnm: { min: 1, max: 1000 }
    },
    vnm: {
      eligible: ['all'],
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
      withdrawalCharges: 0
    },
    systemCost: null,
    peakSunHours: null,
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
