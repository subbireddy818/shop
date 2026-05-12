import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const navigate = useNavigate()

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-[101] transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Force Solid Background */}
        <div className="flex flex-col h-full bg-white relative z-[102]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-display text-xl font-bold text-[#7B1C1C]">Your Sacred Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <span className="material-symbols-outlined text-6xl text-gray-200">shopping_basket</span>
                <p className="text-gray-500 font-body">Your cart is currently empty.</p>
                <button 
                  onClick={() => { onClose(); navigate('/catalog') }}
                  className="text-[#7B1C1C] font-bold hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                  <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <p className="font-bold text-gray-900 text-sm line-clamp-2">{item.name}</p>
                    <p className="text-[#D4AF37] font-bold text-sm">{item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 hover:bg-gray-50"
                        >
                          <span className="material-symbols-outlined text-xs">remove</span>
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-gray-50"
                        >
                          <span className="material-symbols-outlined text-xs">add</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-red-600 font-bold uppercase tracking-widest hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="font-body text-gray-600">Subtotal</span>
                <span className="font-display font-bold text-lg text-gray-900">₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { onClose(); navigate('/checkout') }}
                  className="w-full h-12 bg-[#7B1C1C] text-white rounded-lg font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  Checkout Now
                </button>
                <button 
                  onClick={() => { onClose(); navigate('/cart') }}
                  className="w-full h-12 border border-[#7B1C1C] text-[#7B1C1C] rounded-lg font-bold hover:bg-white transition-all"
                >
                  View Full Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
