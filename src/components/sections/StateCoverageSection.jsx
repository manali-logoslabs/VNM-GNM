import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { STATE_DATA } from '../../data/states'
import { MapPin, ArrowRight } from 'lucide-react'

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

        {/* State List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-3 mb-12"
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

        {/* Selected State Details */}
        {selectedState && (
          <motion.div
            key={selectedState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-8 border border-primary-200 mb-12"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {STATE_DATA[selectedState].name}
                </h3>
                <p className="text-slate-600">{STATE_DATA[selectedState].region}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">Minimum Solar Capacity</p>
                  <p className="text-lg font-semibold text-slate-900">{STATE_DATA[selectedState].minCapacity}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">Subsidy Available</p>
                  <p className="text-lg font-semibold text-accent-600">{STATE_DATA[selectedState].subsidy}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">Processing Time</p>
                  <p className="text-lg font-semibold text-slate-900">{STATE_DATA[selectedState].processingTime}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">Surplus Tariff</p>
                  <p className="text-lg font-semibold text-slate-900">{STATE_DATA[selectedState].surplusTariff}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {STATE_DATA[selectedState].highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-accent-600 font-bold">✓</span>
                      <span>{highlight}</span>
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
            View All States & Details
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
