import HeroSection from '../components/sections/HeroSection'
import WhySolarFails from '../components/sections/WhySolarFails'
import VNMGNMSection from '../components/sections/VNMGNMSection'
import StateCoverageSection from '../components/sections/StateCoverageSection'
import JourneySection from '../components/sections/JourneySection'
import WhyChooseSection from '../components/sections/WhyChooseSection'
import SuccessStoriesSection from '../components/sections/SuccessStoriesSection'
import LeadGenSection from '../components/sections/LeadGenSection'

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <WhySolarFails />
      <VNMGNMSection />
      <StateCoverageSection />
      <JourneySection />
      <WhyChooseSection />
      <SuccessStoriesSection />
      <LeadGenSection />
    </div>
  )
}
