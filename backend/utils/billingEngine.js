/**
 * BILLING ENGINE v3 - Accurate Indian Tariff Modeling
 *
 * Improvements in this version:
 * ✓ Recalculates slab-based tariffs after solar (not using stale average)
 * ✓ Removes generic 5% tax - electricity is GST-exempt
 * ✓ Uses state-specific electricity duty (by consumer category)
 * ✓ Incorporates Performance Ratio (PR) instead of fixed efficiency
 * ✓ Models each state's net metering settlement rules
 * ✓ Calculates payback using net investment (cost - subsidy)
 */

import {
  STATE_POLICIES,
  calculateEnergyCharge,
  getElectricityDuty,
  getFacCharge,
  calculateSubsidy,
  getNetMeteringRate,
  calculateAnnualSettlement
} from '../models/statePolicy.js'

const DEFAULT_SOLAR_CONSTANTS = {
  // Performance ratio fallback (if state doesn't define performanceRatio)
  performanceRatio: 0.80,
  degradationPerYear: 0.008
}

export const validateStateComplete = (state) => {
  const policy = STATE_POLICIES[state.toLowerCase()]

  if (!policy) {
    throw new Error(`State "${state}" not found. Supported: ${Object.keys(STATE_POLICIES).join(', ')}`)
  }

  const required = {
    retailTariff: 'Tariff structure',
    exportTariff: 'Export/net metering rate',
    peakSunHours: 'Peak sun hours',
    systemCost: 'System installation cost'
  }

  const missing = []
  for (const [key, label] of Object.entries(required)) {
    if (policy[key] === null || policy[key] === undefined) {
      missing.push(`${label} (${key})`)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `❌ State "${state}" has incomplete data. Missing:\n` +
      missing.map(m => `   • ${m}`).join('\n')
    )
  }

  return policy
}

/**
 * Calculate CURRENT bill from uploaded bill data
 * Uses state-specific duty and FAC from policy (not client-supplied percentages)
 */
export const calculateCurrentBill = (billData, state = 'karnataka') => {
  const {
    monthlyConsumption,
    consumerType = 'domestic',
    fixedCharges,
    energyCharge,
    subsidyAmount = 0
  } = billData

  const policy = STATE_POLICIES[state.toLowerCase()]

  // Calculate per-unit tariff from energy charge
  const perUnitTariff = energyCharge / monthlyConsumption

  // Get state-specific electricity duty by consumer category
  const dutyPercentage = getElectricityDuty(policy, consumerType)
  const dutyCharge = (energyCharge * dutyPercentage) / 100

  // Get state-specific FAC (Fuel Adjustment Cost)
  const facCharge = getFacCharge(policy, energyCharge, monthlyConsumption)

  // Tax: Electricity is GST-exempt in India; use state's explicit taxPercentage (typically 0)
  const taxPercentage = policy.taxPercentage || 0
  const taxCharge = (energyCharge * taxPercentage) / 100

  // Total bill
  const totalBill = fixedCharges + energyCharge + facCharge + dutyCharge + taxCharge + subsidyAmount

  return {
    monthlyConsumption,
    fixedCharges,
    energyCharge,
    facCharge: Math.round(facCharge),
    dutyCharge: Math.round(dutyCharge),
    taxCharge: Math.round(taxCharge),
    subsidyAmount,
    totalBill: Math.round(totalBill),
    perUnitCost: parseFloat(perUnitTariff.toFixed(2))
  }
}

/**
 * Recommend solar capacity based on consumption and sanctioned load
 * Uses state-specific performance ratio instead of fixed efficiency
 */
export const recommendSolarCapacity = (monthlyConsumption, sanctionedLoad, state = 'karnataka') => {
  const policy = STATE_POLICIES[state.toLowerCase()]
  const peakSunHours = policy.peakSunHours
  const performanceRatio = policy.performanceRatio || DEFAULT_SOLAR_CONSTANTS.performanceRatio

  // Industry standard: 80% of annual consumption / (Peak Sun Hours × 365 × PR)
  const annualConsumption = monthlyConsumption * 12
  const recommendedCapacity = (annualConsumption * 0.80) / (peakSunHours * 365 * performanceRatio)

  // Constrain within state-specific policy limits
  const minCapacity = policy.capacityLimits.vnm.min

  let maxCapacity
  if (policy.capacityLimits.vnm.max === 'sanctioned_load') {
    maxCapacity = sanctionedLoad
  } else {
    maxCapacity = Math.min(policy.capacityLimits.vnm.max, sanctionedLoad)
  }

  const finalCapacity = Math.max(minCapacity, Math.min(recommendedCapacity, maxCapacity))

  return Math.round(finalCapacity * 10) / 10 // Round to 0.1 kW
}

