import { useState } from 'react'
import { motion } from 'framer-motion'
import { STATE_DATA } from '../data/states'
import { StateCard } from '../components/Cards'

export default function StateEligibility() {
  const [selectedState, setSelectedState] = useState(null)

  const states = Object.entries(STATE_DATA).map(([key, value]) => ({
    key,
    data: value
  }))

  const coverageStates = [
    { key: 'karnataka', name: 'Karnataka', color: '#16a34a' },
    { key: 'maharashtra', name: 'Maharashtra', color: '#2563eb' },
    { key: 'rajasthan', name: 'Rajasthan', color: '#f97316' },
    { key: 'meghalaya', name: 'Meghalaya', color: '#a855f7' },
    { key: 'chhattisgarh', name: 'Chhattisgarh', color: '#dc2626' }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-wide py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">State Eligibility & Details</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore VNM and GNM availability, subsidies, and regulations across Indian states.
          </p>
        </motion.div>

        {/* India Map with Interactive States */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 bg-white rounded-2xl p-8 border border-slate-200"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Our Coverage Across India</h2>

          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-6xl mx-auto">
            {/* Interactive SVG Map - Matching Reference Image */}
            <div className="flex-1 min-w-0">
              <svg viewBox="0 0 1000 1200" className="w-full h-auto" style={{ maxWidth: '600px' }}>
                {/* Ocean/Water Background */}
                <rect width="1000" height="1200" fill="#bfdbfe" />

                {/* India Base (Cream) */}
                <path
                  d="M 200,150 L 350,120 L 450,100 L 550,110 L 650,90 L 750,130 L 800,200 L 850,300 L 880,400 L 900,500 L 895,600 L 880,700 L 850,800 L 800,900 L 700,1000 L 550,1100 L 350,1150 L 200,1120 L 100,1000 L 50,850 L 30,700 L 20,550 L 25,400 L 40,250 L 80,150 Z"
                  fill="#f5e6d3"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                />

                {/* Rajasthan - Orange */}
                <g
                  onClick={() => setSelectedState('rajasthan')}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <path
                    d="M 200,250 L 340,220 L 400,280 L 380,450 L 300,480 L 200,380 Z"
                    fill="#f97316"
                    stroke="#ea580c"
                    strokeWidth="2"
                  />
                  <text x="310" y="360" textAnchor="middle" fontSize="18" fontWeight="600" fill="#000">
                    Rajasthan
                  </text>
                </g>

                {/* Maharashtra - Blue */}
                <g
                  onClick={() => setSelectedState('maharashtra')}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <path
                    d="M 280,450 L 360,420 L 410,480 L 400,650 L 320,690 L 270,580 Z"
                    fill="#2563eb"
                    stroke="#1e40af"
                    strokeWidth="2"
                  />
                  <text x="350" y="550" textAnchor="middle" fontSize="18" fontWeight="600" fill="#fff">
                    Maharashtra
                  </text>
                </g>

                {/* Karnataka - Green */}
                <g
                  onClick={() => setSelectedState('karnataka')}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <path
                    d="M 300,680 L 390,650 L 430,780 L 400,950 L 320,1000 L 270,850 Z"
                    fill="#16a34a"
                    stroke="#15803d"
                    strokeWidth="2"
                  />
                  <text x="360" y="820" textAnchor="middle" fontSize="18" fontWeight="600" fill="#fff">
                    Karnataka
                  </text>
                </g>

                {/* Chhattisgarh - Red */}
                <g
                  onClick={() => setSelectedState('chhattisgarh')}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <path
                    d="M 420,480 L 540,450 L 600,540 L 570,700 L 480,730 L 420,600 Z"
                    fill="#dc2626"
                    stroke="#b91c1c"
                    strokeWidth="2"
                  />
                  <text x="530" y="600" textAnchor="middle" fontSize="18" fontWeight="600" fill="#fff">
                    Chhattisgarh
                  </text>
                </g>

                {/* Meghalaya - Purple */}
                <g
                  onClick={() => setSelectedState('meghalaya')}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <path
                    d="M 650,400 L 750,380 L 800,470 L 760,520 L 680,500 Z"
                    fill="#a855f7"
                    stroke="#9333ea"
                    strokeWidth="2"
                  />
                  <text x="730" y="460" textAnchor="middle" fontSize="16" fontWeight="600" fill="#fff">
                    Meghalaya
                  </text>
                </g>

                {/* Sea Labels */}
                <text x="120" y="300" fontSize="16" fill="#0369a1" fontStyle="italic" fontWeight="500">
                  Arabian Sea
                </text>
                <text x="650" y="1050" fontSize="16" fill="#0369a1" fontStyle="italic" fontWeight="500">
                  Bay of Bengal
                </text>
                <text x="750" y="1200" fontSize="16" fill="#0369a1" fontStyle="italic" fontWeight="500">
                  Indian Ocean
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Coverage States</h3>

                <div className="space-y-3">
                  {coverageStates.map((state) => (
                    <button
                      key={state.key}
                      onClick={() => setSelectedState(state.key)}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                        selectedState === state.key
                          ? 'bg-white shadow-lg scale-105 border-2'
                          : 'bg-white border-2 border-transparent hover:shadow-md'
                      }`}
                      style={{
                        borderColor: selectedState === state.key ? state.color : '#e2e8f0'
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded flex-shrink-0"
                        style={{ backgroundColor: state.color }}
                      />
                      <span className="font-semibold text-slate-900 text-left">{state.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* State Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {states.map((state, idx) => (
            <button
              key={state.key}
              onClick={() => setSelectedState(state.key)}
              className="text-left"
            >
              <StateCard state={state} index={idx} />
            </button>
          ))}
        </div>

        {/* State Details */}
        {selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-slate-200 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8">{STATE_DATA[selectedState].name} - Detailed Information</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Key Parameters</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">VNM Available</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].vnmAvailable ? '✓ Yes' : '✗ No'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">GNM Available</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].gnmAvailable ? '✓ Yes' : '✗ No'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Min Capacity</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].minCapacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Subsidy Available</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].subsidy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Processing Time</p>
                    <p className="font-semibold text-slate-900">{STATE_DATA[selectedState].processingTime}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4">Highlights</h3>
                <ul className="space-y-2 mb-6">
                  {STATE_DATA[selectedState].highlights.map((h, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-primary-600 font-bold">✓</span> {h}
                    </li>
                  ))}
                </ul>

                {STATE_DATA[selectedState].cons.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Important Notes</h4>
                    <ul className="space-y-2">
                      {STATE_DATA[selectedState].cons.map((c, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-slate-700">
                          <span className="text-orange-600 font-bold">!</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Eligible Consumer Types</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">VNM Eligible:</p>
                  <ul className="space-y-1">
                    {STATE_DATA[selectedState].eligibilityVNM.map((e, idx) => (
                      <li key={idx} className="text-sm text-slate-600">• {e}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">GNM Eligible:</p>
                  <ul className="space-y-1">
                    {STATE_DATA[selectedState].eligibilityGNM.map((e, idx) => (
                      <li key={idx} className="text-sm text-slate-600">• {e}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a href="/contact" className="btn-primary">
                Schedule Consultation for {STATE_DATA[selectedState].name}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
