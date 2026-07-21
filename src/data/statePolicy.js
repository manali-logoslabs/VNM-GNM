// State-specific policies extracted from regulatory documents
// Complete with retail tariffs (sourced from retail tariff orders)

export const STATE_POLICIES = {
  karnataka: {
    name: 'Karnataka',
    // KERC Tariff Order 2025 (27 Mar 2025)
    retailTariff: {
      // FY2025-26 (all flat rates, no slabs)
      domestic: 5.80, // ₹/kWh (KERC LT-1, Tariff Order Annexure-2)
      commercial: 7.00, // ₹/kWh (KERC LT-3(a))
      industrial: 4.50, // ₹/kWh (KERC LT-5, up to 150 kW)
      agricultural: 7.46 // ₹/kWh (KERC LT-4(a), cost-reflective tariff)
    },

    // KERC Generic Solar Tariff Order, 09.07.2025, p.28
    genericTariff: 3.08, // ₹/kWh for DSPV (used for export calculation)
    exportTariff: 2.31, // 75% × ₹3.08 (KERC-VNM, Reg 5.4.7 & 5.5.7)

    capacityLimits: {
      // KERC-VNM Regulations, p.7
      vnm: { min: 5, max: 'sanctioned_load' },
      gnm: { min: 5, max: 'sanctioned_load' }
    },

    vnm: {
      eligible: ['domestic', 'group_housing', 'charitable', 'government', 'local_bodies'],
      billing: 'ratio-based', // declared procurement share %, changeable once/FY
      banking: false, // monthly settlement (Reg 5.5.7)
      bankingCharges: 0,
      withdrawalCharges: 0
    },

    gnm: {
      eligible: ['all'],
      billing: 'priority-based', // starts at source connection
      banking: false, // monthly settlement (Reg 5.4.7)
      bankingCharges: 0,
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },

    systemCost: 35000, // ₹/kW average (Domestic ₹40k, others ₹30k)
    peakSunHours: 4.56, // CUF 19% = 4.56 kWh/kW/day
    settlementPeriod: 'monthly'
  },

  maharashtra: {
    name: 'Maharashtra',
    // MERC Order Case No. 75 of 2025 (25 June 2025, effective 1 July 2025)
    // NOTE: Web sources show conflicting values. Recommend fetching MERC Case No. 75/2025 PDF directly
    retailTariff: {
      domestic: 5.65, // Estimated based on 10% reduction reported (verify against MERC order)
      commercial: 9.22, // Reported increase from ₹8.91
      industrial: 8.17, // Reported increase from ₹7.84
      agricultural: 5.50 // Estimated (needs verification)
    },

    exportTariff: null, // Refers to "Generic Tariff" - needs MERC RE tariff order
    capacityLimits: {
      // MERC 2019 Reg + 2nd Amendment
      vnm: { min: 1, max: 1000 },
      gnm: { min: 1, max: 1000 }
    },

    vnm: {
      eligible: ['residential'], // multi-storied buildings, housing societies
      billing: 'ratio-based', // procurement ratio in agreement
      banking: true, // within FY (Reg 11.10(c))
      bankingCharges: 0, // exempt till 5000 MW rooftop
      withdrawalCharges: 0
    },

    gnm: {
      eligible: ['all'],
      billing: 'priority-based', // starts at source
      banking: true, // within FY (Reg 11.9)
      bankingCharges: 0, // exempt till 5000 MW
      withdrawalCharges: 0
    },

    systemCost: null, // NOT IN DOCS
    peakSunHours: null, // NOT IN DOCS
    settlementPeriod: 'monthly',
    note: 'MERC tariff numbers from secondary sources - verify against official order before production use'
  },

  rajasthan: {
    name: 'Rajasthan',
    // RERC Tariff Order Oct 2025 (JdVVNL representative)
    retailTariff: {
      // Telescopic slabs - using average/middle rates
      domestic: 6.00, // ₹4.75-7.50 (telescopic, average ~6.00)
      commercial: 7.75, // ₹7.00-8.50 (average)
      industrial: 6.25, // ₹6.00-6.50 (average)
      agricultural: 6.13 // ₹5.25-7.00 (average)
    },

    exportTariff: null, // Weighted-avg competitive bid tariff + 25% - NOT IN DOCS
    capacityLimits: {
      // RERC 3rd Amendment Dec 2025, Reg 12.6(A)
      vnm: { min: 1, max: 1000 },
      gnm: { min: 1, max: 1000 }
    },

    vnm: {
      eligible: ['all'],
      billing: 'ratio-based', // procurement ratio per MoU
      banking: false, // monthly settlement only (domestic excess becomes monetary credit)
      bankingCharges: 0,
      withdrawalCharges: 0
    },

    gnm: {
      eligible: ['all'],
      billing: 'priority-based', // starts at source
      banking: false, // monthly settlement (non-domestic surplus lapses)
      bankingCharges: 0,
      withdrawalCharges: 0
    },

    systemCost: null, // NOT IN DOCS
    peakSunHours: null, // NOT IN DOCS
    settlementPeriod: 'monthly'
  },

  meghalaya: {
    name: 'Meghalaya',
    // MSERC Order Case No. 11 of 2025 (effective 1 April 2026)
    retailTariff: {
      // MePDCL FY2026-27
      domestic: 5.05, // ₹5.00-5.10 telescopic (average)
      commercial: 7.45, // ₹/kWh flat (MSERC CLT)
      industrial: 6.60, // ₹/kWh flat (MSERC ILT)
      agricultural: 3.15 // ₹/kWh flat (MSERC AP)
    },

    exportTariff: null, // 75% of weighted-avg bid tariff - NOT IN DOCS
    capacityLimits: {
      // MSERC DRE Regulations 2026, Reg 4.4-4.5
      vnm: { min: 5, max: 500 },
      gnm: { min: 5, max: 500 }
    },

    vnm: {
      eligible: ['domestic', 'agricultural', 'group_housing', 'charitable', 'government', 'local_bodies'],
      billing: 'ratio-based', // per MoU
      banking: true, // within settlement period Apr-Mar
      bankingCharges: 0, // exempt if same DT/feeder
      withdrawalCharges: 0
    },

    gnm: {
      eligible: ['domestic', 'agricultural', 'group_housing', 'charitable', 'government', 'local_bodies'],
      billing: 'priority-based', // starts at source
      banking: true, // within Apr-Mar
      bankingCharges: 0, // exempt if same DT/feeder
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },

    systemCost: null, // NOT IN DOCS
    peakSunHours: null, // NOT IN DOCS
    settlementPeriod: 'annual' // Apr-Mar
  },

  chhattisgarh: {
    name: 'Chhattisgarh',
    // CSERC Tariff Schedule 2025-26 (effective 01 Jul 2025)
    retailTariff: {
      // Complete tariff data with slabs
      domestic: {
        type: 'telescopic',
        slabs: [
          { max: 100, rate: 4.10 },
          { max: 200, rate: 4.20 },
          { max: 400, rate: 5.60 },
          { max: 600, rate: 6.60 },
          { max: Infinity, rate: 8.30 }
        ],
        fixedCharge: { upto5kw: 20, to10kw: 30, above10kw: 40 } // ₹/kW/month
      },

      commercial: {
        type: 'telescopic',
        slabs: [
          { max: 100, rate: 6.30 },
          { max: 400, rate: 7.30 },
          { max: Infinity, rate: 8.70 }
        ],
        fixedCharge: 50 // ₹/kW/month
      },

      agricultural: {
        type: 'flat',
        rate: 5.80,
        fixedCharge: 100 // ₹/HP/month
      },

      industrial: {
        type: 'telescopic',
        slabs: [
          { max: 25, rate: 6.05 },
          { max: Infinity, rate: 6.80 }
        ],
        fixedCharge: { upto25hp: 80, above25hp: 150 } // ₹/kW/month
      }
    },

    exportTariff: null, // Lowest rooftop-solar bid tariff from last FY - NOT IN DOCS
    capacityLimits: {
      // CSERC Guidelines Dec 2022
      vnm: { min: 1, max: 500 },
      gnm: { min: 1, max: 500 }
    },

    vnm: {
      eligible: ['domestic', 'group_housing', 'government', 'local_bodies'],
      billing: 'ratio-based', // per MoU, changeable once/FY
      banking: true, // within-FY (Apr-Mar)
      bankingCharges: 0, // exempt (cl.13)
      withdrawalCharges: 0
    },

    gnm: {
      eligible: ['all'],
      billing: 'priority-based', // starts at source
      banking: true, // within-FY
      bankingCharges: 0, // exempt
      withdrawalCharges: 0,
      minSelfConsumption: 0.20
    },

    systemCost: null, // NOT IN DOCS
    peakSunHours: null, // NOT IN DOCS
    settlementPeriod: 'monthly'
  }
}

// Helper: Calculate average tariff from slab structure
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
