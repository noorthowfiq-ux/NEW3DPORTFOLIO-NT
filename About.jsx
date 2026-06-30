import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: '3+', label: 'Years Learning' },
  { value: '20+', label: 'Projects Built' },
  { value: '5+', label: 'Certifications' },
  { value: '100%', label: 'Commitment' },
];

const ABOUT_POINTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: 'AI & Machine Learning',
    text: 'Passionate about building intelligent systems and exploring the frontiers of artificial intelligence.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Web Development',
    text: 'Crafting modern, performant web experiences using React, Node.js, and the latest web technologies.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: 'Always Learning',
    text: 'Constantly evolving — from Linux systems to cloud architecture, curiosity is my driving force.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' },
  }),
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '120px 24px',
        zIndex: 1,
      }}
    >
      {/* Section bg overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(11,15,20,0.3) 0%, rgba(13,23,16,0.6) 50%, rgba(11,15,20,0.3) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#5B8FB9',
              marginBottom: '14px',
            }}
          >
            — About Me
          </p>
          <h2
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.15 }}
          >
            Crafting the{' '}
            <span className="gradient-text-nature">Future</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left — Photo + stats */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Profile photo */}
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(53,94,59,0.4)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Noor Thowfiq"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background = 'rgba(53,94,59,0.2)';
                    e.target.parentNode.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Poppins,sans-serif;font-weight:700;font-size:3rem;color:#6BA877">NT</div>`;
                  }}
                />
              </div>
              {/* Accent corner */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-8px',
                  width: '40px',
                  height: '40px',
                  border: '2px solid rgba(53,94,59,0.5)',
                  borderRadius: '8px',
                  background: '#0B0F14',
                }}
              />
            </div>

            {/* Stats grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={2 + i * 0.3}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="stone-card"
                  style={{ padding: '16px', textAlign: 'center' }}
                >
                  <p
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.6rem',
                      color: '#6BA877',
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      color: '#7A8FA0',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Text + cards */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '1.05rem',
                lineHeight: 1.85,
                color: '#C8D4E0',
                marginBottom: '32px',
              }}
            >
              I'm <strong style={{ color: '#fff', fontWeight: 600 }}>Noor Thowfiq</strong>,
              an AI developer and web developer with a passion for building intelligent,
              beautiful digital experiences. I combine technical depth with creative vision
              to craft solutions that make a real difference.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {ABOUT_POINTS.map((point, i) => (
                <motion.div
                  key={point.title}
                  variants={fadeUp}
                  custom={3 + i * 0.3}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="nature-card"
                  style={{ padding: '18px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                >
                  <div
                    style={{
                      color: '#6BA877',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#fff',
                        marginBottom: '4px',
                      }}
                    >
                      {point.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: '#7A8FA0',
                        lineHeight: 1.65,
                      }}
                    >
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume button */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ marginTop: '28px' }}
            >
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '11px 26px',
                  borderRadius: '8px',
                  background: 'rgba(53,94,59,0.35)',
                  border: '1px solid rgba(107,168,119,0.4)',
                  letterSpacing: '0.03em',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(53,94,59,0.55)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(53,94,59,0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
