import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQS, FAQ_CATEGORIES } from '../data/faqs'

export default function FAQ() {
  const [expandedId, setExpandedId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter(faq => faq.category === selectedCategory)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-wide py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get answers to common questions about VNM and GNM.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${
                    expandedId === faq.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {expandedId === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 py-4 bg-slate-50 border-t border-slate-200"
                >
                  <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
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
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-primary-100 mb-6">
            Our team is ready to answer any questions and help you explore your solar options.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </div>
  )
}
