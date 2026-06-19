import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CASE_STUDIES } from '../../data/caseStudies'
import { MapPin, ArrowRight } from 'lucide-react'
import AnimatedCounter from '../AnimatedCounter'

export default function SuccessStoriesSection() {
  const [filter, setFilter] = useState('All')

  const typeFilters = ['All', 'Housing Society', 'Educational', 'Commercial', 'Industrial']

  const filteredCases = filter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(c => c.type === filter)

  return (
    <section id="stories" className="section-py bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Real Success Stories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            See how communities and businesses are already saving big
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {typeFilters.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  filter === type
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 mb-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 mb-2">
              ₹<AnimatedCounter to={4250} duration={2} suffix=" Cr+" />
            </p>
            <p className="text-sm text-slate-600">Total Savings Generated</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 mb-2">
              <AnimatedCounter to={800} duration={2} suffix="+" />
            </p>
            <p className="text-sm text-slate-600">Consumers Benefitted</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 mb-2">
              <AnimatedCounter to={1320} duration={2} suffix=" kW" />
            </p>
            <p className="text-sm text-slate-600">Total Solar Capacity</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 mb-2">
              5.6<span className="text-lg"> yr</span>
            </p>
            <p className="text-sm text-slate-600">Average Payback</p>
          </div>
        </motion.div>

        {/* Case Studies */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredCases.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-premium overflow-hidden hover:shadow-premium transition-all"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{study.title}</h3>
                      <p className="text-sm text-primary-100 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {study.location}
                      </p>
                    </div>
                    <span className="badge bg-white/20 text-white text-xs">{study.type}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-slate-200">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Annual Savings</p>
                      <p className="text-lg font-bold text-accent-600">{study.results.annualSavings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Payback Period</p>
                      <p className="text-lg font-bold text-primary-600">{study.results.paybackPeriod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Solar Capacity</p>
                      <p className="text-lg font-bold text-slate-900">{study.results.solarCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Consumers</p>
                      <p className="text-lg font-bold text-slate-900">{study.results.consumersBeenfitted}</p>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <blockquote className="mb-4 text-sm text-slate-700 italic">
                    "{study.testimonial}"
                  </blockquote>

                  <p className="text-xs font-semibold text-slate-600 mb-4">
                    — {study.testimonialBy}
                  </p>

                  <p className="text-xs text-slate-500 pb-4 border-b border-slate-200 mb-4">
                    ⏱️ {study.timeline}
                  </p>

                  {/* Savings Badge */}
                  <div className="bg-accent-50 rounded-lg p-3 text-center border border-accent-200">
                    <p className="text-xs text-slate-600">Savings Achievement</p>
                    <p className="text-lg font-bold text-accent-600">{study.results.percentageSavings}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/case-studies" className="btn-secondary">
            <ArrowRight className="w-5 h-5" />
            View All Case Studies
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
