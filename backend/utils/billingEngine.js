/**
 * BILLING ENGINE
 *
 * Implements official KERC Tariff Order 2025-26 and BESCOM billing rules
 *
 * Input: Bill components (consumption, tariff category, fixed charges, etc.)
 * Output: Accurate bill calculation using official tariffs
 */

const KERC_TARIFFS_2025_26 = {
  domestic: {
    tariffPerKwh: 5.80,
    fixedChargePerMonth: 250,
    exportTariffPerKwh: 2.31 // 75% of 3.08 generic tariff
  },
  commercial: {
    tariffPerKwh: 7.00,
    fixedChargePerMonth: 350,
    exportTariffPerKwh: 2.31
  },
  industrial: {
    tariffPerKwh: 4.50,
    fixedChargePerMonth: 500,
    exportTariffPerKwh: 2.31
  },
  agricultural: {
    tariffPerKwh: 7.46,
    fixedChargePerMonth: 200,
    exportTariffPerKwh: 2.31
  }
}

const SOLAR_CONSTANTS = {
  peakSunHours: 4.56,
  systemEfficiency: 0.85, // 15% losses
  systemCostPerKw: 35000,
  degradationPerYear: 0.008 // 0.8% annual
}

/**
 * Calculate CURRENT bill from uploaded bill data
 */
export const calculateCurrentBill = (billData) => {
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

  const tariff = KERC_TARIFFS_2025_26[consumerType.toLowerCase()] || KERC_TARIFFS_2025_26.domestic

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
export const recommendSolarCapacity = (monthlyConsumption, sanctionedLoad) => {
  // Industry standard: 80% of annual consumption / (Peak Sun Hours × 365)
  const annualConsumption = monthlyConsumption * 12
  const recommendedCapacity = (annualConsumption * 0.80) / (SOLAR_CONSTANTS.peakSunHours * 365)

  // Constrain within policy limits
  const minCapacity = 5 // KERC minimum
  const maxCapacity = sanctionedLoad // Cannot exceed sanctioned load
  const finalCapacity = Math.max(minCapacity, Math.min(recommendedCapacity, maxCapacity))

  return Math.round(finalCapacity * 10) / 10 // Round to 0.1 kW
}

/**
 * Calculate solar generation
 */
export const calculateSolarGeneration = (capacity) => {
  const annualGross = capacity * SOLAR_CONSTANTS.peakSunHours * 365
  const annualUsable = annualGross * SOLAR_CONSTANTS.systemEfficiency
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
export const calculateBillWithSolar = (billData, solarData, daytimeConsumptionPercent) => {
  const {
    monthlyConsumption,
    consumerType,
    fixedCharges,
    energyCharge,
    facPercentage = 3,
    dutyPercentage = 12,
    taxPercentage = 5,
    subsidyAmount = 0
  } = billData

  const { monthlyUsableKwh } = solarData

  const tariff = KERC_TARIFFS_2025_26[consumerType.toLowerCase()] || KERC_TARIFFS_2025_26.domestic

  // Energy split based on user's daytime consumption %
  const daytimeConsumptionKwh = (monthlyConsumption * daytimeConsumptionPercent) / 100
  const nighttimeConsumptionKwh = monthlyConsumption - daytimeConsumptionKwh

  // Solar consumption (up to available solar during daytime)
  const solarConsumptionKwh = Math.min(monthlyUsableKwh, daytimeConsumptionKwh)

  // Exported to grid
  const exportedKwh = Math.max(0, monthlyUsableKwh - solarConsumptionKwh)

  // Grid consumption after solar
  const gridConsumptionKwh = monthlyConsumption - solarConsumptionKwh

  // Energy charge from grid
  const gridEnergyCharge = gridConsumptionKwh * tariff.tariffPerKwh

  // Export credit
  const exportCredit = exportedKwh * tariff.exportTariffPerKwh

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
export const calculateFinancials = (currentBill, newBill, capacity) => {
  const monthlySavings = currentBill.totalBill - newBill.totalBill
  const annualSavings = monthlySavings * 12

  const systemCost = capacity * SOLAR_CONSTANTS.systemCostPerKw
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
export const calculateBillSimulation = (input) => {
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
  const currentBill = calculateCurrentBill(billData)

  // Step 2: Recommend solar capacity
  const recommendedCapacity = recommendSolarCapacity(monthlyConsumption, sanctionedLoad)

  // Step 3: Calculate solar generation
  const solarGeneration = calculateSolarGeneration(recommendedCapacity)

  // Step 4: Calculate bill with solar
  const newBill = calculateBillWithSolar(billData, solarGeneration, daytimeConsumptionPercent)

  // Step 5: Calculate financials
  const financials = calculateFinancials(currentBill, newBill, recommendedCapacity)

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
      daytimeConsumptionPercent,
      nighttimeConsumptionPercent: 100 - daytimeConsumptionPercent,
      peakSunHoursKarnataka: SOLAR_CONSTANTS.peakSunHours,
      systemEfficiencyPercent: (SOLAR_CONSTANTS.systemEfficiency * 100),
      tariffSource: 'KERC Tariff Order 2025-26',
      billingRulesSource: 'BESCOM SOP'
    },
    metadata: {
      calculatedAt: new Date().toISOString(),
      version: '2.0-BILL-SIMULATOR',
      accuracy: 'Based on official KERC tariffs and BESCOM billing rules'
    }
  }
}

export default {
  calculateBillSimulation,
  calculateCurrentBill,
  calculateBillWithSolar,
  recommendSolarCapacity,
  calculateSolarGeneration,
  calculateFinancials,
  KERC_TARIFFS_2025_26,
  SOLAR_CONSTANTS
}
