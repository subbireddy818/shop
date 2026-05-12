import React from 'react'
import { useNavigate } from 'react-router-dom'
import { allPlants } from '../data/plants'

export const OffersSection: React.FC = () => {
  const navigate = useNavigate()

  // Get some plants for offers
  const offerPlants = allPlants.slice(0, 3).map((plant, index) => {
    const price = parseInt(plant.price.replace('₹', '').replace(',', ''))
    const discount = [34, 24, 22][index] || 20
    const originalPrice = Math.round(price / (1 - discount / 100))
    return {
      ...plant,
      originalPrice,
      discountPrice: price,
      discount
    }
  })

  return (
    <section className="w-full py-8 sm:py-12 md:py-20 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-light dark:text-text-dark mb-2">
              Devotional <span className="text-primary">Deals</span>
            </h2>
            <p className="text-base sm:text-lg text-text-light/70 dark:text-text-dark/70 font-body">
              Special Offers for this Divine Week
            </p>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-semibold text-sm sm:text-base"
          >
            View All Collection
            <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {offerPlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => navigate(`/product/${plant.id}`)}
              className="group cursor-pointer flex flex-col rounded-xl bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-border-light dark:border-border-dark"
            >
              <div className="relative">
                <div
                  className="w-full aspect-square bg-cover bg-center"
                  style={{ backgroundImage: `url("${plant.image}")` }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-subtle-light text-white text-xs font-bold rounded-full shadow-lg">
                    Save {plant.discount}%
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h3 className="font-bold text-text-light dark:text-text-dark line-clamp-2">
                  {plant.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
                    ₹{plant.discountPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-text-light/50 dark:text-text-dark/50 line-through">
                    ₹{plant.originalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/product/${plant.id}`)
                  }}
                  className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}

          {/* View All Card */}
          <div
            onClick={() => navigate('/catalog')}
            className="group cursor-pointer flex items-center justify-center rounded-lg sm:rounded-xl bg-primary text-white p-6 sm:p-8 hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg min-h-[200px] sm:min-h-[250px]"
          >
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl sm:text-5xl mb-3 sm:mb-4 block">shopping_bag</span>
              <p className="text-lg sm:text-xl font-bold">View All</p>
              <p className="text-xs sm:text-sm opacity-90">Collection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

