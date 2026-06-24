import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Zap, Home, Building2, Leaf, Calculator } from 'lucide-react'

export default function LandingPageV2() {
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      {/* STICKY CTA BAR */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 z-40 shadow-lg"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
      >
        <div className="container-wide flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Save 30-50% on Electricity</p>
            <p className="text-primary-100 text-sm">No installation required</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Calculate Savings
            </button>
            <button className="border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Talk to Expert
            </button>
          </div>
        </div>
      </motion.div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-20 pb-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT - Headline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-full font-semibold text-sm">
                  ✨ Your Electricity Bills, Reduced
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                Enjoy Solar <span className="text-primary-600">Without the Cost</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Save 30-50% on your electricity bills. No installation. No upfront investment. Just real savings, every month.
              </p>

              {/* Trust badges */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-slate-700">KERC Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-slate-700">PM Surya Ghar Scheme</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-slate-700">10,000+ Happy Customers</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/calculator" className="btn-primary text-center">
                  <Calculator className="w-5 h-5" />
                  Calculate My Savings
                </Link>
                <button className="btn-ghost text-center">
                  <span>See Real Examples</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* RIGHT - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-96 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-4">₹50,000</div>
                <p className="text-xl text-primary-100">Average Annual Savings</p>
                <p className="text-sm text-primary-200 mt-2">For a typical 5 kW consumption household</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">How Much Can You Save?</h2>
            <p className="text-center text-slate-600 mb-12">Enter your details for an instant calculation</p>

            <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-8 rounded-2xl border-2 border-primary-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Monthly Electricity Bill</label>
                  <input type="number" placeholder="₹5,000" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-primary-600 focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Your State</label>
                    <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-primary-600 focus:outline-none">
                      <option>Karnataka</option>
                      <option>Maharashtra</option>
                      <option>Rajasthan</option>
                      <option>Chhattisgarh</option>
                      <option>Meghalaya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">You Are</label>
                    <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-primary-600 focus:outline-none">
                      <option>Individual</option>
                      <option>Society</option>
                      <option>Business</option>
                    </select>
                  </div>
                </div>

                <button className="w-full btn-primary justify-center">
                  Calculate Savings
                </button>
              </div>

              {/* Results Preview */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-primary-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">₹50K</div>
                  <p className="text-sm text-slate-600">Annual Savings</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600">6 yrs</div>
                  <p className="text-sm text-slate-600">Payback Period</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">25 yr</div>
                  <p className="text-sm text-slate-600">Benefit Duration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHICH SOLUTION FOR YOU? */}
      <section className="py-20 bg-slate-50">
        <div className="container-wide">
          <h2 className="text-4xl font-bold text-center mb-4">Which Solution Is Right For You?</h2>
          <p className="text-center text-slate-600 mb-12">Answer 2 quick questions</p>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* Question 1 */}
            <div className="bg-white p-8 rounded-xl border-2 border-slate-200 hover:border-primary-400 transition-colors cursor-pointer">
              <h3 className="font-bold text-lg mb-4">Do you have available rooftop space?</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-slate-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors">
                  <div className="font-bold">No</div>
                  <div className="text-sm text-slate-600">→ Virtual Net Metering (VNM)</div>
                </button>
                <button className="p-4 border-2 border-slate-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors">
                  <div className="font-bold">Yes</div>
                  <div className="text-sm text-slate-600">→ Rooftop or GNM</div>
                </button>
              </div>
            </div>

            {/* Question 2 */}
            <div className="bg-white p-8 rounded-xl border-2 border-slate-200 hover:border-primary-400 transition-colors cursor-pointer">
              <h3 className="font-bold text-lg mb-4">Are you an individual or a property/business?</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-slate-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors">
                  <div className="font-bold">Individual</div>
                  <div className="text-sm text-slate-600">→ VNM (Shared Solar)</div>
                </button>
                <button className="p-4 border-2 border-slate-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors">
                  <div className="font-bold">Property/Business</div>
                  <div className="text-sm text-slate-600">→ GNM (Multi-meter)</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <h2 className="text-4xl font-bold text-center mb-4">VNM vs GNM vs Traditional Rooftop Solar</h2>
          <p className="text-center text-slate-600 mb-12">Why our solutions are better</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                  <th className="px-6 py-4 text-left font-bold">Feature</th>
                  <th className="px-6 py-4 text-center font-bold text-primary-600">VNM (No Rooftop)</th>
                  <th className="px-6 py-4 text-center font-bold text-primary-600">GNM (Multi-Meter)</th>
                  <th className="px-6 py-4 text-center font-bold text-slate-600">Rooftop Solar</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold">Upfront Cost</td>
                  <td className="px-6 py-4 text-center"><span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-bold">₹0</span></td>
                  <td className="px-6 py-4 text-center"><span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-bold">₹0-₹5L</span></td>
                  <td className="px-6 py-4 text-center"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">₹30L+</span></td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold">Installation</td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-accent-600 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-accent-600 mx-auto" /></td>
                  <td className="px-6 py-4 text-center text-slate-400">✗</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold">Rooftop Required</td>
                  <td className="px-6 py-4 text-center text-slate-400">✗</td>
                  <td className="px-6 py-4 text-center text-slate-400">✗</td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-accent-600 mx-auto" /></td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold">Avg Savings</td>
                  <td className="px-6 py-4 text-center text-primary-600 font-bold">₹40-60K/yr</td>
                  <td className="px-6 py-4 text-center text-primary-600 font-bold">₹50-80K/yr</td>
                  <td className="px-6 py-4 text-center text-slate-600">₹30-50K/yr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* REAL EXAMPLES */}
      <section className="py-20 bg-primary-50">
        <div className="container-wide">
          <h2 className="text-4xl font-bold text-center mb-4">Real Savings, Real People</h2>
          <p className="text-center text-slate-600 mb-12">From customers like you</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rajesh Patel', role: 'Apartment Resident, Bangalore', savings: '₹48,000/yr', quote: 'Never thought I could use solar without installing panels. Best decision ever!' },
              { name: 'Housing Society, Mumbai', role: '200+ Residents, Maharashtra', savings: '₹62,000/yr', quote: 'Entire society now benefits. Collective savings with minimal effort.' },
              { name: 'Warehouse Owner, Chennai', role: 'Commercial Space, Tamil Nadu', savings: '₹1,20,000/yr', quote: 'Reduced operating costs significantly. No compromise on power supply.' }
            ].map((case_study, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border-l-4 border-primary-600 shadow-md hover:shadow-lg transition-shadow">
                <p className="text-slate-700 italic mb-4">"{case_study.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{case_study.name}</p>
                    <p className="text-sm text-slate-600">{case_study.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent-600">{case_study.savings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - SIMPLE STEPS */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <h2 className="text-4xl font-bold text-center mb-4">Get Started in 4 Steps</h2>
          <p className="text-center text-slate-600 mb-12">Simplest solar adoption ever</p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Calculate Savings', desc: 'Enter your bill, get instant estimate' },
              { step: 2, title: 'Site Assessment', desc: 'Our team verifies eligibility (online)' },
              { step: 3, title: 'Approval & Allocation', desc: '30-45 days government approval' },
              { step: 4, title: 'Start Saving', desc: 'Monthly credits on your electricity bill' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & CREDIBILITY */}
      <section className="py-20 bg-slate-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted By Industry & Government</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <Leaf className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="font-bold">KERC Approved</h3>
              <p className="text-sm text-slate-600">Meets all regulatory standards</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <Zap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-bold">PM Surya Ghar</h3>
              <p className="text-sm text-slate-600">Government backed scheme</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <CheckCircle className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="font-bold">10,000+ Happy Customers</h3>
              <p className="text-sm text-slate-600">Proven track record</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <Building2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-bold">25 Year Warranty</h3>
              <p className="text-sm text-slate-600">Long-term security</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-wide text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Save on Electricity?</h2>
          <p className="text-xl text-primary-100 mb-8">Take 2 minutes to calculate your exact savings</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-colors">
              Calculate Savings
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary-600 transition-colors">
              Talk to Expert
            </button>
          </div>
        </div>
      </section>

      {/* Add padding for sticky CTA */}
      <div className="h-24"></div>
    </div>
  )
}
