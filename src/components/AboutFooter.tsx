import React from 'react'

export const AboutFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 text-primary">
              <h2 className="text-2xl font-display font-bold tracking-tight">Sacred Relm</h2>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm font-body">
              Bringing Devotion to Your Doorstep with Authentic Spiritual Products. Your trusted partner in your spiritual journey.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Visit Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <p className="text-gray-600 dark:text-gray-400">Hyderabad, India</p>
              </li>
              <li>
                <p className="text-gray-600 dark:text-gray-400">Mon - Sat: 9am - 6pm</p>
              </li>
              <li>
                <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Follow Us</h3>
            <div className="flex items-center space-x-4 mt-4">
              <a
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                href="#"
              >
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418ZM15.192 12 10 9.14v5.72L15.192 12Z"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
              <a
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                href="#"
              >
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 6.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2Z"
                    fillRule="evenodd"
                  />
                  <path d="M16.92 7.572a1.4 1.4 0 1 0-2.8 0 1.4 1.4 0 0 0 2.8 0Z" />
                  <path d="M12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0-1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-sm text-gray-500 dark:text-gray-400 text-center font-body">
          <p>© 2025 Sacred Relm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

