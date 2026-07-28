/**
 * BILLING ENGINE - State-Agnostic
 *
 * Supports multiple state tariff structures:
 * - Flat tariffs (Karnataka, Agricultural categories)
 * - Slab-based/Telescopic tariffs (Chhattisgarh domestic/commercial)
 *
 * Input: Bill components + state
 * Output: Accurate bill calculation using official tariffs
 */

import { STATE_POLICIES, getAverageTariff } from '../models/statePolicy.js'

const DEFAULT_SOLAR_CONSTANTS = {
  systemEfficiency: 0.85,
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
 */
export const calculateCurrentBill = (billData, state = 'karnataka') => {
  const {
    monthlyConsumption,
    consumerType = 'domestic',
    fixedCharges,
    energyCharge,
    facPercentage = 3,
    dutyPercentage = 12,
    taxPercentage = 5,
    subsidyAmount = 0
  } = billData

  const policy = STATE_POLICIES[state.toLowerCase()]

  // Calculate per-unit tariff from energy charge
  const perUnitTariff = energyCharge / monthlyConsumption

  // FAC calculation
  const facCharge = (energyCharge * facPercentage) / 100

  // Duty calculation
  const dutyCharge = (energyCharge * dutyPercentage) / 100

  // Tax calculation
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
 */
export const recommendSolarCapacity = (monthlyConsumption, sanctionedLoad, state = 'karnataka') => {
  const policy = STATE_POLICIES[state.toLowerCase()]
  const peakSunHours = policy.peakSunHours

  // Industry standard: 80% of annual consumption / (Peak Sun Hours × 365)
  const annualConsumption = monthlyConsumption * 12
  const recommendedCapacity = (annualConsumption * 0.80) / (peakSunHours * 365)

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
 */
export const calculateSolarGeneration = (capacity, state = 'karnataka') => {
  const policy = STATE_POLICIES[state.toLowerCase()]
  const peakSunHours = policy.peakSunHours
  const systemEfficiency = DEFAULT_SOLAR_CONSTANTS.systemEfficiency

  const annualGross = capacity * peakSunHours * 365
  const annualUsable = annualGross * systemEfficiency
  const monthlyUsable = annualUsable / 12

  return {
    annualGrossKwh: Math.round(annualGross),
    annualUsableKwh: Math.round(annualUsable),
    monthlyUsableKwh: Math.round(monthlyUsable)
  }
}

/**
 * Calculate NEW bill WITH solar using user's daytime consumption assumption
 */
export const calculateBillWithSolar = (billData, solarData, daytimeConsumptionPercent, state = 'karnataka') => {
  const {
    monthlyConsumption,
    consumerType,
    fixedCharges,
    facPercentage = 3,
    dutyPercentage = 12,
    taxPercentage = 5,
    subsidyAmount = 0
  } = billData

  const { monthlyUsableKwh } = solarData

  const policy = STATE_POLICIES[state.toLowerCase()]
  const consumerTypeNorm = consumerType.toLowerCase()
  const retailTariffData = policy.retailTariff[consumerTypeNorm]

  // Calculate import tariff (handles both flat and slab-based)
  const importTariff = getAverageTariff(retailTariffData, monthlyConsumption)

  // Export tariff from policy (no fallback - validated upfront)
  const exportTariff = policy.exportTariff

  // Energy split based on user's daytime consumption %
  const daytimeConsumptionKwh = (monthlyConsumption * daytimeConsumptionPercent) / 100

  // Solar consumption (up to available solar during daytime)
  const solarConsumptionKwh = Math.min(monthlyUsableKwh, daytimeConsumptionKwh)

  // Exported to grid
  const exportedKwh = Math.max(0, monthlyUsableKwh - solarConsumptionKwh)

  // Grid consumption after solar
  const gridConsumptionKwh = monthlyConsumption - solarConsumptionKwh

  // Energy charge from grid
  const gridEnergyCharge = gridConsumptionKwh * importTariff

  // Export credit
  const exportCredit = exportedKwh * exportTariff

  // FAC on reduced energy
  const facCharge = (gridEnergyCharge * facPercentage) / 100

  // Duty on reduced energy
  const dutyCharge = (gridEnergyCharge * dutyPercentage) / 100

  // Tax on reduced energy
  const taxCharge = (gridEnergyCharge * taxPercentage) / 100

  // New total bill (fixed charges still apply)
  const totalBill = fixedCharges + gridEnergyCharge + facCharge + dutyCharge + taxCharge + subsidyAmount - exportCredit

  return {
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
    effectivePerUnitCost: gridConsumptionKwh > 0 ? parseFloat((totalBill / gridConsumptionKwh).toFixed(2)) : 0
  }
}

/**
 * Calculate financial metrics
 */
export const calculateFinancials = (currentBill, newBill, capacity, state = 'karnataka') => {
  const policy = STATE_POLICIES[state.toLowerCase()]
  const systemCostPerKw = policy.systemCost

  const monthlySavings = currentBill.totalBill - newBill.totalBill
  const annualSavings = monthlySavings * 12

  const systemCost = capacity * systemCostPerKw
  const paybackYears = systemCost / annualSavings

  return {
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    systemCost: Math.round(systemCost),
    paybackYears: parseFloat(paybackYears.toFixed(1)),
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
    facPercentage = 3,
    dutyPercentage = 12,
    taxPercentage = 5,
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
    facPercentage,
    dutyPercentage,
    taxPercentage,
    subsidyAmount
  }
  const currentBill = calculateCurrentBill(billData, normalizedState)

  // Step 2: Recommend solar capacity
  const recommendedCapacity = recommendSolarCapacity(monthlyConsumption, sanctionedLoad, normalizedState)

  // Step 3: Calculate solar generation
  const solarGeneration = calculateSolarGeneration(recommendedCapacity, normalizedState)

  // Step 4: Calculate bill with solar
  const newBill = calculateBillWithSolar(billData, solarGeneration, daytimeConsumptionPercent, normalizedState)

  // Step 5: Calculate financials
  const financials = calculateFinancials(currentBill, newBill, recommendedCapacity, normalizedState)

  const peakSunHours = policy.peakSunHours || DEFAULT_SOLAR_CONSTANTS.peakSunHours

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
      effectivePerUnitRupees: newBill.effectivePerUnitCost
    },
    solar: {
      recommendedCapacityKw: recommendedCapacity,
      annualGenerationKwh: solarGeneration.annualUsableKwh,
      monthlyGenerationKwh: solarGeneration.monthlyUsableKwh,
      systemCostRupees: financials.systemCost,
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
      systemEfficiencyPercent: (DEFAULT_SOLAR_CONSTANTS.systemEfficiency * 100),
      settlementPeriod: policy.settlementPeriod
    },
    metadata: {
      calculatedAt: new Date().toISOString(),
      version: '2.1-BILL-SIMULATOR-STATE-AWARE',
      accuracy: `Based on official ${policy.regulatoryBody} tariffs`
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
