import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
    { label: 'How It Works', href: '#vnm-gnm', path: '/vnm' },
    { label: 'Coverage', href: '#coverage', path: '/states' },
    { label: 'Success Stories', href: '#stories', path: '/case-studies' },
    { label: 'FAQ', href: '#faq', path: '/faq' },
  ]

  const handleNavClick = (e, href) => {
    if (isLandingPage && href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

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
              <div className="w-10 h-10 bg-gradient-to-br from-accent-600 to-accent-700 rounded-lg flex items-center justify-center group-hover:shadow-glow transition-shadow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block text-slate-900 group-hover:text-accent-600 transition-colors">
                green house
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                isLandingPage && link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/calculator" className="btn-primary text-sm">
                <Zap className="w-4 h-4" />
                Calculate
              </Link>
              <button
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
                {navLinks.map((link) => (
                  isLandingPage && link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.path}
                      className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <Link to="/calculator" className="btn-primary w-full justify-center text-sm">
                    <Zap className="w-4 h-4" />
                    Calculate Savings
                  </Link>
                  <button
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
    </>
  )
}
