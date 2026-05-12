import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { allPlants, Plant } from '../data/plants'
import { useCart } from '../context/CartContext'

interface FlyingItem {
  id: number
  x: number
  y: number
  image: string
  dx: number
  dy: number
}

export const FeaturedPlantsSection: React.FC = () => {
  const navigate = useNavigate()
  const { addToCart, setIsDrawerOpen } = useCart()
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([])
  
  const featuredPlants = allPlants

  const handleAddToCart = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation()
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const target = document.getElementById('cart-icon-target')
    
    if (target) {
      const targetRect = target.getBoundingClientRect()
      
      const newFlyingItem: FlyingItem = {
        id: Date.now(),
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        image: plant.image,
        dx: (targetRect.left + targetRect.width / 2) - (rect.left + rect.width / 2),
        dy: (targetRect.top + targetRect.height / 2) - (rect.top + rect.height / 2)
      }
      
      setFlyingItems(prev => [...prev, newFlyingItem])
      
      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== newFlyingItem.id))
        addToCart(plant)
        setIsDrawerOpen(true)
      }, 1200)
    } else {
      addToCart(plant)
    }
  }

  return (
    <section className="w-full pb-16 md:pb-24 lg:pb-32 pt-0 bg-background relative overflow-visible">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center animate-fade-in-up">
            <h2 className="font-heading font-[800] text-[22px] md:text-[32px] text-[#1A1A1A] tracking-[3px] uppercase">
              Best Sellers
            </h2>
            <p className="font-body font-[400] text-[14px] text-[#444444] leading-[1.7] max-w-3xl">
              Explore timeless spiritual idols and energy tools inspired by the teachings.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {featuredPlants.map((plant) => (
              <div
                key={plant.id}
                className="flex flex-col gap-4 group cursor-pointer"
                onClick={() => navigate(`/product/${plant.id}`)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low rounded-[24px] border border-[#D4AF37]/10 shadow-sm">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => handleAddToCart(plant, e)}
                    className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#D4AF37] text-[#6A1039] shadow-sm transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95 z-10"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  </button>
                  
                  {(plant.badge || plant.stock) && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-accent text-white text-[10px] font-bold rounded-sm shadow-sm">
                      {plant.badge || plant.stock}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-center text-center gap-1">
                  <p className="font-heading font-[600] text-[15px] text-[#6A1039] group-hover:opacity-80 transition-opacity line-clamp-1 px-2">
                    {plant.name}
                  </p>
                  <p className="font-body font-bold text-sm text-[#444444]">
                    {plant.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate('/catalog')}
              className="group flex h-14 items-center justify-center gap-3 rounded-none border-b-2 border-[#6A1039] px-4 text-base font-bold text-[#6A1039] transition-all duration-300 hover:opacity-70 font-heading tracking-[2px] uppercase"
            >
              <span>Explore Collection</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
