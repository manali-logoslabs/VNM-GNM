export const STATES = {
  KARNATAKA: 'karnataka',
  MAHARASHTRA: 'maharashtra',
  RAJASTHAN: 'rajasthan',
  MEGHALAYA: 'meghalaya',
  CHHATTISGARH: 'chhattisgarh',
}

export const STATE_DATA = {
  [STATES.KARNATAKA]: {
    name: 'Karnataka',
    region: 'South India',
    vnmAvailable: true,
    gnmAvailable: true,
    maxCapacityVNM: 'Combined sanctioned load',
    maxCapacityGNM: 'Combined sanctioned load',
    minCapacity: '5 kW',
    surplusTariff: '75% of generic tariff',
    eligibilityVNM: ['Domestic', 'Group Housing', 'Charitable', 'Government', 'Local Bodies'],
    eligibilityGNM: ['All categories'],
    discom: 'BESCOM, MESCOM, CESC, HESCOM, GESCOM',
    subsidy: 'PM Surya Ghar (30-40%)',
    processingTime: '30-45 days',
    highlights: [
      'Clear tariff structure (75% generic)',
      'KERC-approved PPA formats',
      '₹1,000/day penalty for DISCOM delays',
      'Operational portal for NM/GM'
    ],
    cons: [
      'VNM portal module not yet live',
      'Non-BESCOM ESCOMs lag in implementation'
    ]
  },

  [STATES.MAHARASHTRA]: {
    name: 'Maharashtra',
    region: 'Western India',
    vnmAvailable: true,
    gnmAvailable: true,
    maxCapacityVNM: '≤ sanctioned load',
    maxCapacityGNM: '≤ sanctioned load',
    minCapacity: '1 kW',
    surplusTariff: 'As per MERC tariff',
    eligibilityVNM: ['Residential', 'Group Housing', 'Government', 'Local Bodies'],
    eligibilityGNM: ['All categories'],
    discom: 'MSEDCL, DEESL, IWTDCL',
    subsidy: 'PM Surya Ghar (30-40%)',
    processingTime: '40-60 days',
    highlights: [
      'Large market size',
      'Multiple DSCOMs for choice',
      'Established net metering framework',
      'Strong subsidy ecosystem'
    ],
    cons: [
      'Implementation varies by DISCOM',
      'Documentation requirements stringent'
    ]
  },

  [STATES.RAJASTHAN]: {
    name: 'Rajasthan',
    region: 'Northern India',
    vnmAvailable: true,
    gnmAvailable: true,
    maxCapacityVNM: 'Up to sanctioned load',
    maxCapacityGNM: 'Up to sanctioned load',
    minCapacity: '1 kW',
    surplusTariff: '80% of tariff',
    eligibilityVNM: ['Residential', 'Group Housing', 'Charitable', 'Government'],
    eligibilityGNM: ['All categories'],
    discom: 'JVVNL, PVVNL, AVVNL, DBF',
    subsidy: 'PM Surya Ghar (30-40%) + State top-up',
    processingTime: '35-50 days',
    highlights: [
      'Excellent solar resource (5.5-6.5 kWh/m²/day)',
      'State-level support for solar',
      'Good subsidy structure',
      '80% tariff rate competitive'
    ],
    cons: [
      'Varying processes across DSCOMs',
      'Rural connectivity challenges'
    ]
  },

  [STATES.MEGHALAYA]: {
    name: 'Meghalaya',
    region: 'North-East India',
    vnmAvailable: true,
    gnmAvailable: true,
    maxCapacityVNM: '≤ 500 kW and sanctioned load',
    maxCapacityGNM: '≤ 500 kW and sanctioned load',
    minCapacity: '1 kW',
    surplusTariff: 'To be defined',
    eligibilityVNM: ['Residential', 'Group Housing', 'Government', 'Local Bodies'],
    eligibilityGNM: ['All categories'],
    discom: 'MePDCL (single DISCOM)',
    subsidy: 'PM Surya Ghar (70% - highest)',
    processingTime: '45-75 days',
    highlights: [
      'Highest subsidy rate (70%)',
      'Best-drafted regulation',
      'DT upgrade in DISCOM ARR',
      'Deemed acceptance for ≤10 kW',
      'Single DISCOM simplifies process'
    ],
    cons: [
      'SOP not yet published (regulatory gap)',
      'Lower solar resource vs other states',
      'Manual application process'
    ]
  },

  [STATES.CHHATTISGARH]: {
    name: 'Chhattisgarh',
    region: 'Central India',
    vnmAvailable: true,
    gnmAvailable: true,
    maxCapacityVNM: '≤ sanctioned load',
    maxCapacityGNM: '≤ sanctioned load',
    minCapacity: '1 kW',
    surplusTariff: '75-80% of tariff',
    eligibilityVNM: ['Residential', 'Group Housing', 'Charitable', 'Government'],
    eligibilityGNM: ['All categories'],
    discom: 'CSEB, DESCO, WESCO, SOUTHCO',
    subsidy: 'PM Surya Ghar (30-40%)',
    processingTime: '30-45 days',
    highlights: [
      'Progressive solar policy',
      'Well-defined process',
      'Multiple DISCOM network',
      'Good regulatory clarity'
    ],
    cons: [
      'Implementation pace varies',
      'Subsidy processing delays'
    ]
  }
}

export const CONSUMER_TYPES = [
  { value: 'residential', label: 'Residential (Apartment/House)', icon: '🏠' },
  { value: 'housing_society', label: 'Housing Society', icon: '🏘️' },
  { value: 'educational', label: 'Educational Institution', icon: '🎓' },
  { value: 'commercial', label: 'Commercial Building', icon: '🏢' },
  { value: 'industrial', label: 'Industrial', icon: '🏭' },
  { value: 'government', label: 'Government Institution', icon: '🏛️' },
]
