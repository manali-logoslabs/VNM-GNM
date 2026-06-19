import { motion } from 'framer-motion'
import { Shield, Headphones, CheckCircle, TrendingUp, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Regulatory Expertise',
    description: 'We know every state\'s rules and requirements inside out'
  },
  {
    icon: Headphones,
    title: 'End-to-End Support',
    description: 'We handle everything from assessment to commissioning'
  },
  {
    icon: CheckCircle,
    title: 'Compliance Assistance',
    description: 'All government approvals managed by our expert team'
  },
  {
    icon: TrendingUp,
    title: 'Savings Optimization',
    description: 'Maximize returns with the right solar capacity and allocation'
  },
  {
    icon: Zap,
    title: 'Fast Approvals',
    description: 'Industry-leading processing times for government clearances'
  },
]

export default function WhyChooseSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="section-py bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We make solar savings simple and stress-free
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card-premium p-6 text-center hover:shadow-premium transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors">
                  <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