/**
 * Calculate solar generation
 * Uses state-specific performance ratio instead of hardcoded 85%
 */
export const calculateSolarGeneration = (capacity, state = 'karnataka') => {
  const policy = STATE_POLICIES[state.toLowerCase()]
  const peakSunHours = policy.peakSunHours
  const performanceRatio = policy.performanceRatio || DEFAULT_SOLAR_CONSTANTS.performanceRatio

  // Annual generation accounting for performance ratio (inverter, wiring, soiling, temperature losses)
  const annualGross = capacity * peakSunHours * 365
  const annualUsable = annualGross * performanceRatio
  const monthlyUsable = annualUsable / 12

  return {
    annualGrossKwh: Math.round(annualGross),
    annualUsableKwh: Math.round(annualUsable),
    monthlyUsableKwh: Math.round(monthlyUsable)
  }
}

/**
 * Calculate NEW bill WITH solar using user's daytime consumption assumption
 * CRITICAL FIX: Recalculates slab-based tariffs on reduced consumption (not using stale average)
 *
 * DELHI-SPECIFIC: 1:1 Net Metering with Annual Settlement
 * - Monthly: Net Import = Consumption - Generation (bill on net import only)
 * - Annual: Track surplus for settlement (DERC: surplus NOT credited at full retail rate)
 */
export const calculateBillWithSolar = (billData, solarData, daytimeConsumptionPercent, state = 'karnataka') => {
  const {
    monthlyConsumption,
    consumerType,
    fixedCharges,
    subsidyAmount = 0
  } = billData

  const { monthlyUsableKwh } = solarData

  const policy = STATE_POLICIES[state.toLowerCase()]
  const consumerTypeNorm = consumerType.toLowerCase()
  const retailTariffData = policy.retailTariff[consumerTypeNorm]
  const isDelhi = state.toLowerCase() === 'delhi'

  // Energy split based on user's daytime consumption %
  const daytimeConsumptionKwh = (monthlyConsumption * daytimeConsumptionPercent) / 100

  // Solar consumption (up to available solar during daytime)
  const solarConsumptionKwh = Math.min(monthlyUsableKwh, daytimeConsumptionKwh)

  // Grid consumption after solar (nighttime + any daytime deficit)
  const gridConsumptionKwh = monthlyConsumption - solarConsumptionKwh

  // Exported to grid (excess solar after daytime use)
  const exportedKwh = Math.max(0, monthlyUsableKwh - solarConsumptionKwh)

  // DELHI SPECIAL CASE: 1:1 Net Metering
  // Bill on NET IMPORT = Consumption - Generation (not grid consumption)
  let effectiveConsumptionForBill
  if (isDelhi) {
    // Monthly Net Import = Total Consumption - Total Generation
    const monthlyNetImportKwh = monthlyConsumption - monthlyUsableKwh
    effectiveConsumptionForBill = Math.max(0, monthlyNetImportKwh)
  } else {
    // Other states: Bill on grid consumption (after solar offsets)
    effectiveConsumptionForBill = gridConsumptionKwh
  }

  // CRITICAL FIX: Recalculate energy charge on effective consumption (for slab tariffs)
  // This ensures that consumption falling into cheaper lower slabs is accurately modeled
  const gridEnergyResult = calculateEnergyCharge(effectiveConsumptionForBill, retailTariffData)
  const gridEnergyCharge = gridEnergyResult.energyCharge

  // Export credit (use state-specific export rate from netMetering config)
  const exportRate = getNetMeteringRate(policy)
  const exportCredit = exportedKwh * exportRate

  // DELHI: Annual projection for settlement tracking
  let annualConsumption, annualGeneration, annualNetImport, annualSurplus, annualSettlement
  if (isDelhi) {
    annualConsumption = monthlyConsumption * 12
    annualGeneration = monthlyUsableKwh * 12
    annualNetImport = Math.max(0, annualConsumption - annualGeneration)
    annualSurplus = Math.max(0, annualGeneration - annualConsumption)

    // Calculate annual settlement credit (if any surplus exists)
    annualSettlement = calculateAnnualSettlement(annualSurplus, policy)
  }

  // Get state-specific electricity duty by consumer category
  const dutyPercentage = getElectricityDuty(policy, consumerType)
  const dutyCharge = (gridEnergyCharge * dutyPercentage) / 100

  // Get state-specific FAC
  const facCharge = getFacCharge(policy, gridEnergyCharge, effectiveConsumptionForBill)

  // Tax: Electricity is GST-exempt; use state's explicit taxPercentage (typically 0)
  const taxPercentage = policy.taxPercentage || 0
  const taxCharge = (gridEnergyCharge * taxPercentage) / 100

  // New total bill (fixed charges still apply, export credit reduces total)
  const totalBill = fixedCharges + gridEnergyCharge + facCharge + dutyCharge + taxCharge + subsidyAmount - exportCredit

  const billResult = {
    gridConsumptionKwh: Math.round(gridConsumptionKwh),
    solarConsumptionKwh: Math.round(solarConsumptionKwh),
    exportedKwh: Math.round(exportedKwh),
    fixedCharges,
    gridEnergyCharge: Math.round(gridEnergyCharge),
    facCharge: Math.round(facCharge),
    dutyCharge: Math.round(dutyCharge),
    taxCharge: Math.round(taxCharge),
    exportCredit: Math.round(exportCredit),
    subsidyAmount,
    totalBill: Math.round(Math.max(0, totalBill)),
    effectivePerUnitCost: effectiveConsumptionForBill > 0 ? parseFloat((totalBill / effectiveConsumptionForBill).toFixed(2)) : 0,
    slabBreakdown: gridEnergyResult.slabBreakdown
  }

  // DELHI: Add annual settlement tracking and credit
  if (isDelhi) {
    billResult.annualConsumption = Math.round(annualConsumption)
    billResult.annualGeneration = Math.round(annualGeneration)
    billResult.annualNetImport = Math.round(annualNetImport)
    billResult.annualSurplus = Math.round(annualSurplus)
    // Add annual settlement details (credit for surplus at reduced APPC rate)
    billResult.annualSettlement = annualSettlement
  }

  return billResult
}

