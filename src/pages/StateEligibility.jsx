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
    { key: 'karnataka', name: 'Karnataka', number: 1, color: '#16a34a', lat: 15.3, lng: 75.8 },
    { key: 'maharashtra', name: 'Maharashtra', number: 2, color: '#2563eb', lat: 19.3, lng: 75.7 },
    { key: 'rajasthan', name: 'Rajasthan', number: 3, color: '#f97316', lat: 27.5, lng: 73.5 },
    { key: 'meghalaya', name: 'Meghalaya', number: 4, color: '#a855f7', lat: 25.5, lng: 91.8 },
    { key: 'chhattisgarh', name: 'Chhattisgarh', number: 5, color: '#dc2626', lat: 22.0, lng: 82.5 }
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

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 bg-white rounded-2xl p-8 border border-slate-200"
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-slate-900">INDIA MAP</h2>
          <p className="text-center text-slate-600 mb-8 text-sm">Our 5 Coverage States</p>

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center max-w-6xl mx-auto">
            {/* Map SVG */}
            <div className="flex-1 min-w-0">
              <svg viewBox="0 0 800 950" className="w-full h-auto" style={{ maxWidth: '550px' }}>
                {/* Ocean/Water Background */}
                <rect width="800" height="950" fill="#bfdbfe" />

                {/* India Main Outline (Cream Background) */}
                <path
                  d="M 250,150 L 350,120 L 420,100 L 500,110 L 580,90 L 680,120 L 750,180 L 780,250 L 790,350 L 795,450 L 792,550 L 780,650 L 750,750 L 700,820 L 600,880 L 450,920 L 300,900 L 150,850 L 80,750 L 50,650 L 30,550 L 25,450 L 28,350 L 35,250 L 60,180 L 120,130 L 180,115 Z"
                  fill="#f5e6d3"
                  stroke="#8b7355"
                  strokeWidth="2"
                />

                {/* Karnataka - Green */}
                <g onClick={() => setSelectedState('karnataka')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <path
                    d="M 380,520 L 420,510 L 450,530 L 445,600 L 410,630 L 370,620 Z"
                    fill="#16a34a"
                    stroke="#15803d"
                    strokeWidth="2"
                  />
                  <text x="410" y="570" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">
                    1
                  </text>
                  <text x="410" y="660" textAnchor="middle" fontSize="14" fontWeight="600" fill="#15803d">
                    Karnataka
                  </text>
                </g>

                {/* Maharashtra - Blue */}
                <g onClick={() => setSelectedState('maharashtra')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <path
                    d="M 330,420 L 380,400 L 410,430 L 420,510 L 380,520 L 340,480 Z"
                    fill="#2563eb"
                    stroke="#1e40af"
                    strokeWidth="2"
                  />
                  <text x="375" y="465" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">
                    2
                  </text>
                  <text x="375" y="550" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e40af">
                    Maharashtra
                  </text>
                </g>

                {/* Rajasthan - Orange */}
                <g onClick={() => setSelectedState('rajasthan')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <path
                    d="M 240,250 L 330,220 L 370,280 L 360,380 L 280,390 L 220,320 Z"
                    fill="#f97316"
                    stroke="#ea580c"
                    strokeWidth="2"
                  />
                  <text x="310" y="320" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">
                    3
                  </text>
                  <text x="310" y="410" textAnchor="middle" fontSize="14" fontWeight="600" fill="#ea580c">
                    Rajasthan
                  </text>
                </g>

                {/* Meghalaya - Purple */}
                <g onClick={() => setSelectedState('meghalaya')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <path
                    d="M 520,330 L 580,310 L 620,350 L 590,390 L 530,370 Z"
                    fill="#a855f7"
                    stroke="#9333ea"
                    strokeWidth="2"
                  />
                  <text x="570" y="360" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">
                    4
                  </text>
                  <text x="570" y="420" textAnchor="middle" fontSize="14" fontWeight="600" fill="#9333ea">
                    Meghalaya
                  </text>
                </g>

                {/* Chhattisgarh - Red */}
                <g onClick={() => setSelectedState('chhattisgarh')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <path
                    d="M 420,430 L 500,410 L 550,450 L 535,530 L 460,550 L 410,480 Z"
                    fill="#dc2626"
                    stroke="#b91c1c"
                    strokeWidth="2"
                  />
                  <text x="485" y="485" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">
                    5
                  </text>
                  <text x="485" y="570" textAnchor="middle" fontSize="14" fontWeight="600" fill="#b91c1c">
                    Chhattisgarh
                  </text>
                </g>

                {/* Sea Labels */}
                <text x="150" y="200" fontSize="12" fill="#0369a1" fontStyle="italic">
                  Arabian Sea
                </text>
                <text x="500" y="750" fontSize="12" fill="#0369a1" fontStyle="italic">
                  Bay of Bengal
                </text>
                <text x="600" y="950" fontSize="12" fill="#0369a1" fontStyle="italic">
                  Indian Ocean
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex-1 min-w-0">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Coverage States</h3>

                <div className="space-y-4">
                  {coverageStates.map((state) => (
                    <button
                      key={state.key}
                      onClick={() => setSelectedState(state.key)}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                        selectedState === state.key
                          ? 'bg-white shadow-lg border-2'
                          : 'bg-white border-2 border-transparent hover:shadow-md'
                      }`}
                      style={{
                        borderColor: selectedState === state.key ? state.color : '#e2e8f0'
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                        style={{ backgroundColor: state.color }}
                      >
                        {state.number}
                      </div>
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
