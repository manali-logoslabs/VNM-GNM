import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sun, Zap, Leaf, TrendingUp, MapPin, Users, Award, Home as HomeIcon } from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'
import { BenefitCard, StatCard, FormationCard, CaseStudyCard } from '../components/Cards'
import { CASE_STUDIES } from '../data/caseStudies'
import SavingsCalculatorWidget from '../components/SavingsCalculatorWidget'

export default function Home() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Lower Electricity Bills',
      description: 'Save 30-50% on your monthly electricity bills with shared solar energy.'
    },
    {
      icon: Sun,
      title: 'No Rooftop Required',
      description: 'Access solar benefits without installing panels on your own property.'
    },
    {
      icon: Zap,
      title: 'Shared Solar Access',
      description: 'Multiple consumers benefit from one centralized solar plant.'
    },
    {
      icon: Leaf,
      title: 'Environment Friendly',
      description: 'Reduce your carbon footprint and help fight climate change.'
    },
    {
      icon: Award,
      title: 'Government Approved',
      description: 'Fully legal, regulated, and supported by electricity commissions.'
    },
    {
      icon: TrendingUp,
      title: 'Long-Term Savings',
      description: 'Enjoy 25+ years of consistent savings with minimal maintenance.'
    }
  ]

  const stats = [
    { label: 'Total Projects', value: '100+', description: 'Across 5 states' },
    { label: 'Consumers Helped', value: '10,000+', description: 'Enjoying savings' },
    { label: 'Solar Installed', value: '25 MW+', description: 'Clean energy capacity' },
    { label: 'Savings Generated', value: '₹500 Cr+', description: 'Annual impact' }
  ]

  const formations = [
    {
      title: 'Virtual Net Metering',
      subtitle: 'Multiple people, one solar plant',
      benefits: [
        'Perfect for housing societies and communities',
        'Share solar energy among multiple consumers',
        'Credits automatically distributed',
        'No individual installation needed'
      ],
      icon: Users
    },
    {
      title: 'Group Net Metering',
      subtitle: 'One owner, multiple connections',
      benefits: [
        'Ideal for businesses with multiple locations',
        'Use solar across different meters',
        'Priority-based credit allocation',
        'Complex buildings get efficient distribution'
      ],
      icon: HomeIcon,
      isHighlighted: true
    }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-py bg-gradient-to-br from-white via-primary-50 to-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <span className="badge">Introducing Shared Solar</span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Reduce Your Electricity Bills Through <span className="gradient-text">Shared Solar</span> Energy
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Access solar benefits without installing solar panels on your own rooftop. Join housing societies, businesses, and institutions saving thousands annually through Virtual Net Metering and Group Net Metering.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/calculator" className="btn-primary">
                    <Zap className="w-5 h-5" />
                    Calculate My Savings
                  </Link>
                  <Link to="/contact" className="btn-secondary">
                    <ArrowRight className="w-5 h-5" />
                    Book Free Consultation
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">10,000+</p>
                    <p className="text-sm text-slate-600">Consumers Benefited</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-600">₹500 Cr+</p>
                    <p className="text-sm text-slate-600">Total Savings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-600">25 MW</p>
                    <p className="text-sm text-slate-600">Solar Installed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block relative h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-primary-100 rounded-3xl blur-3xl opacity-40" />
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sun className="w-32 h-32 text-primary-600 mx-auto" />
                  </motion.div>
                  <p className="text-sm font-semibold text-slate-600">Shared Solar Network</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-py">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Three simple concepts powering shared solar solutions for your community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {formations.map((formation, idx) => (
              <FormationCard
                key={idx}
                {...formation}
                index={idx}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/comparison" className="btn-outline">
              <ArrowRight className="w-5 h-5" />
              View Detailed Comparison
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interactive Savings Calculator Preview */}
      <section className="section-py bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">See Your Savings Potential</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get an instant estimate of how much you can save with shared solar.
            </p>
          </div>

          <SavingsCalculatorWidget />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link to="/calculator" className="btn-primary">
              <Zap className="w-5 h-5" />
              View Detailed Calculator
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-py">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Customers Choose VNM & GNM</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Benefits that go beyond just savings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <BenefitCard
                key={idx}
                {...benefit}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* States Availability */}
      <section className="section-py bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Available in Your State</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We operate across 5 major Indian states with proven implementations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {['Karnataka', 'Maharashtra', 'Rajasthan', 'Meghalaya', 'Chhattisgarh'].map((state, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center hover:shadow-premium transition-all"
              >
                <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{state}</h3>
                <p className="text-sm text-slate-600">VNM & GNM Available</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/states" className="btn-secondary">
              <MapPin className="w-5 h-5" />
              Explore State Details
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-py">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Real Success Stories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how communities and businesses are saving big with shared solar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {CASE_STUDIES.slice(0, 3).map((study, idx) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                index={idx}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/case-studies" className="btn-primary">
              <ArrowRight className="w-5 h-5" />
              View All Case Studies
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-py bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary-400 mb-2">
                  <AnimatedCounter
                    to={parseInt(stat.value.replace(/\D/g, ''))}
                    duration={2}
                    suffix={stat.value.includes('MW') ? ' MW' : stat.value.includes('₹') ? '' : '+'}
                    prefix={stat.value.includes('₹') ? '₹' : ''}
                    delay={idx * 0.1}
                  />
                </div>
                <p className="text-slate-300 font-semibold mb-1">{stat.label}</p>
                <p className="text-slate-400 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-py">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Common questions answered.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 mb-8">
            {[
              {
                q: 'What is Virtual Net Metering (VNM)?',
                a: 'VNM is a system where solar energy from one shared solar plant is credited to multiple consumer accounts. Perfect for housing societies and communities.'
              },
              {
                q: 'How much can I save?',
                a: 'Savings vary based on location and consumption, but typically range from 30-50% on electricity bills.'
              },
              {
                q: 'Do I need rooftop space?',
                a: 'You need rooftop or ground space for the solar installation, but it benefits everyone in the network.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/faq" className="btn-secondary">
              View More Questions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-py bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Save on Electricity Bills?</h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
            Get your personalized savings estimate and join thousands of happy customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors gap-2">
              <Zap className="w-5 h-5" />
              Calculate Savings
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors gap-2">
              <ArrowRight className="w-5 h-5" />
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
