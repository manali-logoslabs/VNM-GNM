import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { STATE_DATA } from '../../data/states'
import { MapPin, ArrowRight } from 'lucide-react'

const STATE_POSITIONS = {
  karnataka: { top: '60%', left: '45%' },
  maharashtra: { top: '50%', left: '30%' },
  rajasthan: { top: '35%', left: '35%' },
  meghalaya: { top: '25%', left: '80%' },
  chhattisgarh: { top: '50%', left: '60%' },
}

export default function StateCoverageSection() {
  const [selectedState, setSelectedState] = useState('karnataka')
  const states = Object.entries(STATE_DATA)

  return (
    <section id="coverage" className="section-py bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            We Operate Across India
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Available in 5 major states with proven track record
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* State List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {states.map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedState(key)}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                  selectedState === key
                    ? 'bg-primary-600 text-white shadow-glow'
                    : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{data.name}</span>
                  <MapPin className="w-4 h-4" />
                </div>
              </button>
            ))}
          </motion.div>

          {/* State Map */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-slate-50 rounded-xl p-8 relative min-h-64"
          >
            <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-slate-100 rounded-lg overflow-hidden">
              {/* India outline (simplified) */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <svg className="w-full h-full opacity-20" viewBox="0 0 100 120" fill="none">
                  <path d="M30,20 L70,15 L75,40 L80,60 L70,80 L50,90 L30,85 L20,60 Z" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* State Dots */}
              {states.map(([key, data]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedState(key)}
                  className={`absolute w-4 h-4 rounded-full transition-all transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedState === key
                      ? 'bg-primary-600 ring-4 ring-primary-200 scale-125'
                      : 'bg-primary-400 hover:scale-110'
                  }`}
                  style={STATE_POSITIONS[key]}
                  whileHover={{ scale: 1.2 }}
                />
              ))}

              {/* Label */}
              <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-sm">
                <p className="text-xs text-slate-600">Click a state to explore</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Selected State Details */}
        {selectedState && (
          <motion.div
            key={selectedState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-200 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {STATE_DATA[selectedState].name}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">Region</p>
                    <p className="text-slate-900">{STATE_DATA[selectedState].region}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">Minimum Solar Capacity</p>
                    <p className="text-slate-900">{STATE_DATA[selectedState].minCapacity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">Subsidy Available</p>
                    <p className="text-accent-600 font-semibold">{STATE_DATA[selectedState].subsidy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">Processing Time</p>
                    <p className="text-slate-900">{STATE_DATA[selectedState].processingTime}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Key Highlights</h4>
                <ul className="space-y-2 mb-6">
                  {STATE_DATA[selectedState].highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-accent-600 font-bold">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-slate-900 mb-3">Things to Know</h4>
                <ul className="space-y-2">
                  {STATE_DATA[selectedState].cons.map((con, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-slate-400">◦</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Explore More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/states" className="btn-secondary">
            <MapPin className="w-5 h-5" />
            Explore All States & Details
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
