import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CERTIFICATES = [
  {
    id: 1,
    title: 'AI Fundamentals',
    issuer: 'Google Cloud',
    date: '2024',
    desc: 'Comprehensive foundation in artificial intelligence, machine learning, and Google Cloud AI tools.',
    color: '#5B8FB9',
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    issuer: 'Udemy',
    date: '2023',
    desc: 'Full-stack web development covering HTML, CSS, JavaScript, React, Node.js, and databases.',
    color: '#4E8B5A',
  },
  {
    id: 3,
    title: 'Linux System Administration',
    issuer: 'Linux Foundation',
    date: '2023',
    desc: 'Advanced Linux administration, shell scripting, system security, and server management.',
    color: '#8AAAE5',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    issuer: 'Coursera',
    date: '2023',
    desc: 'Python programming for data analysis, visualization, and machine learning with NumPy, Pandas, and Scikit-learn.',
    color: '#6BA877',
  },
  {
    id: 5,
    title: 'GitHub Actions & CI/CD',
    issuer: 'GitHub',
    date: '2024',
    desc: 'Modern DevOps practices using GitHub Actions with automated testing and continuous deployment workflows.',
    color: '#A8B5C2',
  },
];

function CertCard({ cert, index, isLeft }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 32px 1fr',
        gap: '0',
        alignItems: 'center',
      }}
    >
      {/* Left slot */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '32px' }}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            style={{
              maxWidth: '400px',
              background: 'rgba(17,24,32,0.85)',
              border: `1px solid ${cert.color}22`,
              borderRadius: '12px',
              padding: '22px 24px',
              width: '100%',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            whileHover={{
              borderColor: `${cert.color}45`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.35)`,
            }}
          >
            <CertContent cert={cert} />
          </motion.div>
        )}
      </div>

      {/* Timeline dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            border: `2px solid ${cert.color}`,
            background: '#0B0F14',
            zIndex: 2,
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '2px',
              borderRadius: '50%',
              background: cert.color,
              opacity: 0.6,
            }}
          />
        </motion.div>
      </div>

      {/* Right slot */}
      <div style={{ paddingLeft: '32px' }}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            style={{
              maxWidth: '400px',
              background: 'rgba(17,24,32,0.85)',
              border: `1px solid ${cert.color}22`,
              borderRadius: '12px',
              padding: '22px 24px',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            whileHover={{
              borderColor: `${cert.color}45`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.35)`,
            }}
          >
            <CertContent cert={cert} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CertContent({ cert }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <h3
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: '#fff',
              marginBottom: '3px',
            }}
          >
            {cert.title}
          </h3>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: cert.color,
              fontWeight: 500,
            }}
          >
            {cert.issuer}
          </p>
        </div>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: '#4A5E70',
            flexShrink: 0,
            marginLeft: '12px',
          }}
        >
          {cert.date}
        </span>
      </div>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 300,
          color: '#7A8FA0',
          lineHeight: 1.65,
        }}
      >
        {cert.desc}
      </p>
    </>
  );
}

/* Mobile version (stacked) */
function CertCardMobile({ cert, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', paddingTop: '4px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: cert.color,
            flexShrink: 0,
            opacity: 0.7,
          }}
        />
        <div style={{ width: '1px', flex: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>
      <div
        style={{
          flex: 1,
          background: 'rgba(17,24,32,0.85)',
          border: `1px solid ${cert.color}22`,
          borderRadius: '10px',
          padding: '18px 20px',
          marginBottom: '12px',
        }}
      >
        <CertContent cert={cert} />
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="certificates"
      ref={sectionRef}
      style={{ position: 'relative', padding: '120px 24px', zIndex: 1 }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(11,15,20,0.2) 0%, rgba(11,16,24,0.6) 50%, rgba(11,15,20,0.2) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
            — Credentials
          </p>
          <h2
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.15 }}
          >
            Certifi<span className="gradient-text-nature">cates</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '1rem',
              color: '#7A8FA0',
              marginTop: '16px',
              maxWidth: '440px',
              margin: '16px auto 0',
            }}
          >
            Continuous learning and verified credentials from leading platforms.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div
          style={{ position: 'relative' }}
          className="cert-desktop"
        >
          {/* Center line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(91,143,185,0.4), rgba(78,139,90,0.3), transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {CERTIFICATES.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="cert-mobile" style={{ display: 'none' }}>
          {CERTIFICATES.map((cert, i) => (
            <CertCardMobile key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: '#4A5E70',
            textAlign: 'center',
            marginTop: '48px',
            letterSpacing: '0.08em',
          }}
        >
          More certifications in progress
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cert-desktop { display: none !important; }
          .cert-mobile  { display: block !important; }
        }
      `}</style>
    </section>
  );
}
