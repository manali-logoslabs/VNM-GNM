import { motion } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

export default function Comparison() {
  const comparison = [
    { feature: 'Number of Consumers', vnm: 'Multiple', gnm: 'One (Multiple Connections)' },
    { feature: 'Participants', vnm: '2 or More Different People', gnm: 'Same Owner, Different Meters' },
    { feature: 'Eligible Categories', vnm: 'Residential, Charitable, Govt', gnm: 'All Categories' },
    { feature: 'Solar Plant Location', vnm: 'Common Area', gnm: 'Any Building of Owner' },
    { feature: 'Credit Allocation', vnm: 'By Sharing Ratio', gnm: 'By Priority Order' },
    { feature: 'Complexity', vnm: 'Medium', gnm: 'High' },
    { feature: 'Best For', vnm: 'Housing Societies', gnm: 'Multi-location Businesses' },
    { feature: 'Savings Per Person', vnm: 'Good', gnm: 'Excellent' },
    { feature: 'Administration', vnm: 'Collective Decision', gnm: 'Single Owner' },
    { feature: 'Scalability', vnm: 'Medium', gnm: 'High' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-wide py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">VNM vs GNM</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Understand the differences to choose what works best for you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                  <th className="px-6 py-4 text-left font-bold">Feature</th>
                  <th className="px-6 py-4 text-center font-bold">VNM</th>
                  <th className="px-6 py-4 text-center font-bold">GNM</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{row.vnm}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{row.gnm}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-200 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Decision Guide</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-primary-600 mb-3">Choose VNM If:</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" /> You're a housing society</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" /> Multiple families benefit</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" /> Shared community benefits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary-600 mb-3">Choose GNM If:</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" /> You have multiple meters</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" /> Business with multiple locations</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" /> Large building/complex</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
