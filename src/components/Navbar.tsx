"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      scrollY.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY.current);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="navbar glass">
        <div className="container nav-container">
          <Link href="/" className="logo" onClick={closeMenu}>
            Авто<span>Ментор</span>
          </Link>

          {/* Burger button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Відкрити меню"
            aria-expanded={isOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div className="nav-cta desktop-only">
            <Link href="/booking" className="btn btn-primary">
              Безкоштовний урок
            </Link>
          </div>
        </div>
      </header>

      {/* Dimmed backdrop (clicking it closes the menu) */}
      <div 
        className={`mobile-backdrop ${isOpen ? 'active' : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Side Drawer (slides in from the right) */}
      <div className={`mobile-drawer ${isOpen ? 'active' : ''}`} aria-hidden={!isOpen}>
        
        {/* Close button inside drawer */}
        <button 
          className="drawer-close-btn" 
          onClick={closeMenu}
          aria-label="Закрити меню"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <nav className="mobile-nav">
          <Link href="/about" onClick={closeMenu}>Про мене</Link>
          <Link href="/pricing" onClick={closeMenu}>Послуги та ціни</Link>
          <Link href="/reviews" onClick={closeMenu}>Відгуки</Link>
          <Link href="/blog" onClick={closeMenu}>Блог</Link>

          <div className="mobile-nav-cta">
            <Link href="/booking" className="btn btn-primary" onClick={closeMenu}>
              Безкоштовний урок
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
