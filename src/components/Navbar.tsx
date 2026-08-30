"use client";

import { useState } from 'react';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar glass">
      <div className="container nav-container">
        <Link href="/" className="logo" onClick={closeMenu}>
          Авто<span>Ментор</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link href="/about" onClick={closeMenu}>Про мене</Link>
          <Link href="/pricing" onClick={closeMenu}>Послуги та ціни</Link>
          <Link href="/reviews" onClick={closeMenu}>Відгуки</Link>
          <Link href="/blog" onClick={closeMenu}>Блог</Link>
          
          <div className="nav-cta mobile-only">
            <Link href="/booking" className="btn btn-primary" onClick={closeMenu}>
              Безкоштовний урок
            </Link>
          </div>
        </nav>

        <div className="nav-cta desktop-only">
          <Link href="/booking" className="btn btn-primary">
            Безкоштовний урок
          </Link>
        </div>
      </div>
    </header>
  );
}
