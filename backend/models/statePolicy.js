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
          { max: 150, rate: 6.00 },
          { max: 500, rate: 7.00 },
          { max: Infinity, rate: 7.50 }
        ]
      },
      commercial: {
        type: 'flat',
        rate: 8.15
      },
      industrial: {
        type: 'flat',
        rate: 6.00
      },
      agricultural: {
        type: 'flat',
        rate: 1.75
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
        rate: 6.00
      },
      industrial: {
        type: 'flat',
        rate: 7.75
      },
      agricultural: {
        type: 'flat',
        rate: 1.50
      }
    },
    exportTariff: 0,
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
    systemCost: 47500,
    peakSunHours: 5.3,
    settlementPeriod: 'monthly',
    netMetering: {
      settlement: 'monthly',
      carryForward: true,
      exportCompensation: 'net_metering_1to1',
      exportRate: 0
    },
    // Annual Settlement for 1:1 Net Metering (DERC Rule: surplus NOT credited at full retail)
    annualSettlement: {
      appcRate: 3.50,  // Average Power Purchase Cost (APPC) for FY 2025-26
      appcRateSource: 'DERC Tariff Order FY 2025-26',
      appcRateLastUpdated: '2025-06-15',
      settlementMethod: 'appc',  // 'appc' = reduced rate, 'forfeited' = ₹0, 'carry_forward' = next year
      description: 'Annual surplus (generation > consumption) credited at APPC rate, not full retail tariff'
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

/**
 * Calculate Annual Settlement Credit (Delhi specific)
 * For states with 1:1 net metering + annual settlement
 * DERC Rule: "Surplus NOT credited at full retail tariff"
 *
 * Calculation:
 * - If annual surplus > 0: Credit at APPC rate (reduced from retail)
 * - If annual net import: No settlement credit (already paid via monthly bills)
 */
export const calculateAnnualSettlement = (annualSurplusKwh, policy) => {
  if (!policy.annualSettlement) return { credit: 0, surplusKwh: 0, method: 'none' }
  if (annualSurplusKwh <= 0) return { credit: 0, surplusKwh: 0, method: 'none' }

  const { appcRate, settlementMethod } = policy.annualSettlement

  let settlementCredit = 0
  if (settlementMethod === 'appc') {
    // Credit at APPC rate (50-70% of retail rate)
    settlementCredit = annualSurplusKwh * appcRate
  } else if (settlementMethod === 'forfeited') {
    // Surplus forfeited (no compensation)
    settlementCredit = 0
  } else if (settlementMethod === 'carry_forward') {
    // Carry forward to next year (no settlement this year)
    settlementCredit = 0
  }

  return {
    surplusKwh: Math.round(annualSurplusKwh),
    appcRate: appcRate,
    credit: Math.round(settlementCredit),
    method: settlementMethod,
    explanation: `${annualSurplusKwh.toFixed(0)} kWh × ₹${appcRate}/kWh = ₹${settlementCredit.toFixed(0)} (DERC annual settlement)`
  }
}
