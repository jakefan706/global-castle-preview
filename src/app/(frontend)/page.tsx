import AdvantagesSection from './components/homepage/AdvantagesSection'
import ContactSection from './components/homepage/ContactSection'
import FacilitySection from './components/homepage/FacilitySection'
import HeroSection from './components/homepage/HeroSection'
import ProductsSection from './components/homepage/ProductsSection'
import StatsSection from './components/homepage/StatsSection'
import TrustSection from './components/homepage/TrustSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AdvantagesSection />
      <ProductsSection />
      <StatsSection />
      <FacilitySection />
      <TrustSection />
      <ContactSection />
    </>
  )
}
