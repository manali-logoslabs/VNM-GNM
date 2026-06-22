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
          <svg viewBox="0 0 950 1100" className="w-full max-w-4xl mx-auto" style={{ height: 'auto' }}>
            {/* India Outline - Proper coastline and borders */}
            <g fill="#f0f4f8" stroke="#94a3b8" strokeWidth="1.5">
              {/* Main India body */}
              <path d="M 280,150 L 320,140 L 360,145 L 400,140 L 450,145 L 500,140 L 550,150 L 600,145 L 650,155 L 700,150 L 750,165 L 800,170 L 850,180 L 880,200 L 900,230 L 920,260 L 930,300 L 940,350 L 945,400 L 950,450 L 948,500 L 945,550 L 940,600 L 935,650 L 930,700 L 920,750 L 900,800 L 880,850 L 850,900 L 800,930 L 750,950 L 700,960 L 650,965 L 600,970 L 550,975 L 500,978 L 450,980 L 400,982 L 350,980 L 300,978 L 250,975 L 200,970 L 150,960 L 100,945 L 70,920 L 50,880 L 40,840 L 35,800 L 32,750 L 30,700 L 28,650 L 25,600 L 22,550 L 20,500 L 18,450 L 15,400 L 12,350 L 10,300 L 8,250 L 10,200 L 15,160 L 30,140 L 60,130 L 100,125 L 150,130 L 200,135 L 250,140 Z" />
            </g>

            {/* Rajasthan (RJ) - Northwestern India */}
            <g
              onClick={() => setSelectedState('rajasthan')}
              className={`cursor-pointer transition-all ${selectedState === 'rajasthan' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2.5 }}
            >
              <path d="M 200,250 L 280,230 L 340,240 L 360,320 L 320,380 L 240,370 L 180,300 Z" />
              <text x="285" y="315" textAnchor="middle" className="text-2xl font-bold fill-white pointer-events-none">RJ</text>
            </g>

            {/* Maharashtra (MH) - Western India */}
            <g
              onClick={() => setSelectedState('maharashtra')}
              className={`cursor-pointer transition-all ${selectedState === 'maharashtra' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2.5 }}
            >
              <path d="M 240,370 L 320,380 L 360,460 L 380,550 L 340,600 L 280,580 L 250,480 Z" />
              <text x="310" y="475" textAnchor="middle" className="text-2xl font-bold fill-white pointer-events-none">MH</text>
            </g>

            {/* Karnataka (KA) - Southwestern India */}
            <g
              onClick={() => setSelectedState('karnataka')}
              className={`cursor-pointer transition-all ${selectedState === 'karnataka' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2.5 }}
            >
              <path d="M 280,580 L 340,600 L 360,700 L 340,800 L 280,820 L 250,750 L 260,650 Z" />
              <text x="310" y="710" textAnchor="middle" className="text-2xl font-bold fill-white pointer-events-none">KA</text>
            </g>

            {/* Chhattisgarh (CG) - Central India */}
            <g
              onClick={() => setSelectedState('chhattisgarh')}
              className={`cursor-pointer transition-all ${selectedState === 'chhattisgarh' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2.5 }}
            >
              <path d="M 400,400 L 480,390 L 540,420 L 530,540 L 460,560 L 390,520 Z" />
              <text x="470" y="475" textAnchor="middle" className="text-2xl font-bold fill-white pointer-events-none">CG</text>
            </g>

            {/* Meghalaya (ML) - Northeastern India */}
            <g
              onClick={() => setSelectedState('meghalaya')}
              className={`cursor-pointer transition-all ${selectedState === 'meghalaya' ? 'fill-primary-600' : 'fill-primary-400'} hover:fill-primary-500`}
              style={{ stroke: '#1e40af', strokeWidth: 2.5 }}
            >
              <path d="M 700,320 L 760,310 L 800,350 L 780,400 L 720,390 Z" />
              <text x="760" y="360" textAnchor="middle" className="text-xl font-bold fill-white pointer-events-none">ML</text>
            </g>

            {/* Legend */}
            <text x="80" y="1050" className="text-lg font-semibold fill-slate-900">Click on a state to see details</text>
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
