import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { STATE_DATA } from '../../data/states'

export default function LeadGenSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: 'karnataka'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', phone: '', email: '', state: 'karnataka' })
    }, 3000)
  }

  return (
    <section id="contact" className="section-py bg-gradient-to-br from-primary-900 to-primary-800 text-white relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700 rounded-full blur-3xl opacity-20" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              See How Much <span className="text-accent-400">You Can Save</span>
            </h2>
            <p className="text-lg text-primary-100">
              Our solar experts will analyze your situation and provide a personalized savings estimate.
            </p>

            {/* Benefits Checklist */}
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-6 h-6 text-accent-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Free Assessment</p>
                  <p className="text-sm text-primary-100">No cost, no obligation site evaluation</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-6 h-6 text-accent-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Personalized Quote</p>
                  <p className="text-sm text-primary-100">Exact savings based on your situation</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-6 h-6 text-accent-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Expert Guidance</p>
                  <p className="text-sm text-primary-100">Help choosing between VNM and GNM</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-primary-700 space-y-2">
              <p className="text-xs text-primary-200 font-semibold">TRUSTED BY THOUSANDS</p>
              <div className="flex gap-4 flex-wrap">
                <span className="text-xs bg-primary-700 px-3 py-1 rounded-full text-primary-100">
                  ✓ KERC Approved
                </span>
                <span className="text-xs bg-primary-700 px-3 py-1 rounded-full text-primary-100">
                  ✓ PM Surya Ghar Partner
                </span>
                <span className="text-xs bg-primary-700 px-3 py-1 rounded-full text-primary-100">
                  ✓ 10,000+ Happy Customers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Rajesh Kumar"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rajesh@example.com"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Your State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
                    >
                      {Object.entries(STATE_DATA).map(([key, data]) => (
                        <option key={key} value={key}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    Get Free Assessment
                  </button>

                  <p className="text-xs text-slate-600 text-center">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="w-16 h-16 text-accent-600 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Our solar experts will contact you within 24 hours with your personalized assessment.
                  </p>
                  <p className="text-sm text-slate-500">
                    In the meantime, check out our <a href="/calculator" className="text-primary-600 font-semibold hover:underline">calculator</a> for instant estimates.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
