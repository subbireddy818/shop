import React from 'react'
import { useNavigate } from 'react-router-dom'

const categories = [
  {
    image: '/categories/karungali.png',
    title: 'KARUNGALI MALA',
    category: 'karungali'
  },
  {
    image: '/categories/yantras.png',
    title: 'YANTRAS',
    category: 'yantras'
  },
  {
    image: '/categories/lockets.png',
    title: 'LOCKETS',
    category: 'lockets'
  },
  {
    image: '/categories/frames.png',
    title: 'FRAMES',
    category: 'frames'
  },
  {
    image: '/categories/rings.png',
    title: 'RINGS',
    category: 'rings'
  },
  {
    image: '/categories/crystal.png',
    title: 'CRYSTAL',
    category: 'crystal'
  },
  {
    image: '/categories/brass.png',
    title: 'BRASS ITEMS',
    category: 'brass'
  },
  {
    image: '/categories/books.png',
    title: 'SPIRITUAL BOOKS',
    category: 'books'
  }
]

export const CategoriesSection: React.FC = () => {
  const navigate = useNavigate()

  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${category}`)
  }

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center mb-16">
          <h2 className="font-heading font-[800] text-[22px] md:text-[32px] text-[#1A1A1A] tracking-[3px] uppercase">
            Shop by Categories
          </h2>
          <p className="max-w-5xl text-[#444444] font-body font-[400] text-[14px] leading-[1.7]">
            Discover our thoughtfully curated collections of authentic spiritual products. From sacred Karungali beads and ancient Yantras to handcrafted Brass idols and spiritual literature, each piece is selected to bring peace, protection, and divine energy into your home. Explore our unique collections that blend traditional craftsmanship with timeless spiritual wisdom.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center gap-4 group cursor-pointer"
              onClick={() => handleCategoryClick(cat.category)}
            >
              <div className="w-full aspect-square rounded-[24px] overflow-hidden bg-surface-container-low shadow-sm transition-transform duration-500 group-hover:scale-[1.02] border border-[#D4AF37]/10">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <p className="font-heading font-[700] text-[13px] text-[#1A1A1A] tracking-[2px] uppercase group-hover:text-[#6A1039] transition-colors text-center">
                {cat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
