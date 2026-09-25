import { BakerySection } from '../components/home/BakerySection'
import { BrandStrip } from '../components/home/BrandStrip'
import { CraftSection } from '../components/home/CraftSection'
import { HeroSlider } from '../components/home/HeroSlider'
import { InstagramSection } from '../components/home/InstagramSection'
import { LocationSection } from '../components/home/LocationSection'
import { NewsletterSection } from '../components/home/NewsletterSection'
import { SignatureDrinks } from '../components/home/SignatureDrinks'
import { Testimonials } from '../components/home/Testimonials'
import { TodaysSpecials } from '../components/home/TodaysSpecials'
import { VisitBand } from '../components/home/VisitBand'
import { cafe } from '../config/cafe'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function HomePage() {
  useDocumentMeta(null, `${cafe.intro} A specialty café concept in Bandra West, Mumbai — website demo.`)
  return (
    <>
      <HeroSlider />
      <BrandStrip />
      <TodaysSpecials />
      <SignatureDrinks />
      <CraftSection />
      <BakerySection />
      <VisitBand />
      <Testimonials />
      <LocationSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  )
}
