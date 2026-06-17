import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

export function BenefitCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card-premium p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function StatCard({ label, value, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card-premium p-6 sm:p-8 text-center"
    >
      <p className="text-slate-600 text-sm font-medium mb-2">{label}</p>
      <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{value}</p>
      <p className="text-slate-600 text-sm">{description}</p>
    </motion.div>
  )
}

export function FormationCard({ title, subtitle, benefits, icon: Icon, index = 0, isHighlighted = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`rounded-2xl border-2 p-8 transition-all duration-300 ${
        isHighlighted
          ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-300 shadow-premium'
          : 'bg-white border-slate-200 hover:shadow-premium'
      }`}
    >
      {isHighlighted && (
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          Most Popular
        </div>
      )}

      <div className="flex items-start gap-4 mb-6">
        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isHighlighted ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          <p className="text-slate-600 text-sm mt-1">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              isHighlighted ? 'text-primary-600' : 'text-primary-500'
            }`} />
            <span className="text-slate-700 text-sm">{benefit}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function CaseStudyCard({ study, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card-premium overflow-hidden hover:shadow-premium transition-shadow duration-300"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 text-white">
        <h3 className="text-xl font-bold">{study.title}</h3>
        <p className="text-primary-100 text-sm">{study.location}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-slate-600 mb-1"><span className="font-semibold">Type:</span> {study.type}</p>
          <p className="text-sm text-slate-600"><span className="font-semibold">Timeline:</span> {study.timeline}</p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200">
          <div>
            <p className="text-sm text-slate-600">Annual Savings</p>
            <p className="text-lg font-bold text-primary-600">{study.results.annualSavings}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Payback Period</p>
            <p className="text-lg font-bold text-primary-600">{study.results.paybackPeriod}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Solar Capacity</p>
            <p className="text-lg font-bold text-primary-600">{study.results.solarCapacity}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Beneficiaries</p>
            <p className="text-lg font-bold text-primary-600">{study.results.consumersBeenfitted}</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-sm italic text-slate-700 mb-2">"{study.testimonial}"</p>
          <p className="text-xs font-medium text-slate-600">— {study.testimonialBy}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function StateCard({ state, onClick, index = 0 }) {
  const data = state.data

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="w-full card-premium p-6 text-left hover:shadow-premium transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{data.name}</h3>
          <p className="text-sm text-slate-600">{data.region}</p>
        </div>
        <div className="flex gap-2">
          {data.vnmAvailable && (
            <span className="badge">VNM</span>
          )}
          {data.gnmAvailable && (
            <span className="badge">GNM</span>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p><span className="font-semibold text-slate-900">Min Capacity:</span> <span className="text-slate-600">{data.minCapacity}</span></p>
        <p><span className="font-semibold text-slate-900">Subsidy:</span> <span className="text-slate-600">{data.subsidy}</span></p>
        <p><span className="font-semibold text-slate-900">Process:</span> <span className="text-slate-600">{data.processingTime}</span></p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-primary-600 font-semibold text-sm">Click to explore details →</p>
      </div>
    </motion.button>
  )
}
