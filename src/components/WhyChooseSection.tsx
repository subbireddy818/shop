import React from 'react'

const features = [
  {
    icon: 'favorite',
    title: '50,000+ Happy Devotees',
    description: 'Serving thousands of satisfied customers across India with pure devotion.'
  },
  {
    icon: 'verified',
    title: '200+ Authentic Products',
    description: 'Carefully curated spiritual items, energized and authentic.'
  },
  {
    icon: 'local_shipping',
    title: 'Pan India Delivery',
    description: 'Safe and timely delivery of your sacred items to your doorstep.'
  },
  {
    icon: 'psychology',
    title: 'Expert Spiritual Advisors',
    description: 'Guidance on rituals, products, and your spiritual journey.'
  }
]

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col items-center gap-6 text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight text-text-light dark:text-text-dark max-w-3xl">
              Why Choose <span className="gradient-text">Sacred Relm</span>?
            </h2>
            <p className="text-lg md:text-xl text-subtle-light dark:text-subtle-dark max-w-2xl leading-relaxed font-body">
              Your trusted partner in your spiritual journey, bringing devotion to your home.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group flex flex-col gap-5 rounded-2xl border border-border-light bg-card-light p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 dark:border-border-dark dark:bg-card-dark"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary">{feature.icon}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{feature.title}</h3>
                  <p className="text-sm md:text-base text-subtle-light dark:text-subtle-dark leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
