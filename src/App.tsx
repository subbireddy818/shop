import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import { UnifiedHeader } from './components/UnifiedHeader'
import { HeroSection } from './components/HeroSection'
import { CategoriesSection } from './components/CategoriesSection'
import { FeaturedPlantsSection } from './components/FeaturedPlantsSection'
import { YouTubeSection } from './components/YouTubeSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { Catalog } from './pages/Catalog'
import { CatalogFooter } from './components/CatalogFooter'
import { About } from './pages/About'
import { AboutFooter } from './components/AboutFooter'
import { Contact } from './pages/Contact'
import { ContactFooter } from './components/ContactFooter'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { CartDrawer } from './components/CartDrawer'

const AppContent = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useCart()
  
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background font-body text-on-surface overflow-x-hidden">
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  )
}

function Home() {
  return (
    <>
      <UnifiedHeader />
      <main className="flex-grow w-full">
        <div className="pt-[105px] md:pt-[115px]">
          <HeroSection />
        </div>
        <CategoriesSection />
        <FeaturedPlantsSection />
        <YouTubeSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function CatalogPage() {
  return (
    <>
      <UnifiedHeader showSearch={true} />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Catalog />
      </div>
      <CatalogFooter />
      <WhatsAppButton />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <UnifiedHeader />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <About />
      </div>
      <AboutFooter />
      <WhatsAppButton />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <UnifiedHeader />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Contact />
      </div>
      <ContactFooter />
      <WhatsAppButton />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
