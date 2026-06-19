import { motion } from 'framer-motion'
import { CheckCircle, Clock } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Assessment',
    description: 'Site evaluation & eligibility check',
    time: '2-3 days'
  },
  {
    number: 2,
    title: 'Registration',
    description: 'Apply with documentation',
    time: '3-5 days'
  },
  {
    number: 3,
    title: 'Approval',
    description: 'Government clearance',
    time: '15-30 days'
  },
  {
    number: 4,
    title: 'Installation',
    description: 'Solar system setup',
    time: '10-15 days'
  },
  {
    number: 5,
    title: 'Savings Begin',
    description: 'Enjoy reduced bills',
    time: 'Immediate'
  },
]

export default function JourneySection() {
  return (
    <section className="section-py bg-slate-50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Your Journey to Savings
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            5 simple steps from assessment to enjoying solar savings
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-primary-400 origin-left"
            />

            {/* Steps */}
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative"
                >
                  {/* Circle */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white border-4 border-primary-600 rounded-full flex items-center justify-center font-bold text-primary-600 text-xl shadow-sm relative z-10">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-primary-600">
                      <Clock className="w-3 h-3" />
                      {step.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4"
            >
              {/* Circle */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center font-bold text-white text-lg">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                <p className="text-xs text-primary-600 mt-2">{step.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-accent-100 text-accent-700 px-6 py-3 rounded-lg font-semibold">
            <CheckCircle className="w-5 h-5" />
            From assessment to savings: typically 30-60 days
          </div>
        </motion.div>
      </div>
    </section>
  )
}
