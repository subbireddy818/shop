import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { allPlants, Plant } from '../data/plants'
import { useCart } from '../context/CartContext'

interface UnifiedHeaderProps {
  showSearch?: boolean
  onSearchChange?: (query: string) => void
}

export const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({ 
  onSearchChange 
}) => {
  const location = useLocation()
  const { getTotalItems, setIsDrawerOpen } = useCart()
  
  
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchResults, setSearchResults] = useState<Plant[]>([])
  const searchRef = useRef<HTMLDivElement>(null)



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearchChange) onSearchChange(query)

    if (query.trim()) {
      const filtered = allPlants.filter(plant => 
        plant.name.toLowerCase().includes(query.toLowerCase()) ||
        plant.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP ALL', path: '/catalog' },
    { name: 'NEW ARRIVALS', path: '/catalog?filter=new' },
    { name: 'COLLECTIONS', path: '/catalog?filter=collections' },
    { name: 'ABOUT', path: '/about' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white shadow-sm border-b border-gray-100">
      {/* 1. Top Bar */}
      <div className="w-full bg-[#FDF6EC] border-b border-[#D4AF37]/10 py-1 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center text-[10px] font-heading font-bold tracking-[1.2px] uppercase text-[#6A1039]/80">
          <div>Free shipping on orders over ₹1,999</div>
          <div className="flex gap-6">
            <Link to="/track" className="hover:text-[#6A1039] transition-colors">Track Order</Link>
            <Link to="/support" className="hover:text-[#6A1039] transition-colors">Support</Link>
          </div>
        </div>
      </div>

      {/* 2. Unified Main Row: Logo, Nav, Search, Icons */}
      <div className="max-w-[1400px] mx-auto px-6 py-1.5 flex items-center justify-between gap-6">
        {/* Logo - Large & Impactful */}
        <Link to="/" className="flex-shrink-0 group">
          <img 
            src="/sacredrelm_logo.aade94b43e178c164667.png" 
            alt="Sacred Realm" 
            className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Navigation Links - Integrated into the main row */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-heading font-bold text-[14px] tracking-[2px] transition-all relative py-1 hover:text-[#6A1039] group whitespace-nowrap ${
                location.pathname === link.path ? 'text-[#6A1039]' : 'text-[#1A1A1A]'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#6A1039] transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                location.pathname === link.path ? 'scale-x-100' : ''
              }`} />
            </Link>
          ))}
        </nav>

        {/* Search Bar - Space Efficient */}
        <div className="flex-1 max-w-sm relative hidden md:block" ref={searchRef}>
          <div className={`relative flex items-center bg-gray-50 rounded-full border transition-all duration-300 ${isSearchFocused ? 'border-[#6A1039] ring-2 ring-[#6A1039]/10 bg-white' : 'border-gray-200'}`}>
            <span className="material-symbols-outlined absolute left-4 text-gray-400 text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-transparent pl-11 pr-4 py-2 text-[12px] font-body text-[#1A1A1A] placeholder-gray-400 focus:outline-none rounded-full"
            />
          </div>

          {/* Search Results Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              {searchResults.map((plant) => (
                <Link
                  key={plant.id}
                  to={`/product/${plant.id}`}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                  onClick={() => {
                    setSearchQuery('')
                    setIsSearchFocused(false)
                  }}
                >
                  <img src={plant.image} alt={plant.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-[12px] font-heading font-bold text-[#1A1A1A]">{plant.name}</p>
                    <p className="text-[10px] text-[#6A1039]">{plant.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button className="text-[#1A1A1A] hover:text-[#6A1039] transition-colors">
            <span className="material-symbols-outlined text-[24px]">person</span>
          </button>
          <button 
            id="cart-icon-target"
            onClick={() => setIsDrawerOpen(true)}
            className="relative text-[#1A1A1A] hover:text-[#6A1039] transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6A1039] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
          {/* Mobile Menu Icon */}
          <button className="md:hidden text-[#1A1A1A]">
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative flex items-center bg-gray-50 rounded-full border border-gray-200">
          <span className="material-symbols-outlined absolute left-3 text-gray-400 text-sm">search</span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent pl-10 pr-4 py-1.5 text-xs font-body focus:outline-none"
          />
        </div>
      </div>
    </header>
  )
}
