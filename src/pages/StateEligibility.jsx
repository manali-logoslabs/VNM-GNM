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
            {/* Interactive Map - Using Real India Map Image */}
            <div className="flex-1 min-w-0">
              <div className="relative max-w-2xl mx-auto">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/2011_census_India_religions_map_en.svg/800px-2011_census_India_religions_map_en.svg.png"
                  alt="India Map"
                  className="w-full h-auto rounded-lg border-2 border-slate-200"
                  style={{ maxWidth: '600px' }}
                />
                {/* Overlay for clickable states */}
                <div className="absolute inset-0 rounded-lg">
                  {/* Karnataka clickable area */}
                  <button
                    onClick={() => setSelectedState('karnataka')}
                    className="absolute hover:bg-green-400 hover:opacity-20 transition-opacity rounded"
                    style={{ left: '35%', top: '60%', width: '15%', height: '20%' }}
                    title="Karnataka"
                  />
                  {/* Maharashtra clickable area */}
                  <button
                    onClick={() => setSelectedState('maharashtra')}
                    className="absolute hover:bg-blue-400 hover:opacity-20 transition-opacity rounded"
                    style={{ left: '25%', top: '45%', width: '18%', height: '22%' }}
                    title="Maharashtra"
                  />
                  {/* Rajasthan clickable area */}
                  <button
                    onClick={() => setSelectedState('rajasthan')}
                    className="absolute hover:bg-orange-400 hover:opacity-20 transition-opacity rounded"
                    style={{ left: '18%', top: '25%', width: '22%', height: '28%' }}
                    title="Rajasthan"
                  />
                  {/* Chhattisgarh clickable area */}
                  <button
                    onClick={() => setSelectedState('chhattisgarh')}
                    className="absolute hover:bg-red-400 hover:opacity-20 transition-opacity rounded"
                    style={{ left: '42%', top: '45%', width: '18%', height: '25%' }}
                    title="Chhattisgarh"
                  />
                  {/* Meghalaya clickable area */}
                  <button
                    onClick={() => setSelectedState('meghalaya')}
                    className="absolute hover:bg-purple-400 hover:opacity-20 transition-opacity rounded"
                    style={{ left: '60%', top: '38%', width: '12%', height: '12%' }}
                    title="Meghalaya"
                  />
                </div>
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
