import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Sun } from 'lucide-react'
import AnimatedCounter from '../AnimatedCounter'

const cities = [
  { name: 'Bangalore', savings: '₹6,800' },
  { name: 'Mumbai', savings: '₹7,200' },
  { name: 'Pune', savings: '₹5,900' },
  { name: 'Hyderabad', savings: '₹6,500' },
]

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white pt-20">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200 to-primary-100 rounded-full blur-3xl opacity-20" />

      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="badge">✨ Reduce Your Electricity Bills</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl font-bold leading-tight">
              Solar Savings <span className="gradient-text">Without the Rooftop</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={itemVariants} className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Unlock solar benefits without installing panels on your own roof. Share a solar plant with your community and save 30-50% on electricity bills.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/calculator" className="btn-primary">
                <Zap className="w-5 h-5" />
                Calculate My Savings
              </Link>
              <a
                href="#contact"
                className="btn-outline"
              >
                <ArrowRight className="w-5 h-5" />
                Talk to an Expert
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div>
                <p className="text-3xl font-bold text-primary-600">
                  <AnimatedCounter to={10000} duration={2} suffix="+" />
                </p>
                <p className="text-xs text-slate-600 mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-600">
                  <AnimatedCounter to={500} duration={2} suffix=" Cr+" />
                </p>
                <p className="text-xs text-slate-600 mt-1">Total Savings</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-600">
                  <AnimatedCounter to={25} duration={2} suffix=" MW" />
                </p>
                <p className="text-xs text-slate-600 mt-1">Solar Installed</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-sm h-96">
              {/* Main Sun */}
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <div className="relative w-24 h-24">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, linear: true }}
                    className="absolute inset-0 border-4 border-transparent border-t-primary-600 border-r-primary-600 rounded-full opacity-30"
                  />
                  <Sun className="w-24 h-24 text-primary-600 absolute inset-0" />
                </div>
              </motion.div>

              {/* Building silhouettes */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 flex justify-around items-flex-end h-40"
              >
                <div className="w-16 h-32 bg-gradient-to-t from-slate-400 to-slate-300 rounded-t opacity-50" />
                <div className="w-20 h-40 bg-gradient-to-t from-slate-400 to-slate-300 rounded-t opacity-60" />
                <div className="w-16 h-28 bg-gradient-to-t from-slate-400 to-slate-300 rounded-t opacity-50" />
              </motion.div>

              {/* Energy flow lines */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 400"
              >
                <motion.path
                  d="M 150 50 Q 100 150, 80 250"
                  stroke="#2563eb"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 5"
                  animate={{ strokeDashoffset: [0, -15] }}
                  transition={{ duration: 2, repeat: Infinity, linear: true }}
                />
                <motion.path
                  d="M 150 50 Q 200 150, 220 250"
                  stroke="#16a34a"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 5"
                  animate={{ strokeDashoffset: [0, -15] }}
                  transition={{ duration: 2, repeat: Infinity, linear: true }}
                />
              </motion.svg>
            </div>
          </motion.div>
        </div>

        {/* Live Savings Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-accent-50 to-blue-50 rounded-xl p-6 border border-accent-200"
        >
          <motion.div
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-center"
          >
            <p className="text-sm text-slate-600 mb-2">💰 Live Savings</p>
            <p className="text-2xl font-bold">
              Someone in <span className="text-primary-600">Bangalore</span> just saved{' '}
              <span className="text-accent-600">₹6,800 this month</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
