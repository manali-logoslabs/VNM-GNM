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

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center max-w-6xl mx-auto">
            {/* Interactive Map */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                {/* India Map Background Image */}
                <svg viewBox="0 0 960 1120" className="w-full h-auto" style={{ maxWidth: '600px' }}>
                  {/* Ocean Background */}
                  <rect width="960" height="1120" fill="#bfdbfe" />

                  {/* India Outline and States */}
                  <g>
                    {/* Other states base (cream) */}
                    <g fill="#f5e6d3" stroke="#9ca3af" strokeWidth="1">
                      {/* Simplified state outlines for non-coverage states */}
                      <path d="M 200,100 L 300,80 L 350,100 L 380,150 L 360,200 L 280,210 L 220,180 Z" /> {/* North */}
                      <path d="M 400,150 L 500,140 L 550,170 L 530,240 L 450,250 Z" /> {/* NE */}
                      <path d="M 600,250 L 700,220 L 750,280 L 720,350 L 650,330 Z" /> {/* East */}
                      <path d="M 300,800 L 400,850 L 380,950 L 300,980 Z" /> {/* South East */}
                      <path d="M 200,850 L 300,900 L 280,1000 L 180,980 Z" /> {/* South */}
                      <path d="M 100,700 L 200,750 L 180,850 L 80,800 Z" /> {/* West coast */}
                    </g>

                    {/* Rajasthan - Orange (3) */}
                    <g
                      onClick={() => setSelectedState('rajasthan')}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <path
                        d="M 180,200 L 320,170 L 380,220 L 360,380 L 280,400 L 180,320 Z"
                        fill="#f97316"
                        stroke="#ea580c"
                        strokeWidth="2"
                      />
                      <text x="280" y="300" textAnchor="middle" fontSize="16" fontWeight="600" fill="black">
                        Rajasthan
                      </text>
                    </g>

                    {/* Maharashtra - Blue (2) */}
                    <g
                      onClick={() => setSelectedState('maharashtra')}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <path
                        d="M 240,380 L 320,360 L 360,420 L 350,550 L 280,580 L 240,480 Z"
                        fill="#2563eb"
                        stroke="#1e40af"
                        strokeWidth="2"
                      />
                      <text x="310" y="470" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">
                        Maharashtra
                      </text>
                    </g>

                    {/* Karnataka - Green (1) */}
                    <g
                      onClick={() => setSelectedState('karnataka')}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <path
                        d="M 260,580 L 340,560 L 380,650 L 360,780 L 300,820 L 240,780 Z"
                        fill="#16a34a"
                        stroke="#15803d"
                        strokeWidth="2"
                      />
                      <text x="320" y="680" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">
                        Karnataka
                      </text>
                    </g>

                    {/* Chhattisgarh - Red (5) */}
                    <g
                      onClick={() => setSelectedState('chhattisgarh')}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <path
                        d="M 380,420 L 480,400 L 540,480 L 520,600 L 440,620 L 380,540 Z"
                        fill="#dc2626"
                        stroke="#b91c1c"
                        strokeWidth="2"
                      />
                      <text x="470" y="520" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">
                        Chhattisgarh
                      </text>
                    </g>

                    {/* Meghalaya - Purple (4) */}
                    <g
                      onClick={() => setSelectedState('meghalaya')}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <path
                        d="M 560,380 L 640,360 L 680,420 L 650,460 L 580,440 Z"
                        fill="#a855f7"
                        stroke="#9333ea"
                        strokeWidth="2"
                      />
                      <text x="630" y="420" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">
                        Meghalaya
                      </text>
                    </g>

                    {/* Sea Labels */}
                    <text x="100" y="250" fontSize="14" fill="#0369a1" fontStyle="italic" fontWeight="500">
                      Arabian Sea
                    </text>
                    <text x="550" y="950" fontSize="14" fill="#0369a1" fontStyle="italic" fontWeight="500">
                      Bay of Bengal
                    </text>
                    <text x="700" y="1080" fontSize="14" fill="#0369a1" fontStyle="italic" fontWeight="500">
                      Indian Ocean
                    </text>
                  </g>
                </svg>
              </div>
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
