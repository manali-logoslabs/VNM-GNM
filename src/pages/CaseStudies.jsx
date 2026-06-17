import { motion } from 'framer-motion'
import { CASE_STUDIES, BENEFITS_HIGHLIGHTED } from '../data/caseStudies'
import { CaseStudyCard, StatCard } from '../components/Cards'

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-wide py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Success Stories</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real projects, real savings. See how communities and businesses are benefiting.
          </p>
        </motion.div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {BENEFITS_HIGHLIGHTED.map((benefit, idx) => (
            <StatCard
              key={idx}
              {...benefit}
              index={idx}
            />
          ))}
        </div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, idx) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={idx}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-8 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4">Become Our Next Success Story</h3>
          <p className="text-primary-100 mb-6">
            Schedule a consultation to explore how shared solar can save your organization money.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Book Consultation
          </a>
        </motion.div>
      </div>
    </div>
  )
}
