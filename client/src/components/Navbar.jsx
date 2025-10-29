import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setScrolled(true)
      else setScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled
          ? 'bg-[#f4f4f4] shadow-md backdrop-blur-none h-20'
          : 'bg-transparent backdrop-blur h-28'
        }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-8 transition-all duration-300">
        {/* ✅ Logo (changes depending on scroll) */}
        <a href="/" className="flex items-center transition-all duration-300">
          <img
            src={
              scrolled
                ? 'https://res.cloudinary.com/dczzibbkw/image/upload/v1761751962/KAZE-2_ghevj4.png' // black version
                : 'https://res.cloudinary.com/dczzibbkw/image/upload/v1761751603/KAZE-6_j0dkjc.png' // white version
            }
            alt="KAZE Commercial Corp. logo"
            className={`object-contain transition-all duration-300 ${scrolled ? 'h-12' : 'h-16'
              }`}
          />
        </a>

        {/* ✅ Navigation Links */}
        <nav className="hidden gap-8 sm:flex transition-all duration-300">
          <a
            href="#products"
            className={`text-base font-medium transition-colors duration-300 ${scrolled ? 'text-neutral-800 hover:text-neutral-900' : 'text-[#F4F4F4] hover:text-white'
              }`}
          >
            Products
          </a>
          <a
            href="#features"
            className={`text-base font-medium transition-colors duration-300 ${scrolled ? 'text-neutral-800 hover:text-neutral-900' : 'text-[#F4F4F4] hover:text-white'
              }`}
          >
            Features
          </a>
          <a
            href="#contact"
            className={`text-base font-medium transition-colors duration-300 ${scrolled ? 'text-neutral-800 hover:text-neutral-900' : 'text-[#F4F4F4] hover:text-white'
              }`}
          >
            Contact
          </a>
        </nav>

        {/* ✅ Button */}
        <a
          href="#products"
          className={`rounded-xl px-6 py-3 text-sm font-semibold shadow-soft transition-all duration-300 ${scrolled
              ? 'bg-neutral-800 text-white hover:bg-neutral-900'
              : 'bg-brand-600 text-white hover:bg-brand-700'
            }`}
        >
          Shop Now
        </a>
      </div>
    </header>
  )
}
