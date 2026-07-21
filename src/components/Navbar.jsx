import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, Send } from 'lucide-react'
import ChatModal from './ChatModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'How It Works', path: '/vnm' },
    { label: 'Coverage', path: '/states' },
    { label: 'Success Stories', path: '/case-studies' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white border-b border-slate-200 shadow-sm'
            : isLandingPage
            ? 'bg-transparent'
            : 'bg-white border-b border-slate-200'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center group-hover:shadow-glow transition-shadow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block text-slate-900 group-hover:text-accent-600 transition-colors">
                Green <span className="text-accent-600">House</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* How It Works Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowHowItWorks(true)}
                onMouseLeave={() => setShowHowItWorks(false)}
              >
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                  How It Works ▼
                </button>
                <AnimatePresence>
                  {showHowItWorks && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      <Link
                        to="/vnm"
                        className="block px-4 py-3 text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-colors border-b border-slate-100"
                      >
                        Virtual Net Metering
                      </Link>
                      <Link
                        to="/gnm"
                        className="block px-4 py-3 text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        Group Net Metering
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Links */}
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/bill-simulator" className="btn-primary text-sm">
                <Zap className="w-4 h-4" />
                Calculate
              </Link>
              <button
                onClick={() => setShowChat(true)}
                className="btn-ghost text-sm"
                title="Chat with AI Assistant"
              >
                💬 AI Chat
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
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
              className="lg:hidden bg-white border-t border-slate-200"
            >
              <div className="container-wide py-4 space-y-2">
                {/* Mobile How It Works Dropdown */}
                <div>
                  <button
                    onClick={() => setShowHowItWorks(!showHowItWorks)}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                  >
                    How It Works {showHowItWorks ? '▲' : '▼'}
                  </button>
                  <AnimatePresence>
                    {showHowItWorks && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <Link
                          to="/vnm"
                          className="block px-6 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                          onClick={() => {
                            setIsOpen(false)
                            setShowHowItWorks(false)
                          }}
                        >
                          Virtual Net Metering
                        </Link>
                        <Link
                          to="/gnm"
                          className="block px-6 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                          onClick={() => {
                            setIsOpen(false)
                            setShowHowItWorks(false)
                          }}
                        >
                          Group Net Metering
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Links */}
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <Link to="/bill-simulator" className="btn-primary w-full justify-center text-sm">
                    <Zap className="w-4 h-4" />
                    Calculate Savings
                  </Link>
                  <button
                    onClick={() => {
                      setShowChat(true)
                      setIsOpen(false)
                    }}
                    className="btn-ghost w-full justify-center text-sm"
                    title="Chat with AI Assistant"
                  >
                    💬 AI Chat
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      {/* Chat Modal */}
      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
    </>
  )
}
