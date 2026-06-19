import HeroSection from '../components/sections/HeroSection'
import WhySolarFails from '../components/sections/WhySolarFails'
import VNMGNMSection from '../components/sections/VNMGNMSection'
import CalculatorSection from '../components/sections/CalculatorSection'
import StateCoverageSection from '../components/sections/StateCoverageSection'
import JourneySection from '../components/sections/JourneySection'
import WhyChooseSection from '../components/sections/WhyChooseSection'
import SuccessStoriesSection from '../components/sections/SuccessStoriesSection'
import LeadGenSection from '../components/sections/LeadGenSection'
import AIAdvisor from '../components/AIAdvisor'

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <WhySolarFails />
      <VNMGNMSection />
      <CalculatorSection />
      <StateCoverageSection />
      <JourneySection />
      <WhyChooseSection />
      <SuccessStoriesSection />
      <LeadGenSection />
      <AIAdvisor />
    </div>
  )
}
