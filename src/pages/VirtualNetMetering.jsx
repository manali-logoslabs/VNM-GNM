import { motion } from 'framer-motion'
import { Users, Zap, TrendingUp, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BenefitCard } from '../components/Cards'

export default function VirtualNetMetering() {
  const benefits = [
    {
      icon: Users,
      title: 'Multiple People, One Solar Plant',
      description: 'Multiple consumers share the benefits of a single shared solar installation.',
    },
    {
      icon: Zap,
      title: 'Automatic Credit Distribution',
      description: 'Energy credits are automatically calculated and distributed to participants.',
    },
    {
      icon: TrendingUp,
      title: 'Significant Bill Savings',
      description: 'Save 30-50% on electricity bills by accessing solar energy without rooftop installation.',
    },
    {
      icon: CheckCircle,
      title: 'Government Approved',
      description: 'Fully legal and approved by state electricity regulatory commissions.',
    },
  ]

  const whoCanUse = [
    'Housing Societies & Apartment Associations',
    'Educational Institutions & Schools',
    'Charitable Organizations',
    'Government Buildings & Offices',
    'Local Authorities & Municipal Corporations',
    'Residential Communities & Complexes',
  ]

  const process = [
    {
      step: 1,
      title: 'Eligibility Check',
      description: 'Verify your organization qualifies for VNM based on consumer category and location.'
    },
    {
      step: 2,
      title: 'Solar Design',
      description: 'Our engineers design an optimal solar system for your shared space.'
    },
    {
      step: 3,
      title: 'Government Approval',
      description: 'File applications with the distribution company and get technical approval.'
    },
    {
      step: 4,
      title: 'Installation',
      description: 'Professional installation of solar panels and smart metering infrastructure.'
    },
    {
      step: 5,
      title: 'Commissioning',
      description: 'Grid connection, testing, and commissioning by the distribution company.'
    },
    {
      step: 6,
      title: 'Savings Begin',
      description: 'Start receiving energy credits and bill savings immediately.'
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
              Virtual Net Metering
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Share solar energy with your community. Perfect for housing societies, institutions, and residential complexes.
            </p>
            <Link to="/bill-simulator" className="btn-primary">
              <Zap className="w-5 h-5" />
              Calculate Your Savings
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-py">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">How VNM Works</h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                { step: 1, text: 'One shared solar plant is installed on common property' },
                { step: 2, text: 'Solar energy is generated and exported to the grid' },
                { step: 3, text: 'Distribution company tracks energy from all participants' },
                { step: 4, text: 'Energy credits are shared based on agreed ratios' },
                { step: 5, text: 'Each consumer receives credits on their individual bills' },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: item.step * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <p className="text-lg text-slate-700 pt-1">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-slate-50">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">VNM Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <BenefitCard key={idx} {...benefit} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Use */}
      <section className="section-py">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Who Can Use VNM?</h2>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {whoCanUse.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                <span className="text-slate-900 font-medium">{category}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Implementation Process */}
      <section className="section-py bg-slate-50">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Implementation Process</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg border-l-4 border-primary-600"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl font-bold text-primary-600">Step {item.step}</div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Save with Shared Solar?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Get your personalized savings estimate and book a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/bill-simulator" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors gap-2">
              Calculate Savings
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors gap-2">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
