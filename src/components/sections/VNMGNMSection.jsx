import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Users, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const tabData = {
  vnm: {
    icon: Users,
    title: 'Virtual Net Metering',
    description: 'Multiple people, one solar plant',
    forWho: ['Housing Societies', 'Residential Communities', 'Educational Institutions', 'Government Buildings'],
    benefits: [
      'No individual installation needed',
      'Shared costs mean lower per-person expense',
      'Automatic credit distribution',
      'Perfect for communities'
    ],
    savings: '30-50% reduction in bills',
    link: '/vnm'
  },
  gnm: {
    icon: Building2,
    title: 'Group Net Metering',
    description: 'One owner, multiple connections',
    forWho: ['Commercial Buildings', 'Industrial Facilities', 'Business Chains', 'Multi-Floor Buildings'],
    benefits: [
      'Use solar across multiple meters',
      'Flexible energy allocation',
      'Optimize distribution per location',
      'Best for large properties'
    ],
    savings: '30-50% reduction in bills',
    link: '/gnm'
  }
}

export default function VNMGNMSection() {
  const [activeTab, setActiveTab] = useState('vnm')
  const data = tabData[activeTab]
  const Icon = data.icon

  return (
    <section id="vnm-gnm" className="section-py bg-white">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            VNM & GNM Explained
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the solar solution that fits your needs
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 p-1 rounded-lg">
            {Object.entries(tabData).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-2 font-semibold rounded transition-all ${
                  activeTab === key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {value.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 mb-12"
          >
            {/* Left - How It Works */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Icon className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="text-2xl font-bold">{data.title}</h3>
                  <p className="text-slate-600">{data.description}</p>
                </div>
              </div>

              {/* Who It's For */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-900 mb-4">Who It's For</h4>
                <div className="flex flex-wrap gap-2">
                  {data.forWho.map((who, idx) => (
                    <span key={idx} className="badge">
                      {who}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Key Benefits</h4>
                <ul className="space-y-3">
                  {data.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right - Diagram */}
            <div className="flex items-center justify-center">
              <div className="bg-slate-50 rounded-xl p-8 w-full">
                {activeTab === 'vnm' ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">☀️</span>
                      </div>
                      <p className="font-semibold text-slate-900">Solar Plant</p>
                      <p className="text-sm text-slate-600">(Shared by community)</p>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-primary-600 to-transparent" />
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="text-center p-3 bg-white rounded-lg border border-slate-200">
                          <div className="text-2xl mb-2">👤</div>
                          <p className="text-xs font-semibold">Person {i}</p>
                          <p className="text-xs text-slate-600">Gets 1/3 credits</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">☀️</span>
                      </div>
                      <p className="font-semibold text-slate-900">Solar Plant</p>
                      <p className="text-sm text-slate-600">(Owner: Company)</p>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-primary-600 to-transparent" />
                    <div className="space-y-2">
                      {[
                        { name: 'Floor 1', percent: '40%' },
                        { name: 'Floor 2', percent: '35%' },
                        { name: 'Floor 3', percent: '25%' },
                      ].map((floor, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border border-slate-200">
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">{floor.name}</p>
                            <p className="text-primary-600 font-bold">{floor.percent}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Savings & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8 text-center mb-12 border border-primary-200"
        >
          <p className="text-slate-600 mb-2">Typical Annual Savings</p>
          <p className="text-3xl font-bold text-primary-600 mb-4">{data.savings}</p>
          <Link to={data.link} className="btn-primary">
            Learn More
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
