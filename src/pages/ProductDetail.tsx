import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { allPlants, Plant } from '../data/plants'
import { useCart } from '../context/CartContext'
import { CategoriesSection } from '../components/CategoriesSection'
import { UnifiedHeader } from '../components/UnifiedHeader'
import { Footer } from '../components/Footer'
import { WhatsAppButton } from '../components/WhatsAppButton'

interface FlyingItem {
  id: number
  x: number
  y: number
  image: string
  dx: number
  dy: number
}

const Accordion: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#D4AF37]/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="font-heading font-bold text-sm tracking-[2px] uppercase text-[#1A1A1A] group-hover:text-[#7B1C1C] transition-colors">
          {title}
        </span>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] pb-6' : 'max-h-0'}`}>
        <div className="font-body font-[400] text-[14px] text-[#444444] leading-[1.7]">
          {children}
        </div>
      </div>
    </div>
  )
}

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart, setIsDrawerOpen } = useCart()
  const [product, setProduct] = useState<Plant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState('')
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([])

  useEffect(() => {
    const foundProduct = allPlants.find(p => p.id === Number(id))
    if (foundProduct) {
      setProduct(foundProduct)
      setActiveImage(foundProduct.image)
      window.scrollTo(0, 0)
    } else {
      navigate('/catalog')
    }
  }, [id, navigate])

  if (!product) return null

  const handleAddToCart = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const target = document.getElementById('cart-icon-target')
    
    if (target) {
      const targetRect = target.getBoundingClientRect()
      
      const newFlyingItem: FlyingItem = {
        id: Date.now(),
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        image: product.image,
        dx: (targetRect.left + targetRect.width / 2) - (rect.left + rect.width / 2),
        dy: (targetRect.top + targetRect.height / 2) - (rect.top + rect.height / 2)
      }
      
      setFlyingItems(prev => [...prev, newFlyingItem])
      
      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== newFlyingItem.id))
        for (let i = 0; i < quantity; i++) {
          addToCart(product)
        }
        setIsDrawerOpen(true)
      }, 1200)
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
    }
  }

  const relatedProducts = allPlants
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <div className="bg-[#FDF6EC] min-h-screen">
      <UnifiedHeader />
      
      <style>{`
        @keyframes flyX {
          0% { transform: translateX(0); }
          100% { transform: translateX(var(--dx)); }
        }
        @keyframes flyY {
          0% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-200px) scale(0.9); }
          100% { transform: translateY(var(--dy)) scale(0.1); }
        }
        @keyframes birdFlap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
        @keyframes birdWobble {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        
        .flying-wrapper {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          animation: flyX 1.2s linear forwards;
          will-change: transform;
        }
        
        .flying-inner {
          animation: flyY 1.2s cubic-bezier(0.3, 0, 0.4, 1) forwards;
          will-change: transform;
        }
        
        .flying-bird {
          animation: birdFlap 0.15s ease-in-out infinite, birdWobble 0.3s ease-in-out infinite;
        }
      `}</style>

      {/* Flying Items Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {flyingItems.map(item => (
          <div
            key={item.id}
            className="flying-wrapper"
            style={{
              left: item.x - 30,
              top: item.y - 30,
              width: '60px',
              height: '60px',
              '--dx': `${item.dx}px`,
              '--dy': `${item.dy}px`
            } as any}
          >
            <div className="flying-inner w-full h-full">
              <div className="flying-bird w-full h-full">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover rounded-full shadow-2xl border-2 border-[#D4AF37] bg-white" 
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-[110px] md:pt-[120px] pb-24">
        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="w-full aspect-square rounded-[32px] overflow-hidden bg-white shadow-xl border border-[#D4AF37]/10">
              <img 
                src={activeImage} 
                className="w-full h-full object-cover" 
                alt={product.name} 
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image].map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-[#7B1C1C]' : 'border-transparent'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-heading font-[800] text-[28px] md:text-[36px] text-[#1A1A1A] leading-tight tracking-[1px] uppercase">
                {product.name}
              </h1>
              <p className="font-heading font-bold text-2xl text-[#1A1A1A]">
                Rs. {product.price.replace('₹', '')}.00
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-heading font-bold text-[13px] uppercase tracking-[2px] text-[#1A1A1A]">
                Size
              </span>
              <button className="w-full py-4 px-6 bg-[#3B0A0A] text-white font-heading font-bold text-sm tracking-[2px] uppercase rounded-full border border-[#7B1C1C] text-center shadow-lg">
                Length x Height: 36" x 36" (Sacred Edition)
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#D4AF37]/30 rounded-full h-14 bg-white overflow-hidden shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center hover:text-[#7B1C1C] hover:bg-[#FDF6EC] transition-colors border-r border-[#D4AF37]/20"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <span className="w-12 text-center font-heading font-bold text-base text-[#1A1A1A]">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center hover:text-[#7B1C1C] hover:bg-[#FDF6EC] transition-colors border-l border-[#D4AF37]/20"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-[#3B0A0A] text-[#FDF6EC] font-heading font-bold text-sm tracking-[2px] uppercase rounded-full hover:bg-[#7B1C1C] transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                Add to cart
              </button>
            </div>

            <button className="w-full h-14 bg-[#7B1C1C] text-white font-heading font-bold text-sm tracking-[2px] uppercase rounded-full hover:opacity-90 transition-all shadow-xl">
              Buy It Now
            </button>

            {/* Info Accordions */}
            <div className="mt-8 flex flex-col">
              <Accordion title="Product Description" defaultOpen>
                <p>
                  Experience the profound spiritual energy of the {product.name}. This authentic heritage piece is meticulously selected for its quality and spiritual significance. Traditionally used to enhance focus and invite divine protection into your daily life.
                </p>
                <ul className="mt-4 list-disc pl-5 space-y-2">
                  <li>Authentic and ethically sourced</li>
                  <li>Energized through traditional rituals</li>
                  <li>Handcrafted by skilled artisans</li>
                  <li>Sustainably packaged with care</li>
                </ul>
              </Accordion>
            </div>
          </div>
        </div>

        {/* FAQ Section (Know More) */}
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="font-heading font-[800] text-[24px] md:text-[32px] text-[#1A1A1A] text-center mb-16 uppercase tracking-[3px]">
            Know More About {product.name}
          </h2>
          <div className="flex flex-col gap-2">
            <Accordion title="What material is this sacred item made of?">
              <p>Crafted from premium materials specific to its tradition—whether it be authentic Karungali wood, pure brass, or sacred crystals.</p>
            </Accordion>
            <Accordion title="What are the dimensions of this product?">
              <p>Typically designed to fit perfectly in traditional altars and personal sacred spaces.</p>
            </Accordion>
            <Accordion title="How long will it take to receive my order?">
              <p>Pan India delivery within 3-5 business days.</p>
            </Accordion>
          </div>
        </section>

        {/* Shop by Category Section - MOVED UP */}
        <div className="mt-20 border-t border-[#D4AF37]/20 pt-16">
          <CategoriesSection />
        </div>

        {/* Products You May Like */}
        <section className="mt-12 pt-12">
          <div className="text-center mb-16">
            <h2 className="font-heading font-[800] text-[22px] md:text-[32px] text-[#1A1A1A] tracking-[3px] uppercase">
              Products You May Like
            </h2>
            <div className="w-24 h-1 bg-[#7B1C1C] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-4 group cursor-pointer"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-[24px] shadow-sm border border-[#D4AF37]/10">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#D4AF37] text-[#7B1C1C] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <p className="font-heading font-[600] text-[14px] text-[#7B1C1C] uppercase tracking-[1px] line-clamp-1 px-2">
                    {p.name}
                  </p>
                  <p className="font-body font-bold text-sm text-[#1A1A1A]">
                    {p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
