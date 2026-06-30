import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    setActive(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          background: scrolled
            ? 'rgba(11, 15, 20, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{ textDecoration: 'none' }}
            onClick={() => setActive('')}
          >
            <motion.div
              whileHover={{ opacity: 0.8 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              {/* Monogram */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(53,94,59,0.25)',
                  border: '1px solid rgba(53,94,59,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#6BA877',
                  letterSpacing: '-0.02em',
                }}
              >
                NT
              </div>
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                Noor Thowfiq
              </span>
            </motion.div>
          </a>

          {/* Desktop nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: active === link.href ? '#6BA877' : 'rgba(200,212,224,0.8)',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => { e.target.style.color = '#fff'; }}
                onMouseLeave={(e) => {
                  e.target.style.color = active === link.href ? '#6BA877' : 'rgba(200,212,224,0.8)';
                }}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: '#4E8B5A',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </a>
            ))}

            <a
              href="#contact"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                color: '#fff',
                textDecoration: 'none',
                padding: '8px 20px',
                borderRadius: '7px',
                background: 'rgba(53,94,59,0.35)',
                border: '1px solid rgba(53,94,59,0.5)',
                letterSpacing: '0.02em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(53,94,59,0.55)';
                e.target.style.borderColor = 'rgba(107,168,119,0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(53,94,59,0.35)';
                e.target.style.borderColor = 'rgba(53,94,59,0.5)';
              }}
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: '#C8D4E0',
                  borderRadius: '2px',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 49,
              background: 'rgba(11, 15, 20, 0.96)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '20px 24px 28px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => handleNav(link.href)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'block',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  color: 'rgba(200,212,224,0.85)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive helpers */}
      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
