import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const ROLES = ['AI Developer', 'Web Developer', 'Future Engineer'];

function Typewriter() {
  const textRef = useRef(null);
  const state = useRef({ role: 0, char: 0, del: false });

  useEffect(() => {
    let timeout;
    const tick = () => {
      const { role, char, del } = state.current;
      const current = ROLES[role];
      if (!del) {
        state.current.char++;
        if (textRef.current) textRef.current.textContent = current.slice(0, state.current.char);
        if (state.current.char === current.length) {
          state.current.del = true;
          timeout = setTimeout(tick, 2000);
          return;
        }
        timeout = setTimeout(tick, 70);
      } else {
        state.current.char--;
        if (textRef.current) textRef.current.textContent = current.slice(0, state.current.char);
        if (state.current.char === 0) {
          state.current.del = false;
          state.current.role = (role + 1) % ROLES.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 40);
      }
    };
    timeout = setTimeout(tick, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
      <span ref={textRef} />
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{
          display: 'inline-block',
          width: '2px',
          height: '0.9em',
          background: 'rgba(255,220,160,0.8)',
          borderRadius: '1px',
          verticalAlign: 'middle',
        }}
      />
    </span>
  );
}

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.hero-char');
    gsap.fromTo(chars,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.045, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  const line1 = 'NOOR'.split('');
  const line2 = 'THOWFIQ'.split('');

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0 6vw',
        overflow: 'hidden',
      }}
    >
      {/* Bottom gradient fade into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '30%',
        background: 'linear-gradient(to bottom, transparent, rgba(11,15,20,0.85))',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <div ref={titleRef} style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>

        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,220,160,0.75)',
            marginBottom: '20px',
          }}
        >
          Portfolio
        </motion.p>

        {/* NOOR */}
        <div style={{ display: 'flex', lineHeight: 0.9, overflow: 'hidden', marginBottom: '4px' }}>
          {line1.map((ch, i) => (
            <span
              key={i}
              className="hero-char"
              style={{
                display: 'inline-block',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(4rem, 13vw, 12rem)',
                color: '#ffffff',
                letterSpacing: '-0.03em',
                opacity: 0,
                lineHeight: 0.92,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* THOWFIQ */}
        <div style={{ display: 'flex', lineHeight: 0.9, overflow: 'hidden', marginBottom: '36px' }}>
          {line2.map((ch, i) => (
            <span
              key={i}
              className="hero-char"
              style={{
                display: 'inline-block',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(4rem, 13vw, 12rem)',
                letterSpacing: '-0.03em',
                opacity: 0,
                lineHeight: 0.92,
                backgroundImage: 'linear-gradient(135deg, #d4956a 0%, #f0c080 40%, #c4a0e8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Role + description — Notosan style */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          style={{ maxWidth: '460px' }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: 'rgba(210,195,230,0.85)',
            lineHeight: 1.75,
            marginBottom: '24px',
          }}>
            Away from the manic energy of the digital world, lies a different kind of developer.
            Turning ideas, visions, and technologies into digital experiences — form a unique
            range of spaces, that is unlike any other.{' '}
            <span style={{ color: 'rgba(255,200,140,0.9)', fontWeight: 500 }}>
              <Typewriter />
            </span>
          </p>

          {/* CTA — Notosan style "Learn more" */}
          <a
            href="#about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              color: 'rgba(255,220,160,0.9)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              borderBottom: '1px solid rgba(255,200,140,0.35)',
              paddingBottom: '4px',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255,220,160,0.7)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,220,160,0.9)';
              e.currentTarget.style.borderColor = 'rgba(255,200,140,0.35)';
            }}
          >
            — Learn more
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '6vw',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(200,180,240,0.5)',
          writingMode: 'vertical-rl',
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{
            width: '1px',
            height: '50px',
            background: 'rgba(200,180,240,0.4)',
          }}
        />
      </motion.div>
    </section>
  );
}
