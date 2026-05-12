import React, { createContext, useContext, useState, useEffect } from 'react'
import { Plant } from '../data/plants'

interface CartItem extends Plant {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  isDrawerOpen: boolean
  setIsDrawerOpen: (isOpen: boolean) => void
  addToCart: (plant: Plant) => void
  removeFromCart: (plantId: number) => void
  updateQuantity: (plantId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (plant: Plant) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === plant.id)
      if (existing) {
        return prev.map(item =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...plant, quantity: 1 }]
    })
    // Automatically open the drawer when an item is added
    setIsDrawerOpen(true)
  }

  const removeFromCart = (plantId: number) => {
    setCart(prev => prev.filter(item => item.id !== plantId))
  }

  const updateQuantity = (plantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId)
      return
    }
    setCart(prev =>
      prev.map(item => (item.id === plantId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const priceStr = item.price.replace(/[^\d]/g, '')
      const price = parseInt(priceStr) || 0
      return sum + price * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
