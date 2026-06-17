import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import VirtualNetMetering from './pages/VirtualNetMetering'
import GroupNetMetering from './pages/GroupNetMetering'
import Comparison from './pages/Comparison'
import Calculator from './pages/Calculator'
import Eligibility from './pages/Eligibility'
import StateEligibility from './pages/StateEligibility'
import CaseStudies from './pages/CaseStudies'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vnm" element={<VirtualNetMetering />} />
            <Route path="/gnm" element={<GroupNetMetering />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/states" element={<StateEligibility />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
