import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UnifiedHeader } from '../components/UnifiedHeader'
import { useCart } from '../context/CartContext'

export const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  })

  const totalPrice = getTotalPrice()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process the order here
    alert('Order placed successfully! You will receive a confirmation call shortly.')
    clearCart()
    navigate('/')
  }

  if (cart.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
        <UnifiedHeader />
        <div className="pt-40 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">No items in cart</h2>
            <button
              onClick={() => navigate('/catalog')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Plants
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <UnifiedHeader />
      <div className="pt-24 sm:pt-32 md:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-light dark:text-text-dark mb-6 sm:mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800/50 border border-border-light dark:border-border-dark">
                  <h2 className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-6">Shipping Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800/50 border border-border-light dark:border-border-dark">
                  <h2 className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 border-primary bg-primary/5 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-text-light dark:text-text-dark">Cash on Delivery</p>
                        <p className="text-xs sm:text-sm text-text-light/70 dark:text-text-dark/70">Pay when you receive</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 border-border-light dark:border-border-dark cursor-pointer hover:border-primary/50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === 'online'}
                        onChange={handleChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-text-light dark:text-text-dark">Online Payment</p>
                        <p className="text-xs sm:text-sm text-text-light/70 dark:text-text-dark/70">Pay securely online</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-4 bg-primary text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/50"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 sm:top-32 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800/50 border border-border-light dark:border-border-dark shadow-lg">
                <h2 className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-6">Order Summary</h2>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs sm:text-sm text-text-light/70 dark:text-text-dark/70">
                      <span className="truncate pr-2">{item.name} x{item.quantity}</span>
                      <span className="flex-shrink-0">₹{(parseInt(item.price.replace('₹', '').replace(',', '')) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border-light dark:border-border-dark pt-3 sm:pt-4 space-y-2 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-text-light/70 dark:text-text-dark/70">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-text-light/70 dark:text-text-dark/70">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-text-light dark:text-text-dark pt-2 border-t border-border-light dark:border-border-dark">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

