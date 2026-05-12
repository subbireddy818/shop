import React, { useState, useEffect } from 'react'

const heroImages = [
  {
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2000&auto=format&fit=crop',
    title: 'Trusted by 50,000+ Devotees',
    subtitle: 'Bringing Devotion to Your Doorstep with Authentic Spiritual Products.'
  },
  {
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2000&auto=format&fit=crop',
    title: 'Authentic Karungali Mala',
    subtitle: 'Energized beads for focus, protection, and spiritual growth.'
  },
  {
    image: 'https://images.unsplash.com/photo-1590059510344-9359e1948483?q=80&w=2000&auto=format&fit=crop',
    title: 'Handcrafted Brass Idols',
    subtitle: 'Timeless craftsmanship to elevate your home pooja space.'
  },
  {
    image: 'https://images.unsplash.com/photo-1505934333218-8fe260f48378?q=80&w=2000&auto=format&fit=crop',
    title: 'Sacred Yantras & Frames',
    subtitle: 'Invite divine geometry and positive energy into your life.'
  },
  {
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?q=80&w=2000&auto=format&fit=crop',
    title: 'Exclusive Pooja Kits',
    subtitle: 'Everything you need for your daily spiritual rituals.'
  }
]

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full relative h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden bg-[#3B0A0A]">
      {heroImages.map((hero, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[4000ms] ease-linear scale-100"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(59, 10, 10, 0.7) 100%), url("${hero.image}")`,
              transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            <div className={`max-w-4xl transition-all duration-1000 transform ${
              index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <span className="text-[#D4AF37] font-heading font-[700] text-xs md:text-sm tracking-[0.4em] uppercase mb-4 block">
                Sacred Realm Heritage
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-[800] text-white leading-tight mb-6 drop-shadow-2xl uppercase tracking-[3px]">
                {hero.title.split(' – ').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && hero.title.includes(' – ') && <br className="hidden md:block" />}
                  </React.Fragment>
                ))}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-body font-[400] max-w-2xl mx-auto mb-10 leading-[1.7] italic">
                {hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:row items-center justify-center gap-4">
                <button className="h-14 px-10 bg-[#6A1039] text-[#D4AF37] font-bold rounded-full border border-[#D4AF37]/30 shadow-2xl hover:bg-[#D4AF37] hover:text-[#6A1039] transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-widest text-sm">
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
