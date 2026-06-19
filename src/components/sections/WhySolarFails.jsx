import { motion } from 'framer-motion'
import { Home, Users, Zap, Clock, ArrowRight } from 'lucide-react'

const problems = [
  {
    id: 1,
    icon: Home,
    title: 'No Rooftop Space',
    description: 'Apartment residents can\'t install solar panels on their own'
  },
  {
    id: 2,
    icon: Users,
    title: 'Apartment Residents',
    description: 'Traditional solar isn\'t an option for most city dwellers'
  },
  {
    id: 3,
    icon: Zap,
    title: 'High Upfront Cost',
    description: 'Installing solar costs ₹30 lakhs+ per person'
  },
  {
    id: 4,
    icon: Clock,
    title: 'Complex Regulations',
    description: 'Navigating government approvals takes months'
  },
]

export default function WhySolarFails() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="why-vnm-gnm" className="section-py bg-slate-900 text-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Why Traditional Solar Fails
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            For most people, traditional rooftop solar isn\'t practical. Here\'s why:
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {problems.map((problem) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.id}
                variants={itemVariants}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-primary-500 transition-colors"
              >
                <Icon className="w-10 h-10 text-primary-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-slate-400">{problem.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Transition Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">There\'s a Better Way</h3>
          <p className="text-lg mb-6 text-primary-100">
            Virtual Net Metering (VNM) and Group Net Metering (GNM) let you enjoy solar benefits without the hassles.
          </p>
          <a href="#vnm-gnm" className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors">
            See How It Works
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
