import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'VNM', href: '/vnm' },
    { label: 'GNM', href: '/gnm' },
    { label: 'Compare', href: '/comparison' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Eligibility', href: '/eligibility' },
    { label: 'States', href: '/states' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'FAQ', href: '/faq' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline gradient-text">Shared Solar</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/calculator"
              className="hidden sm:block btn-primary text-sm"
            >
              Calculate Savings
            </Link>

            <Link
              to="/contact"
              className="hidden md:block btn-secondary text-sm"
            >
              Book Consultation
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200"
            >
              <div className="flex flex-col gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-200">
                  <Link
                    to="/calculator"
                    className="btn-primary text-sm justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Calculate Savings
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-secondary text-sm justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
