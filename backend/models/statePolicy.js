// State-specific policies - Backend version
// Accurately models Indian electricity regulations per state

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
    // Electricity Duty by consumer category (KERC regulation)
    electricityDuty: {
      domestic: 5,
      commercial: 12,
      industrial: 5,
      agricultural: 0
    },
    // Tax: Electricity is GST-exempt in India; set to 0
    taxPercentage: 0,
    // FAC (Fuel Adjustment Cost) - KERC publishes as % of energy charge
    fac: {
      type: 'percentage',
      value: 3
    },
    // Performance Ratio (PR) - accounts for inverter, wiring, soiling, temperature losses
    performanceRatio: 0.80,
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
    settlementPeriod: 'monthly',
    // Net metering configuration
    netMetering: {
      settlement: 'monthly',
      carryForward: false,
      exportCompensation: 'retail',
      exportRate: 2.31
    }
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
    electricityDuty: {
      domestic: 0,
      commercial: 0,
      industrial: 0,
      agricultural: 0
    },
    taxPercentage: 0,
    fac: {
      type: 'percentage',
      value: 3
    },
    performanceRatio: 0.80,
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
    settlementPeriod: 'monthly',
    netMetering: {
      settlement: 'monthly',
      carryForward: true,
      exportCompensation: 'retail',
      exportRate: 3.26
    }
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
    exportTariff: 3.80,
    electricityDuty: {
      domestic: 0,
      commercial: 0,
      industrial: 0,
      agricultural: 0
    },
    taxPercentage: 0,
    fac: {
      type: 'percentage',
      value: 2
    },
    performanceRatio: 0.75,
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
    systemCost: 50000,
    peakSunHours: 4.0,
    settlementPeriod: 'annual',
    netMetering: {
      settlement: 'annual',
      carryForward: true,
      exportCompensation: 'retail',
      exportRate: 3.80
    }
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
    exportTariff: 2.50,
    electricityDuty: {
      domestic: 5,
      commercial: 8,
      industrial: 3,
      agricultural: 0
    },
    taxPercentage: 0,
    fac: {
      type: 'percentage',
      value: 3
    },
    performanceRatio: 0.80,
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
    systemCost: 48000,
    peakSunHours: 4.6,
    settlementPeriod: 'monthly',
    netMetering: {
      settlement: 'monthly',
      carryForward: true,
      exportCompensation: 'retail',
      exportRate: 2.50
    }
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
    electricityDuty: {
      domestic: 0,
      commercial: 0,
      industrial: 0,
      agricultural: 0
    },
    taxPercentage: 0,
    fac: {
      type: 'percentage',
      value: 3
    },
    performanceRatio: 0.80,
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
    settlementPeriod: 'monthly',
    netMetering: {
      settlement: 'monthly',
      carryForward: true,
      exportCompensation: 'retail',
      exportRate: 5.80
    }
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
    electricityDuty: {
      domestic: 0,
      commercial: 0,
      industrial: 0,
      agricultural: 0
    },
    taxPercentage: 0,
    fac: {
      type: 'percentage',
      value: 3
    },
    performanceRatio: 0.80,
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
    settlementPeriod: 'monthly',
    netMetering: {
      settlement: 'monthly',
      carryForward: true,
      exportCompensation: 'retail',
      exportRate: 4.88
    }
  }
}

/**
 * Calculate energy charge for any tariff structure (flat, slab-based, or bare number)
 * Returns detailed breakdown including slab-by-slab usage
 */
export const calculateEnergyCharge = (units, tariffStructure) => {
  // Handle bare number (legacy format)
  if (typeof tariffStructure === 'number') {
    return {
      energyCharge: units * tariffStructure,
      effectiveTariff: tariffStructure,
      slabBreakdown: []
    }
  }

  // Handle flat tariff
  if (tariffStructure.type === 'flat') {
    return {
      energyCharge: units * tariffStructure.rate,
      effectiveTariff: tariffStructure.rate,
      slabBreakdown: [{ units, rate: tariffStructure.rate, charge: units * tariffStructure.rate }]
    }
  }

  // Handle slab-based (telescopic) tariff - THIS IS THE CRITICAL FIX FOR SLAB RECALCULATION
  if (tariffStructure.type === 'telescopic' && Array.isArray(tariffStructure.slabs)) {
    let totalCharge = 0
    let currentUsage = 0
    const slabBreakdown = []

    for (const slab of tariffStructure.slabs) {
      const slabSize = Math.min(slab.max, units) - currentUsage
      if (slabSize <= 0) break

      const slabCharge = slabSize * slab.rate
      totalCharge += slabCharge
      slabBreakdown.push({
        units: slabSize,
        rate: slab.rate,
        charge: slabCharge
      })
      currentUsage += slabSize
    }

    return {
      energyCharge: totalCharge,
      effectiveTariff: units > 0 ? totalCharge / units : 0,
      slabBreakdown
    }
  }

  return {
    energyCharge: 0,
    effectiveTariff: 0,
    slabBreakdown: []
  }
}

/**
 * Get average tariff (backward-compatible wrapper around calculateEnergyCharge)
 */
export const getAverageTariff = (retailTariff, monthlyConsumption) => {
  return calculateEnergyCharge(monthlyConsumption, retailTariff).effectiveTariff
}

/**
 * Get electricity duty percentage for a consumer type
 */
export const getElectricityDuty = (policy, consumerType) => {
  if (!policy.electricityDuty) return 0
  const normalizedType = consumerType.toLowerCase()
  return policy.electricityDuty[normalizedType] || 0
}

/**
 * Calculate FAC (Fuel Adjustment Cost)
 * Can be percentage-based or per-unit rate
 */
export const getFacCharge = (policy, energyCharge, units = 0) => {
  if (!policy.fac || policy.fac.value === 0) return 0

  if (policy.fac.type === 'percentage') {
    return (energyCharge * policy.fac.value) / 100
  } else if (policy.fac.type === 'perUnit') {
    return units * policy.fac.value
  }

  return 0
}

/**
 * Calculate PM Surya Ghar subsidy (central government scheme for residential solar)
 * Residential/Domestic: ₹30k (1kW) + ₹30k (2kW) + ₹18k (3kW) = ₹78k max
 * Non-residential: ₹0
 */
export const calculateSubsidy = (capacityKw, consumerType) => {
  // Only residential/domestic consumers eligible
  if (consumerType.toLowerCase() !== 'domestic' && consumerType.toLowerCase() !== 'residential') {
    return 0
  }

  // Subsidy tiers: ₹30k per kW for first 2 kW, ₹18k for 3rd kW, capped at ₹78k
  if (capacityKw <= 0) return 0
  if (capacityKw <= 2) return capacityKw * 30000
  if (capacityKw <= 3) return (2 * 30000) + ((capacityKw - 2) * 18000)
  return 78000 // Capped at ₹78k
}

/**
 * Get export rate for net metering based on state's settlement rules
 */
export const getNetMeteringRate = (policy) => {
  return policy.netMetering?.exportRate || policy.exportTariff || 0
}
