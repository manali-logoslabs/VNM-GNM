import { motion } from 'framer-motion'
import { ArrowRight, Building2, Zap, GitBranch, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BenefitCard } from '../components/Cards'

export default function GroupNetMetering() {
  const benefits = [
    {
      icon: Building2,
      title: 'Multiple Connections, One Owner',
      description: 'Allocate solar energy across your multiple meters and locations efficiently.',
    },
    {
      icon: GitBranch,
      title: 'Flexible Priority Allocation',
      description: 'Set priorities for which meters receive energy credits first.',
    },
    {
      icon: Zap,
      title: 'Business Cost Reduction',
      description: 'Significantly reduce operating costs across your business or property portfolio.',
    },
    {
      icon: CheckCircle,
      title: 'For All Categories',
      description: 'Available for commercial, industrial, and multi-location businesses.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-py bg-gradient-to-br from-primary-50 to-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Group Net Metering
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              One owner, multiple connections. Perfect for businesses with multiple locations, large buildings, or industrial facilities.
            </p>
            <Link to="/calculator" className="btn-primary">
              <Zap className="w-5 h-5" />
              Calculate Your Savings
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-slate-50">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">GNM Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <BenefitCard key={idx} {...benefit} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-py">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Perfect For</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Commercial Buildings', desc: 'Multi-story office complexes with various tenants' },
              { title: 'Industrial Facilities', desc: 'Manufacturing plants with multiple production units' },
              { title: 'Business Chains', desc: 'Restaurant or retail groups with multiple locations' },
              { title: 'Hospitality Groups', desc: 'Hotels and resorts with multiple buildings' },
              { title: 'Real Estate Portfolios', desc: 'Property owners with multiple properties' },
              { title: 'Educational Campuses', desc: 'Large institutions with multiple buildings' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-primary-50 rounded-lg border border-primary-200"
              >
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Optimize Your Energy Costs?</h2>
          <Link to="/contact" className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
