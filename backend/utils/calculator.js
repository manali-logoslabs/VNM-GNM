import { STATE_POLICIES, getAverageTariff } from '../models/statePolicy.js'

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

  // Validation
  if (!monthlyBill || !monthlyConsumption || !solarCapacity || !state) {
    throw new Error('Missing required parameters: monthlyBill, monthlyConsumption, solarCapacity, state')
  }

  if (monthlyBill <= 0 || monthlyConsumption <= 0 || solarCapacity <= 0) {
    throw new Error('All parameters must be positive numbers')
  }

  // Get state policy
  const policy = STATE_POLICIES[state.toLowerCase()]
  if (!policy) {
    throw new Error(`State "${state}" not found in policy database`)
  }

  // Get retail tariff
  const normalizedType = consumerType.toLowerCase().replace(/[-_]/g, '')
  const retailTariffData = policy.retailTariff[normalizedType]
  let avgTariffPerKwh = monthlyBill / monthlyConsumption

  if (retailTariffData) {
    avgTariffPerKwh = getAverageTariff(retailTariffData, monthlyConsumption)
  }

  // Export tariff
  const exportTariff = policy.exportTariff || (avgTariffPerKwh * 0.75)

  // Peak sun hours
  const peakSunHours = policy.peakSunHours || 5

  // Annual solar generation
  const annualSolarGeneration = solarCapacity * peakSunHours * 365
  const usableSolarGeneration = annualSolarGeneration * 0.85

  // Split into self-consumed and surplus
  const surplusEnergy = usableSolarGeneration * 0.4
  const selfConsumedEnergy = usableSolarGeneration * 0.6

  // Savings calculation
  const selfConsumptionSavings = selfConsumedEnergy * avgTariffPerKwh
  const surplusSavings = surplusEnergy * exportTariff
  const totalAnnualSavings = selfConsumptionSavings + surplusSavings

  // VNM participant division
  const participantSavings = formulation === 'vnm'
    ? totalAnnualSavings / participantCount
    : totalAnnualSavings

  // System cost & payback
  const systemCostPerKw = policy.systemCost || 200000
  const totalInstallationCost = solarCapacity * systemCostPerKw
  const paybackYears = totalInstallationCost / totalAnnualSavings

  // Projections with degradation
  const projections = {
    1: totalAnnualSavings,
    5: totalAnnualSavings * 5 * 0.95,
    10: totalAnnualSavings * 10 * 0.92,
    25: totalAnnualSavings * 25 * 0.80
  }

  // Carbon reduction
  const carbonReduction = usableSolarGeneration * 0.82

  return {
    monthlySavings: Math.round(totalAnnualSavings / 12),
    annualSavings: Math.round(totalAnnualSavings),
    projections: {
      year1: Math.round(projections[1]),
      year5: Math.round(projections[5]),
      year10: Math.round(projections[10]),
      year25: Math.round(projections[25])
    },
    paybackPeriod: parseFloat(paybackYears.toFixed(1)),
    electricityOffsetPercentage: Math.round((usableSolarGeneration / (monthlyConsumption * 12)) * 100),
    carbonReductionTons: Math.round(carbonReduction / 1000),
    annualGeneration: Math.round(usableSolarGeneration),
    systemCost: Math.round(totalInstallationCost),

    // Additional details for API
    details: {
      retailTariff: avgTariffPerKwh.toFixed(2),
      exportTariff: exportTariff.toFixed(2),
      peakSunHours,
      systemCostPerKw,
      bankingAllowed: policy.vnm.banking || policy.gnm.banking,
      settlementPeriod: policy.settlementPeriod,
      formulation: {
        type: formulation.toUpperCase(),
        billing: formulation === 'vnm' ? policy.vnm.billing : policy.gnm.billing,
        participants: formulation === 'vnm' ? participantCount : 1
      }
    }
  }
}

export const checkEligibility = (params) => {
  const { state, consumerType, formulation = 'vnm' } = params

  const policy = STATE_POLICIES[state.toLowerCase()]
  if (!policy) {
    throw new Error(`State "${state}" not found`)
  }

  const normalizedType = consumerType.toLowerCase().replace(/[-_]/g, '')
  const vnmRules = policy.vnm
  const gnmRules = policy.gnm

  const vnmEligible = vnmRules.eligible.includes('all') ||
                     vnmRules.eligible.includes(normalizedType)
  const gnmEligible = gnmRules.eligible.includes('all') ||
                     gnmRules.eligible.includes(normalizedType)

  return {
    state: policy.name,
    regulatoryBody: policy.regulatoryBody,
    consumerType,
    vnmEligible,
    gnmEligible,
    recommended: formulation === 'vnm' ? 'vnm' : 'gnm',
    details: {
      vnm: vnmEligible ? {
        available: true,
        billing: vnmRules.billing,
        banking: vnmRules.banking,
        bankingCharges: vnmRules.bankingCharges
      } : { available: false },
      gnm: gnmEligible ? {
        available: true,
        billing: gnmRules.billing,
        banking: gnmRules.banking,
        bankingCharges: gnmRules.bankingCharges
      } : { available: false }
    }
  }
}
