import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#3B0A0A] text-[#FDF6EC] border-t border-[#7B1C1C]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 px-6 lg:px-8 py-16 md:grid-cols-4 md:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src="/sacredrelm_logo.aade94b43e178c164667.png" alt="Sacred Realm" className="h-16 w-auto object-contain" />
          </div>
          <p className="text-[14px] text-[#FDF6EC]/80 leading-[1.7] font-body font-[400]">Bringing Devotion to Your Doorstep with Authentic Spiritual Products.</p>
          <div className="flex gap-4">
            <a className="text-[#FDF6EC]/60 hover:text-accent transition-colors duration-300 hover:scale-110 transform" href="#">
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" fillRule="evenodd" />
              </svg>
            </a>
            <a className="text-[#FDF6EC]/60 hover:text-accent transition-colors duration-300 hover:scale-110 transform" href="#">
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM8.451 16.949a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-.08-6.912a3.5 3.5 0 11-6.912 0 3.5 3.5 0 016.912 0z" fillRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-heading font-[800] text-base md:text-lg text-accent uppercase tracking-[3px]">Quick Links</h3>
          <div className="flex flex-col gap-3 font-body font-[400]">
            <a className="text-[14px] text-[#FDF6EC]/70 hover:text-accent transition-colors duration-200 w-fit" href="#">Home</a>
            <a className="text-[14px] text-[#FDF6EC]/70 hover:text-accent transition-colors duration-200 w-fit" href="#">Shop</a>
            <a className="text-[14px] text-[#FDF6EC]/70 hover:text-accent transition-colors duration-200 w-fit" href="#">About Us</a>
            <a className="text-[14px] text-[#FDF6EC]/70 hover:text-accent transition-colors duration-200 w-fit" href="#">Blog</a>
            <a className="text-[14px] text-[#FDF6EC]/70 hover:text-accent transition-colors duration-200 w-fit" href="#">Contact</a>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-heading font-[800] text-base md:text-lg text-accent uppercase tracking-[3px]">Contact Us</h3>
          <div className="flex flex-col gap-3 font-body font-[400]">
            <p className="text-[14px] text-[#FDF6EC]/70">Pan India Delivery</p>
            <a className="text-[14px] text-[#FDF6EC]/70 hover:text-accent transition-colors duration-200 w-fit" href="mailto:info@sacredrelm.com">info@sacredrelm.com</a>
            <a className="text-[14px] text-[#FDF6EC]/70 hover:text-accent transition-colors duration-200 w-fit" href="tel:+919535555555">+91 95355 55555</a>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-heading font-[800] text-base md:text-lg text-accent uppercase tracking-[3px]">Customer Care</h3>
          <div className="flex flex-col gap-3 font-body font-[400]">
            <p className="text-[14px] text-[#FDF6EC]/70">Monday - Saturday: 9 AM - 6 PM</p>
            <p className="text-[14px] text-[#FDF6EC]/70">Sunday: Closed</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#7B1C1C]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 text-center text-sm text-[#FDF6EC]/50 font-body">
          <p>© 2025 Sacred Relm. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
