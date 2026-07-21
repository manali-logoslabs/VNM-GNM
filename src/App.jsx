import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPageV2 from './pages/LandingPageV2'
import VirtualNetMetering from './pages/VirtualNetMetering'
import GroupNetMetering from './pages/GroupNetMetering'
import Comparison from './pages/Comparison'
import Calculator from './pages/Calculator'
import SavingsCalculator from './pages/SavingsCalculator'
import BillSimulator from './pages/BillSimulator'
import StateEligibility from './pages/StateEligibility'
import CaseStudies from './pages/CaseStudies'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPageV2 />} />
            <Route path="/vnm" element={<VirtualNetMetering />} />
            <Route path="/gnm" element={<GroupNetMetering />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/savings-calculator" element={<SavingsCalculator />} />
            <Route path="/bill-simulator" element={<BillSimulator />} />
            <Route path="/states" element={<StateEligibility />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
