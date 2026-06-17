import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { CONSUMER_TYPES } from '../data/states'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    state: 'karnataka',
    phone: '',
    email: '',
    consumerType: 'housing_society',
    monthlyBill: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '', company: '', state: 'karnataka', phone: '',
        email: '', consumerType: 'housing_society', monthlyBill: '', message: ''
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-wide py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Schedule a free consultation with our solar experts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Phone</h3>
                      <p className="text-slate-600">+91 XXXXX XXXXX</p>
                      <p className="text-sm text-slate-500">Mon-Fri, 9AM-6PM IST</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Email</h3>
                      <p className="text-slate-600">hello@sharedsolar.co</p>
                      <p className="text-sm text-slate-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Offices</h3>
                      <p className="text-slate-600">Bangalore, Mumbai, Pune</p>
                      <p className="text-sm text-slate-500">Serving 5 Indian states</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
                <h3 className="font-bold text-slate-900 mb-3">Why Contact Us?</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>✓ Free solar potential assessment</li>
                  <li>✓ Customized savings analysis</li>
                  <li>✓ Subsidy eligibility guidance</li>
                  <li>✓ No obligation consultation</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-slate-200"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Thank You!</h3>
                <p className="text-slate-600 text-center">We've received your message. Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Organization"
                    value={formData.company}
                    onChange={handleChange}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {['karnataka', 'maharashtra', 'rajasthan', 'meghalaya', 'chhattisgarh'].map(s => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <select
                    name="consumerType"
                    value={formData.consumerType}
                    onChange={handleChange}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {CONSUMER_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="monthlyBill"
                    placeholder="Monthly Bill (₹)"
                    value={formData.monthlyBill}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  <Send className="w-5 h-5" />
                  Schedule Free Consultation
                </button>
                <p className="text-xs text-slate-500 text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
