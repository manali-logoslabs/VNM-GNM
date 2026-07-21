/**
 * SAVINGS CALCULATOR - Simple, Direct Implementation
 * Based on KERC Tariff Order 2025-26 and BESCOM VNM/GNM SOP
 *
 * Formula Reference:
 * 1. Annual Solar Generation = Capacity × Peak Sun Hours × 365 × 0.85 (Losses)
 * 2. Self-Consumption Savings = (Solar Generation × 0.60) × Import Rate
 * 3. Export Earnings = (Solar Generation × 0.40) × Export Rate
 * 4. Total Annual Savings = Self-Consumption + Export Earnings
 * 5. Payback Period = System Cost ÷ Annual Savings
 * 6. 25-Year Projection = Annual Savings × Years × Degradation Factor
 * 7. CO2 Reduction = Solar Generation × 0.82 kg/kWh
 */

const CONSTANTS = {
  // Peak Sun Hours for Karnataka
  PEAK_SUN_HOURS: 4.56,

  // System Losses (inverter, wiring, shading, temperature)
  SYSTEM_LOSSES: 0.15,

  // Energy Split
  SELF_CONSUMPTION_RATIO: 0.60,
  EXPORT_RATIO: 0.40,

  // System Cost per kW
  SYSTEM_COST_PER_KW: 35000,

  // CO2 Offset Factor
  CO2_OFFSET_PER_KWH: 0.82,

  // Panel Degradation per Year
  DEGRADATION_PER_YEAR: 0.008, // 0.8% annual degradation

  // Tariff Rates (from KERC Tariff Order 2025-26)
  TARIFFS: {
    domestic: {
      import: 5.80,
      export: 2.31 // 75% of 3.08 generic tariff
    },
    commercial: {
      import: 7.00,
      export: 2.31 // 75% of 3.08 generic tariff
    },
    industrial: {
      import: 4.50,
      export: 2.31
    },
    agricultural: {
      import: 7.46,
      export: 2.31
    }
  },

  // Days per year
  DAYS_PER_YEAR: 365,

  // 25-year degradation factors
  DEGRADATION_FACTORS: {
    1: 1.00,
    5: 0.95,
    10: 0.92,
    25: 0.80
  }
}

/**
 * Main calculation function
 * @param {Object} billData - Extracted bill data
 * @returns {Object} Complete savings analysis
 */
