import React from 'react'

export const TrustBadgeBar: React.FC = () => {
  const badges = [
    { icon: 'verified', text: 'Authentic Products' },
    { icon: 'local_shipping', text: 'Pan India Delivery' },
    { icon: 'lock', text: 'Secure Payments' },
    { icon: 'support_agent', text: '24/7 Support' }
  ]

  return (
    <div className="w-full bg-[#3B0A0A] py-3 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 flex items-center justify-around gap-8 animate-scroll-mobile md:animate-none">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2 flex-shrink-0">
            <span className="material-symbols-outlined text-[#D4AF37] text-lg">
              {badge.icon}
            </span>
            <span className="font-heading font-[600] text-[10px] md:text-[12px] uppercase tracking-[1.5px] text-[#FDF6EC] whitespace-nowrap">
              {badge.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
