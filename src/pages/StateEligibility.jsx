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

        {/* India Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 bg-white rounded-2xl p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Our Coverage Across India</h2>
          <svg viewBox="0 0 400 500" className="w-full max-w-2xl mx-auto" style={{ height: 'auto' }}>
            {/* India Map Background */}
            <rect width="400" height="500" fill="#f0f4f8" />

            {/* State shapes - simplified outlines */}
            {/* Karnataka */}
            <g
              onClick={() => setSelectedState('karnataka')}
              className={`cursor-pointer transition-all stroke-primary-400 stroke-2 ${selectedState === 'karnataka' ? 'fill-primary-600' : 'fill-primary-200'} hover:fill-primary-400`}
            >
              <path d="M 180 280 L 200 270 L 210 290 L 200 310 L 180 305 Z" />
              <text x="190" y="295" textAnchor="middle" className="text-sm font-bold fill-slate-900">KA</text>
            </g>

            {/* Maharashtra */}
            <g
              onClick={() => setSelectedState('maharashtra')}
              className={`cursor-pointer transition-all stroke-primary-400 stroke-2 ${selectedState === 'maharashtra' ? 'fill-primary-600' : 'fill-primary-200'} hover:fill-primary-400`}
            >
              <path d="M 160 240 L 180 230 L 190 250 L 175 270 L 160 260 Z" />
              <text x="175" y="250" textAnchor="middle" className="text-sm font-bold fill-slate-900">MH</text>
            </g>

            {/* Rajasthan */}
            <g
              onClick={() => setSelectedState('rajasthan')}
              className={`cursor-pointer transition-all stroke-primary-400 stroke-2 ${selectedState === 'rajasthan' ? 'fill-primary-600' : 'fill-primary-200'} hover:fill-primary-400`}
            >
              <path d="M 140 180 L 170 170 L 175 210 L 145 215 Z" />
              <text x="155" y="195" textAnchor="middle" className="text-sm font-bold fill-slate-900">RJ</text>
            </g>

            {/* Meghalaya */}
            <g
              onClick={() => setSelectedState('meghalaya')}
              className={`cursor-pointer transition-all stroke-primary-400 stroke-2 ${selectedState === 'meghalaya' ? 'fill-primary-600' : 'fill-primary-200'} hover:fill-primary-400`}
            >
              <path d="M 310 200 L 330 195 L 335 215 L 315 220 Z" />
              <text x="322" y="210" textAnchor="middle" className="text-sm font-bold fill-slate-900">ML</text>
            </g>

            {/* Chhattisgarh */}
            <g
              onClick={() => setSelectedState('chhattisgarh')}
              className={`cursor-pointer transition-all stroke-primary-400 stroke-2 ${selectedState === 'chhattisgarh' ? 'fill-primary-600' : 'fill-primary-200'} hover:fill-primary-400`}
            >
              <path d="M 240 280 L 270 275 L 275 310 L 245 315 Z" />
              <text x="260" y="295" textAnchor="middle" className="text-sm font-bold fill-slate-900">CG</text>
            </g>

            {/* Legend */}
            <text x="20" y="450" className="text-sm fill-slate-600">Click on a state to see details</text>
          </svg>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {states.map((state, idx) => (
            <button
              key={state.key}
              onClick={() => setSelectedState(state.key)}
              className="text-left"
            >
              <StateCard
                state={state}
                index={idx}
              />
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
