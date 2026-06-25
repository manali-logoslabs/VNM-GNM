import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Zap, Home, Building2, Sun, Grid3x3, TrendingDown, Shield, Users, Lightbulb, Award, Clock, Smartphone, Leaf, Flame, MapPin, Headphones } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const BadgeIcon = ({ icon: Icon, label, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${color}`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </motion.div>
)

export default function LandingPageV2() {
  const [selectedPersona, setSelectedPersona] = useState(null)
  const [activeTab, setActiveTab] = useState('vnm')

  const personas = [
    { id: 'apartment', icon: Home, label: 'Apartment Owner', desc: 'No rooftop needed', color: 'from-blue-500 to-blue-600' },
    { id: 'housing', icon: Building2, label: 'Housing Society', desc: 'Multiple meters', color: 'from-purple-500 to-purple-600' },
    { id: 'commercial', icon: Grid3x3, label: 'Commercial', desc: 'Business growth', color: 'from-orange-500 to-orange-600' },
    { id: 'industrial', icon: Flame, label: 'Industrial', desc: 'Large savings', color: 'from-red-500 to-red-600' }
  ]

  const whyUs = [
    { icon: Clock, title: 'Fast Approval', desc: 'Government approval in 30 days', badge: 'Fastest in Market', badgeColor: 'bg-green-100 text-green-700' },
    { icon: Smartphone, title: 'Real-Time Tracking', desc: 'Monitor savings 24/7 on your phone', badge: 'Smart Technology', badgeColor: 'bg-blue-100 text-blue-700' },
    { icon: Headphones, title: '24/7 AI Support', desc: 'Instant answers anytime', badge: 'Always Available', badgeColor: 'bg-purple-100 text-purple-700' },
    { icon: Shield, title: '25-Year Warranty', desc: 'Complete peace of mind', badge: 'Risk-Free', badgeColor: 'bg-red-100 text-red-700' },
  ]

  const vnmSteps = [
    { num: 1, title: 'Assessment', desc: 'We evaluate your eligibility', icon: Lightbulb },
    { num: 2, title: 'Approval', desc: 'Government approval (30 days)', icon: CheckCircle },
    { num: 3, title: 'Installation', desc: 'No hassle, we handle it', icon: Zap },
    { num: 4, title: 'Savings', desc: 'Start saving immediately', icon: TrendingDown },
  ]

  const gnmSteps = [
    { num: 1, title: 'Multi-Meter Setup', desc: 'Map your connections', icon: Grid3x3 },
    { num: 2, title: 'Priority Config', desc: 'Set allocation preferences', icon: Award },
    { num: 3, title: 'Smart Installation', desc: 'Efficient deployment', icon: Smartphone },
    { num: 4, title: 'Max Savings', desc: 'Optimize across all meters', icon: TrendingDown },
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-40 -ml-48 -mb-48"></div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full">
                <Sun className="w-4 h-4" />
                <span className="text-sm font-semibold">The Future of Energy Savings</span>
              </motion.div>

              <h1 className="text-6xl sm:text-7xl font-bold leading-tight">
                Save <span className="text-primary-600">30-50%</span>
                <br />
                on Your <span className="text-primary-600">Electricity Bill</span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Join 10,000+ customers enjoying solar benefits with zero installation, zero upfront cost. Start saving today.
              </p>

              <div className="flex gap-3 flex-wrap">
                <BadgeIcon icon={CheckCircle} label="KERC Approved" color="bg-green-100 text-green-700" />
                <BadgeIcon icon={Award} label="25-Year Warranty" color="bg-blue-100 text-blue-700" />
                <BadgeIcon icon={Zap} label="30-Day Approval" color="bg-yellow-100 text-yellow-700" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-base px-8 py-4 flex items-center gap-2 w-fit hover:shadow-xl transition-shadow"
              >
                <span>🎯 Book Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                <motion.div whileInView={{ scale: 1.05 }} className="text-center">
                  <div className="text-3xl font-bold text-primary-600">10K+</div>
                  <p className="text-sm text-slate-600">Happy Users</p>
                </motion.div>
                <motion.div whileInView={{ scale: 1.05 }} className="text-center">
                  <div className="text-3xl font-bold text-primary-600">₹50K</div>
                  <p className="text-sm text-slate-600">Avg Annual Savings</p>
                </motion.div>
                <motion.div whileInView={{ scale: 1.05 }} className="text-center">
                  <div className="text-3xl font-bold text-primary-600">6 Yrs</div>
                  <p className="text-sm text-slate-600">Break Even</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-12 text-white shadow-2xl"
              >
                <Sun className="w-20 h-20 mx-auto mb-6 opacity-90" />
                <div className="text-center">
                  <p className="text-primary-100 mb-2">Potential Annual Savings</p>
                  <div className="text-6xl font-bold mb-4">₹50K</div>
                  <p className="text-primary-200">For a typical household</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-12 -left-16 bg-white rounded-2xl p-6 shadow-xl border-l-4 border-accent-600"
              >
                <p className="text-sm text-slate-600 mb-2">✓ No Installation</p>
                <p className="text-xl font-bold text-slate-900">Zero Hassle</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 -right-16 bg-white rounded-2xl p-6 shadow-xl border-l-4 border-primary-600"
              >
                <p className="text-sm text-slate-600 mb-2">✓ Instant Benefits</p>
                <p className="text-xl font-bold text-slate-900">Start Today</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== RISK REMOVAL SECTION ===== */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {[
              { icon: Shield, label: '100% Safe & Legal', color: 'bg-green-100 text-green-700' },
              { icon: Award, label: 'Industry Leader', color: 'bg-blue-100 text-blue-700' },
              { icon: Leaf, label: 'Eco-Friendly', color: 'bg-emerald-100 text-emerald-700' },
              { icon: Users, label: '10K+ Satisfied', color: 'bg-purple-100 text-purple-700' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileInView="visible"
                initial="hidden"
                className={`p-4 rounded-lg text-center font-semibold text-sm ${item.color}`}
              >
                <item.icon className="w-6 h-6 mx-auto mb-2" />
                {item.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PERSONA SELECTOR ===== */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-3">Which One Are You?</h2>
            <p className="text-lg text-slate-600">Find your perfect solar solution in seconds</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {personas.map((p) => {
              const Icon = p.icon
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-8 rounded-2xl border-2 transition-all text-center ${
                    selectedPersona === p.id
                      ? `bg-gradient-to-br ${p.color} text-white border-0 shadow-lg`
                      : 'bg-white border-slate-200 text-slate-900 hover:border-primary-400 hover:shadow-lg'
                  }`}
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <div className="font-bold text-lg">{p.label}</div>
                  <div className={`text-sm mt-2 ${selectedPersona === p.id ? 'text-white/80' : 'text-slate-600'}`}>{p.desc}</div>
                </motion.button>
              )
            })}
          </motion.div>

          {selectedPersona && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary text-base px-8 py-3"
              >
                ✨ Get Personalized Plan
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-3">Why Choose Us?</h2>
            <p className="text-lg text-slate-600">What makes us different</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {whyUs.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
                >
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <Icon className="w-12 h-12 text-primary-600 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS - DUAL TAB ===== */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-lg text-slate-600 mb-8">Choose your path: Individual or Business</p>

            {/* Tabs */}
            <div className="flex gap-4 justify-center mb-12">
              <motion.button
                onClick={() => setActiveTab('vnm')}
                whileHover={{ scale: 1.05 }}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                  activeTab === 'vnm'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🏘️ VNM - No Rooftop
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('gnm')}
                whileHover={{ scale: 1.05 }}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                  activeTab === 'gnm'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🏢 GNM - Multiple Meters
              </motion.button>
            </div>
          </motion.div>

          {/* VNM Content */}
          {activeTab === 'vnm' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-center text-lg text-slate-600 mb-12">
                Perfect for apartments, housing societies, and residential communities. Share solar power, share savings.
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-4 gap-6"
              >
                {vnmSteps.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="relative"
                    >
                      <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                          {step.num}
                        </div>
                        <Icon className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                        <p className="text-sm text-slate-600">{step.desc}</p>
                      </div>
                      {idx < vnmSteps.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-primary-600 absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block" />
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}

          {/* GNM Content */}
          {activeTab === 'gnm' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-center text-lg text-slate-600 mb-12">
                For businesses with multiple locations or meters. Optimize energy across all your connections.
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-4 gap-6"
              >
                {gnmSteps.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="relative"
                    >
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                          {step.num}
                        </div>
                        <Icon className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                        <p className="text-sm text-slate-600">{step.desc}</p>
                      </div>
                      {idx < gnmSteps.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-orange-600 absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block" />
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== VNM vs GNM COMPARISON ===== */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-3">Compare Solutions</h2>
            <p className="text-lg text-slate-600">Choose what's best for you</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                title: 'Virtual Net Metering',
                badge: 'Most Popular',
                badgeColor: 'bg-green-100 text-green-700',
                points: [
                  { icon: Zap, label: 'Upfront Cost', value: '₹0', good: true },
                  { icon: Home, label: 'For', value: 'Apartments', good: true },
                  { icon: TrendingDown, label: 'Savings', value: '₹40-60K/yr', good: true },
                  { icon: Clock, label: 'Installation', value: 'None', good: true },
                ],
                cta: '🏘️ Start VNM',
                color: 'from-blue-50 to-cyan-50',
              },
              {
                title: 'Group Net Metering',
                badge: 'Best for Business',
                badgeColor: 'bg-orange-100 text-orange-700',
                points: [
                  { icon: Building2, label: 'Upfront Cost', value: '₹0-5L', good: true },
                  { icon: Grid3x3, label: 'For', value: 'Businesses', good: true },
                  { icon: TrendingDown, label: 'Savings', value: '₹50-80K/yr', good: true },
                  { icon: Award, label: 'Setup', value: 'Flexible', good: true },
                ],
                cta: '🏢 Start GNM',
                color: 'from-orange-50 to-red-50',
              },
              {
                title: 'Rooftop Solar',
                badge: 'Traditional',
                badgeColor: 'bg-slate-100 text-slate-700',
                points: [
                  { icon: Zap, label: 'Upfront Cost', value: '₹30L+', good: false },
                  { icon: Home, label: 'For', value: 'Large Space', good: false },
                  { icon: TrendingDown, label: 'Savings', value: '₹30-50K/yr', good: false },
                  { icon: Flame, label: 'Installation', value: 'Complex', good: false },
                ],
                cta: '🔆 Traditional',
                color: 'from-slate-50 to-slate-100',
              },
            ].map((option, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${option.color} rounded-2xl p-8 border-2 ${
                  idx < 2 ? 'border-primary-300 shadow-xl' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">{option.title}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${option.badgeColor}`}>
                    {option.badge}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {option.points.map((pt, i) => {
                    const Icon = pt.icon
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${pt.good ? 'text-green-600' : 'text-slate-400'}`} />
                          <span className="text-sm font-semibold">{pt.label}</span>
                        </div>
                        <span className={`font-bold ${pt.good ? 'text-green-600' : 'text-slate-400'}`}>{pt.value}</span>
                      </div>
                    )
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    idx < 2
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {option.cta}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== REAL CUSTOMER SAVINGS ===== */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-3">Real Customer Stories</h2>
            <p className="text-lg text-slate-600">Join thousands saving every month</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                persona: '🏘️ Apartment Resident',
                location: 'Bangalore',
                savings: '₹48K/yr',
                quote: 'No installation, instant savings!',
                gradient: 'from-blue-50 to-cyan-50',
                badgeColor: 'bg-blue-100 text-blue-700'
              },
              {
                persona: '🏢 Housing Society',
                location: 'Mumbai',
                savings: '₹1.2L/yr',
                quote: '200+ families benefiting together',
                gradient: 'from-purple-50 to-pink-50',
                badgeColor: 'bg-purple-100 text-purple-700'
              },
              {
                persona: '🏭 Warehouse',
                location: 'Chennai',
                savings: '₹2.5L/yr',
                quote: 'Cut operating costs significantly',
                gradient: 'from-orange-50 to-red-50',
                badgeColor: 'bg-orange-100 text-orange-700'
              },
            ].map((cs, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${cs.gradient} p-8 rounded-2xl border-l-4 border-primary-600 shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-primary-600">{cs.savings}</div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${cs.badgeColor}`}>
                    ✓ Verified
                  </span>
                </div>
                <p className="text-sm text-slate-600 italic mb-4">"{cs.quote}"</p>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">{cs.persona}</p>
                  <p className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {cs.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>

        <div className="container-wide relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-4">Ready to Lock In Your Savings?</h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Thousands of Indians are saving ₹40K-₹2.5L annually. Your turn is next.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
              >
                📞 Book Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
              >
                💬 Chat with AI Expert
              </motion.button>
            </div>

            <p className="text-primary-200 mt-8">✓ Free consultation • ✓ No hidden costs • ✓ 25-year warranty</p>
          </motion.div>
        </div>
      </section>

      <div className="h-16"></div>
    </div>
  )
}