/**
 * Calculate financial metrics
 * NET INVESTMENT approach: payback = (system cost - subsidy) / annual savings
 *
 * For Delhi: Annual savings includes settlement credit for surplus (if any)
 */
export const calculateFinancials = (currentBill, newBill, capacity, consumerType, state = 'karnataka') => {
  const policy = STATE_POLICIES[state.toLowerCase()]
  const systemCostPerKw = policy.systemCost
  const isDelhi = state.toLowerCase() === 'delhi'

  const monthlySavings = currentBill.totalBill - newBill.totalBill
  let annualSavings = monthlySavings * 12

  // DELHI: Add annual settlement credit to annual savings
  if (isDelhi && newBill.annualSettlement?.credit > 0) {
    annualSavings += newBill.annualSettlement.credit
  }

  const systemCost = capacity * systemCostPerKw

  // Calculate applicable subsidy (PM Surya Ghar for residential/domestic consumers)
  const applicableSubsidy = calculateSubsidy(capacity, consumerType)

  // Net investment = system cost minus subsidy
  const netInvestment = systemCost - applicableSubsidy

  // Payback period using net investment
  const paybackYears = annualSavings > 0 ? netInvestment / annualSavings : Infinity

  return {
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    systemCost: Math.round(systemCost),
    applicableSubsidy: Math.round(applicableSubsidy),
    netInvestment: Math.round(netInvestment),
    paybackYears: paybackYears === Infinity ? 0 : parseFloat(paybackYears.toFixed(1)),
    percentReduction: parseFloat(((monthlySavings / currentBill.totalBill) * 100).toFixed(1))
  }
}

/**
 * Main function: Calculate everything
 */
