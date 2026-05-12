import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UnifiedHeader } from '../components/UnifiedHeader'
import { useCart } from '../context/CartContext'
import { WhatsAppButton } from '../components/WhatsAppButton'

export const Cart: React.FC = () => {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()

  const totalPrice = getTotalPrice()

  if (cart.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
        <UnifiedHeader />
        <div className="pt-40 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-text-light/30 dark:text-text-dark/30 mb-4">
              shopping_cart
            </span>
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Your Cart is Empty</h2>
            <p className="text-text-light/70 dark:text-text-dark/70 mb-6">
              Looks like you haven't added any plants to your cart yet.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              Browse Plants
            </Link>
          </div>
        </div>
        <WhatsAppButton />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <UnifiedHeader />
      <div className="pt-24 sm:pt-32 md:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-light dark:text-text-dark">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-xs sm:text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const price = parseInt(item.price.replace('₹', '').replace(',', ''))
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800/50 border border-border-light dark:border-border-dark shadow-sm"
                  >
                    <div
                      className="w-full sm:w-32 h-32 sm:h-32 rounded-lg bg-cover bg-center cursor-pointer flex-shrink-0"
                      style={{ backgroundImage: `url("${item.image}")` }}
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          className="text-base sm:text-lg font-bold text-text-light dark:text-text-dark mb-2 cursor-pointer hover:text-primary transition-colors"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-light/70 dark:text-text-dark/70 mb-2">
                          {item.category} • {item.feature}
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-primary">₹{price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                        <div className="flex items-center gap-2 border border-border-light dark:border-border-dark rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 sm:px-3 py-1.5 text-text-light dark:text-text-dark hover:bg-primary/10 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm sm:text-base">remove</span>
                          </button>
                          <span className="px-3 sm:px-4 py-1.5 font-semibold text-sm sm:text-base text-text-light dark:text-text-dark min-w-[30px] sm:min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 sm:px-3 py-1.5 text-text-light dark:text-text-dark hover:bg-primary/10 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm sm:text-base">add</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark sm:hidden">
                            ₹{(price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-base sm:text-lg">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-xl font-bold text-text-light dark:text-text-dark">
                        ₹{(price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 sm:top-32 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800/50 border border-border-light dark:border-border-dark shadow-lg">
                <h2 className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-6">Order Summary</h2>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-text-light/70 dark:text-text-dark/70">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-text-light/70 dark:text-text-dark/70">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="border-t border-border-light dark:border-border-dark pt-3 sm:pt-4">
                    <div className="flex justify-between text-lg sm:text-xl font-bold text-text-light dark:text-text-dark">
                      <span>Total</span>
                      <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 sm:py-4 bg-primary text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/50 mb-3 sm:mb-4"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/catalog"
                  className="block w-full text-center py-2 sm:py-3 text-primary hover:text-primary/80 transition-colors font-semibold text-sm sm:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  )
}

