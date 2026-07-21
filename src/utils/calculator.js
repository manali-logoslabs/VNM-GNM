import { STATE_POLICIES, getAverageTariff } from '../data/statePolicy'

// Calculate solar system savings using state-specific policies
export const calculateSavings = (params) => {
  const {
    monthlyBill,
    monthlyConsumption,
    solarCapacity,
    state,
    consumerType = 'residential',
    participantCount = 1,
    formulation = 'vnm'
  } = params

  if (!monthlyBill || !monthlyConsumption || !solarCapacity || !state) {
    return null
  }

  // Get state policy
  const policy = STATE_POLICIES[state]
  if (!policy) return null

  // Get retail tariff for state and consumer type (normalized to lowercase)
  const normalizedType = consumerType.toLowerCase().replace('_', '')
  const retailTariffData = policy.retailTariff[normalizedType]
  let avgTariffPerKwh = monthlyBill / monthlyConsumption

  // If policy has tariff data, use it (validate against bill)
  if (retailTariffData) {
    avgTariffPerKwh = getAverageTariff(retailTariffData, monthlyConsumption)
  }

  // Export tariff (state-specific, fallback to 75% if not available)
  const exportTariff = policy.exportTariff || (avgTariffPerKwh * 0.75)

  // Peak sun hours (state-specific, default to 5 if not available)
  const peakSunHours = policy.peakSunHours || 5

  // Annual solar generation
  const annualSolarGeneration = solarCapacity * peakSunHours * 365

  // Account for system losses (~15%)
  const usableSolarGeneration = annualSolarGeneration * 0.85

  // Surplus energy (assumed 40% is exported, 60% self-consumed)
  const surplusEnergy = usableSolarGeneration * 0.4
  const selfConsumedEnergy = usableSolarGeneration * 0.6

  // Monthly breakdown
  const monthlyUsableSolar = usableSolarGeneration / 12
  const monthlySelfConsumed = selfConsumedEnergy / 12
  const monthlySurplus = surplusEnergy / 12

  // Savings calculation using state-specific tariffs
  const selfConsumptionSavings = selfConsumedEnergy * avgTariffPerKwh
  const surplusSavings = surplusEnergy * exportTariff
  const totalAnnualSavings = selfConsumptionSavings + surplusSavings

  // For VNM with multiple participants, adjust
  const participantSavings = formulation === 'vnm'
    ? totalAnnualSavings / participantCount
    : totalAnnualSavings

  // System cost (state-specific, default to ₹2L if not available)
  const systemCostPerKw = policy.systemCost || 200000
  const totalInstallationCost = solarCapacity * systemCostPerKw
  const paybackYears = totalInstallationCost / totalAnnualSavings

  // 5, 10, 25 year projections
  const projections = {
    1: totalAnnualSavings,
    5: totalAnnualSavings * 5 * 0.95, // Slight efficiency degradation
    10: totalAnnualSavings * 10 * 0.92,
    25: totalAnnualSavings * 25 * 0.80, // 20% total degradation over 25 years
  }

  // Carbon reduction (average: 1 kWh = 0.82 kg CO2)
  const carbonReduction = usableSolarGeneration * 0.82

  return {
    monthlySavings: Math.round(totalAnnualSavings / 12),
    annualSavings: Math.round(totalAnnualSavings),
    projections: {
      year1: Math.round(projections[1]),
      year5: Math.round(projections[5]),
      year10: Math.round(projections[10]),
      year25: Math.round(projections[25]),
    },
    paybackPeriod: parseFloat(paybackYears.toFixed(1)),
    electricityOffsetPercentage: Math.round((usableSolarGeneration / (monthlyConsumption * 12)) * 100),
    carbonReductionTons: Math.round(carbonReduction / 1000),
    annualGeneration: Math.round(usableSolarGeneration),
    systemCost: Math.round(totalInstallationCost),
    recommendedModel: determineRecommendedModel(params),
  }
}

// Determine which model is best
const determineRecommendedModel = (params) => {
  const { participantCount, monthlyConsumption } = params

  if (participantCount === 1) return 'gnm'
  if (participantCount > 1 && monthlyConsumption > 500) return 'vnm'
  return 'vnm'
}

// Check eligibility based on inputs
export const checkEligibility = (params) => {
  const { state, consumerType, isMultipleConnections, monthlyBill } = params

  const eligibilityResults = {
    vnmEligible: false,
    gnmEligible: false,
    reasons: [],
    nextSteps: []
  }

  // VNM eligibility
  if (
    (consumerType === 'housing_society' ||
     consumerType === 'residential' ||
     consumerType === 'educational' ||
     consumerType === 'government') &&
    monthlyBill > 500
  ) {
    eligibilityResults.vnmEligible = true
    eligibilityResults.reasons.push('Your profile matches VNM eligibility criteria')
  }

  // GNM eligibility
  if (isMultipleConnections && monthlyBill > 1000) {
    eligibilityResults.gnmEligible = true
    eligibilityResults.reasons.push('You can use GNM across multiple connections')
  }

  if (consumerType === 'commercial' || consumerType === 'industrial') {
    eligibilityResults.gnmEligible = true
    eligibilityResults.reasons.push('Your business can benefit from GNM')
  }

  eligibilityResults.nextSteps = [
    'Calculate your exact savings with our calculator',
    'Discuss with our solar advisor',
    'Get a free site assessment',
    'Review available subsidies and schemes'
  ]

  return eligibilityResults
}

// Format currency in Indian Rupees
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format large numbers with commas
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(Math.round(num))
}