export const calculateBillSimulation = (input, state = 'karnataka') => {
  const {
    monthlyConsumption,
    sanctionedLoad,
    consumerType = 'domestic',
    fixedCharges,
    energyCharge,
    subsidyAmount = 0,
    daytimeConsumptionPercent = 40
  } = input

  // Strict state validation - MUST have all required data
  const normalizedState = state.toLowerCase()
  const policy = validateStateComplete(normalizedState)

  // Validate input
  if (monthlyConsumption === undefined || monthlyConsumption === null || monthlyConsumption <= 0) {
    throw new Error('Monthly consumption must be positive')
  }
  if (sanctionedLoad === undefined || sanctionedLoad === null || sanctionedLoad <= 0) {
    throw new Error('Sanctioned load must be positive')
  }
  if (energyCharge === undefined || energyCharge === null || energyCharge < 0) {
    throw new Error('Energy charge required')
  }
  if (fixedCharges === undefined || fixedCharges === null) {
    throw new Error('Fixed charges required')
  }

  // Step 1: Calculate current bill
  const billData = {
    monthlyConsumption,
    consumerType,
    fixedCharges,
    energyCharge,
    subsidyAmount
  }
  const currentBill = calculateCurrentBill(billData, normalizedState)

  // Step 2: Recommend solar capacity
  const recommendedCapacity = recommendSolarCapacity(monthlyConsumption, sanctionedLoad, normalizedState)

  // Step 3: Calculate solar generation
  const solarGeneration = calculateSolarGeneration(recommendedCapacity, normalizedState)

  // Step 4: Calculate bill with solar
  const newBill = calculateBillWithSolar(billData, solarGeneration, daytimeConsumptionPercent, normalizedState)

  // Step 5: Calculate financials (now includes subsidy calculation)
  const financials = calculateFinancials(currentBill, newBill, recommendedCapacity, consumerType, normalizedState)

  const peakSunHours = policy.peakSunHours
  const performanceRatio = policy.performanceRatio || DEFAULT_SOLAR_CONSTANTS.performanceRatio

  return {
    before: {
      monthlyConsumptionKwh: currentBill.monthlyConsumption,
      monthlyBillRupees: currentBill.totalBill,
      annualBillRupees: currentBill.totalBill * 12,
      perUnitCostRupees: currentBill.perUnitCost
    },
    after: {
      gridConsumptionKwh: newBill.gridConsumptionKwh,
      solarConsumptionKwh: newBill.solarConsumptionKwh,
      exportedKwh: newBill.exportedKwh,
      monthlyBillRupees: newBill.totalBill,
      annualBillRupees: newBill.totalBill * 12,
      effectivePerUnitRupees: newBill.effectivePerUnitCost,
      slabBreakdown: newBill.slabBreakdown,
      ...(normalizedState === 'delhi' && {
        // DELHI: Annual settlement tracking (1:1 net metering specific)
        annualConsumptionKwh: newBill.annualConsumption,
        annualGenerationKwh: newBill.annualGeneration,
        annualNetImportKwh: newBill.annualNetImport,
        annualSurplusKwh: newBill.annualSurplus,
        annualSettlementRupees: newBill.annualSettlement?.credit || 0,
        annualSettlementDetails: newBill.annualSettlement
      })
    },
    solar: {
      recommendedCapacityKw: recommendedCapacity,
      annualGenerationKwh: solarGeneration.annualUsableKwh,
      monthlyGenerationKwh: solarGeneration.monthlyUsableKwh,
      systemCostRupees: financials.systemCost,
      applicableSubsidyRupees: financials.applicableSubsidy,
      netInvestmentRupees: financials.netInvestment,
      paybackYears: financials.paybackYears
    },
    savings: {
      monthlySavingsRupees: financials.monthlySavings,
      annualSavingsRupees: financials.annualSavings,
      percentReductionPercent: financials.percentReduction
    },
    assumptions: {
      state: policy.name,
      regulatoryBody: policy.regulatoryBody,
      daytimeConsumptionPercent,
      nighttimeConsumptionPercent: 100 - daytimeConsumptionPercent,
      peakSunHours,
      performanceRatioPercent: (performanceRatio * 100),
      settlementPeriod: policy.settlementPeriod
    },
    metadata: {
      calculatedAt: new Date().toISOString(),
      version: '3.0-ACCURATE-TARIFF-MODELING',
      accuracy: `Based on official ${policy.regulatoryBody} tariffs with state-specific duty, FAC, and settlement rules`
    }
  }
}

export default {
  calculateBillSimulation,
  calculateCurrentBill,
  calculateBillWithSolar,
  recommendSolarCapacity,
  calculateSolarGeneration,
  calculateFinancials
}
