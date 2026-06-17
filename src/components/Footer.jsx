import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="container-wide py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Shared Solar</h3>
            <p className="text-slate-400 text-sm mb-6">
              Helping communities and businesses save money through shared solar energy solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/vnm" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Virtual Net Metering
                </Link>
              </li>
              <li>
                <Link to="/gnm" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Group Net Metering
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Savings Calculator
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Eligibility Check
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/states" className="text-slate-400 hover:text-primary-400 transition-colors">
                  State Eligibility
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/comparison" className="text-slate-400 hover:text-primary-400 transition-colors">
                  VNM vs GNM
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@sharedsolar.co" className="text-slate-400 hover:text-primary-400 transition-colors">
                  hello@sharedsolar.co
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">India (Multiple offices)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-400">
            <div>
              © {currentYear} Shared Solar. All rights reserved.
            </div>
            <div className="flex gap-6 justify-start sm:justify-end">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