export const calculateSavings = (billData) => {
  const {
    monthlyConsumption,      // kWh (e.g., 1000)
    sanctionedLoad,          // kW (e.g., 10)
    importRate,              // ₹/kWh (e.g., 5.80)
    consumerType = 'domestic' // domestic, commercial, industrial, agricultural
  } = billData

  // Validation
  if (!monthlyConsumption || monthlyConsumption <= 0) {
    throw new Error('Monthly consumption must be a positive number')
  }
  if (!sanctionedLoad || sanctionedLoad <= 0) {
    throw new Error('Sanctioned load must be a positive number')
  }

  // Use provided importRate or get default from tariffs
  const tariff = CONSTANTS.TARIFFS[consumerType.toLowerCase()] || CONSTANTS.TARIFFS.domestic
  const finalImportRate = importRate || tariff.import
  const exportRate = tariff.export

  // ============================================
  // STEP 1: RECOMMEND SOLAR CAPACITY
  // ============================================
  // Recommendation: 80% of monthly consumption = annual capacity
  const recommendedCapacity = Math.round((monthlyConsumption * 12 * 0.80) / (CONSTANTS.PEAK_SUN_HOURS * CONSTANTS.DAYS_PER_YEAR) * 10) / 10

  // Ensure within constraints
  const minCapacity = 5 // kW (from KERC regulations)
  const maxCapacity = sanctionedLoad // Can't exceed sanctioned load
  const solarCapacity = Math.max(minCapacity, Math.min(recommendedCapacity, maxCapacity))

  // ============================================
  // STEP 2: CALCULATE ANNUAL SOLAR GENERATION
  // ============================================
  // Formula: Capacity × Peak Sun Hours × 365 × 0.85 (losses)
  const annualSolarGenerationGross = solarCapacity * CONSTANTS.PEAK_SUN_HOURS * CONSTANTS.DAYS_PER_YEAR
  const annualSolarGenerationUsable = annualSolarGenerationGross * (1 - CONSTANTS.SYSTEM_LOSSES)
  const monthlySolarGenerationUsable = annualSolarGenerationUsable / 12

  // ============================================
  // STEP 3: SPLIT INTO SELF-CONSUMED VS EXPORTED
  // ============================================
  const annualSelfConsumedEnergy = annualSolarGenerationUsable * CONSTANTS.SELF_CONSUMPTION_RATIO
  const annualExportedEnergy = annualSolarGenerationUsable * CONSTANTS.EXPORT_RATIO

  const monthlySelfConsumedEnergy = annualSelfConsumedEnergy / 12
  const monthlyExportedEnergy = annualExportedEnergy / 12

  // ============================================
  // STEP 4: CALCULATE SAVINGS
  // ============================================
  // Self-consumption: How much you save by NOT buying from grid
  const annualSelfConsumptionSavings = annualSelfConsumedEnergy * finalImportRate

  // Export earnings: How much you earn by selling surplus
  const annualExportEarnings = annualExportedEnergy * exportRate

  // Total annual savings
  const totalAnnualSavings = annualSelfConsumptionSavings + annualExportEarnings
  const monthlyAverageSavings = totalAnnualSavings / 12

  // ============================================
  // STEP 5: CALCULATE BEFORE/AFTER BILLS
  // ============================================
  const monthlyConsumptionCost = monthlyConsumption * finalImportRate
  const monthlyBillBefore = monthlyConsumptionCost // Simplified (not including fixed charges for now)

  // After solar: reduced consumption
  const consumptionAfterSolar = Math.max(0, monthlyConsumption - monthlySelfConsumedEnergy)
  const monthlyBillAfter = (consumptionAfterSolar * finalImportRate) - (monthlyExportedEnergy * exportRate)

  const monthlySavingsAmount = monthlyBillBefore - monthlyBillAfter

  // ============================================
  // STEP 6: PER-UNIT COST REDUCTION
  // ============================================
  const perUnitCostBefore = finalImportRate // ₹/kWh
  const perUnitCostAfter = monthlyBillAfter > 0
    ? (monthlyBillAfter / monthlyConsumption).toFixed(2)
    : 0
  const perUnitReduction = (perUnitCostBefore - perUnitCostAfter).toFixed(2)
  const percentReduction = ((perUnitReduction / perUnitCostBefore) * 100).toFixed(1)

  // ============================================
  // STEP 7: PAYBACK PERIOD
  // ============================================
  const totalSystemCost = solarCapacity * CONSTANTS.SYSTEM_COST_PER_KW
  const paybackYears = totalSystemCost / totalAnnualSavings
  const paybackMonths = paybackYears * 12

  // ============================================
  // STEP 8: 25-YEAR PROJECTION WITH DEGRADATION
  // ============================================
  const projections = {}
  for (const [year, degradationFactor] of Object.entries(CONSTANTS.DEGRADATION_FACTORS)) {
    projections[`year${year}`] = Math.round(totalAnnualSavings * year * degradationFactor)
  }

  // ============================================
  // STEP 9: CO2 REDUCTION
  // ============================================
  const annualCO2ReductionKg = annualSolarGenerationUsable * CONSTANTS.CO2_OFFSET_PER_KWH
  const annualCO2ReductionTons = annualCO2ReductionKg / 1000

  // ============================================
  // RETURN COMPLETE ANALYSIS
  // ============================================
  return {
    // INPUTS SUMMARY
    inputs: {
      monthlyConsumption,
      sanctionedLoad,
      importRate: finalImportRate,
      exportRate,
      consumerType
    },

    // SOLAR RECOMMENDATION
    solar: {
      recommendedCapacityKw: solarCapacity,
      minCapacityAllowed: minCapacity,
      maxCapacityAllowed: maxCapacity,
      reason: 'Based on 80% of annual consumption coverage'
    },

    // ANNUAL GENERATION
    generation: {
      annualGrossKwh: Math.round(annualSolarGenerationGross),
      annualUsableKwh: Math.round(annualSolarGenerationUsable),
      monthlyUsableKwh: Math.round(monthlySolarGenerationUsable),
      systemLossPercentage: (CONSTANTS.SYSTEM_LOSSES * 100).toFixed(1)
    },

    // ENERGY SPLIT
    energySplit: {
      selfConsumedPercentage: (CONSTANTS.SELF_CONSUMPTION_RATIO * 100),
      exportedPercentage: (CONSTANTS.EXPORT_RATIO * 100),
      annualSelfConsumedKwh: Math.round(annualSelfConsumedEnergy),
      annualExportedKwh: Math.round(annualExportedEnergy),
      monthlySelfConsumedKwh: Math.round(monthlySelfConsumedEnergy),
      monthlyExportedKwh: Math.round(monthlyExportedEnergy)
    },

    // BILL COMPARISON
    billComparison: {
      before: {
        monthlyConsumptionKwh: monthlyConsumption,
        perUnitCost: parseFloat(perUnitCostBefore.toFixed(2)),
        monthlyBillRupees: Math.round(monthlyBillBefore),
        annualBillRupees: Math.round(monthlyBillBefore * 12)
      },
      after: {
        consumptionFromGridKwh: Math.round(consumptionAfterSolar),
        consumptionFromSolarKwh: Math.round(monthlySelfConsumedEnergy),
        perUnitCost: parseFloat(perUnitCostAfter),
        monthlyBillRupees: Math.round(Math.max(0, monthlyBillAfter)),
        annualBillRupees: Math.round(Math.max(0, monthlyBillAfter) * 12)
      },
      comparison: {
        monthlyBillReductionRupees: Math.round(monthlySavingsAmount),
        annualBillReductionRupees: Math.round(monthlySavingsAmount * 12),
        perUnitReductionRupees: parseFloat(perUnitReduction),
        percentageReduction: parseFloat(percentReduction)
      }
    },

    // SAVINGS ANALYSIS
    savings: {
      selfConsumptionSavingsAnnual: Math.round(annualSelfConsumptionSavings),
      exportEarningsAnnual: Math.round(annualExportEarnings),
      totalAnnualSavingsRupees: Math.round(totalAnnualSavings),
      monthlyAverageSavingsRupees: Math.round(monthlyAverageSavings)
    },

    // INVESTMENT & PAYBACK
    investment: {
      systemCostPerKw: CONSTANTS.SYSTEM_COST_PER_KW,
      totalSystemCost: Math.round(totalSystemCost),
      paybackYears: parseFloat(paybackYears.toFixed(1)),
      paybackMonths: Math.round(paybackMonths)
    },

    // LONG-TERM PROJECTIONS
    projections: {
      year1: Math.round(totalAnnualSavings * 1 * CONSTANTS.DEGRADATION_FACTORS[1]),
      year5: Math.round(totalAnnualSavings * 5 * CONSTANTS.DEGRADATION_FACTORS[5]),
      year10: Math.round(totalAnnualSavings * 10 * CONSTANTS.DEGRADATION_FACTORS[10]),
      year25: Math.round(totalAnnualSavings * 25 * CONSTANTS.DEGRADATION_FACTORS[25]),
      note: 'Includes 0.8% annual panel degradation'
    },

    // ENVIRONMENTAL IMPACT
    environmental: {
      annualCO2ReductionKg: Math.round(annualCO2ReductionKg),
      annualCO2ReductionTons: parseFloat(annualCO2ReductionTons.toFixed(2)),
      equivalentTreesPlanted: Math.round(annualCO2ReductionTons * 41.7) // Avg tree absorbs 24kg CO2 per year
    },

    // METADATA
    metadata: {
      calculatedAt: new Date().toISOString(),
      version: '1.0',
      constants: {
        peakSunHours: CONSTANTS.PEAK_SUN_HOURS,
        systemLosses: (CONSTANTS.SYSTEM_LOSSES * 100) + '%',
        selfConsumptionRatio: (CONSTANTS.SELF_CONSUMPTION_RATIO * 100) + '%',
        exportRatio: (CONSTANTS.EXPORT_RATIO * 100) + '%'
      }
    }
  }
}

/**
 * Extract bill data from raw bill upload
 * Placeholder for OCR/parsing logic
 */
export const parseBillData = (ocrExtractedText) => {
  // This will be enhanced with actual OCR parsing
  // For now, returns structure
  return {
    monthlyConsumption: null,
    sanctionedLoad: null,
    importRate: null,
    consumerType: null,
    billDate: null,
    serviceName: null,
    rawText: ocrExtractedText
  }
}

export default {
  calculateSavings,
  parseBillData,
  CONSTANTS
}
