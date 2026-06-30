import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* SVG icons */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const SOCIALS = [
  { name: 'GitHub',   Icon: GithubIcon,   href: 'https://github.com/noorthowfiq',   label: '@noorthowfiq',        color: '#A8B5C2' },
  { name: 'LinkedIn', Icon: LinkedinIcon, href: 'https://linkedin.com/in/noorthowfiq', label: '/in/noorthowfiq',  color: '#5B8FB9' },
  { name: 'Twitter',  Icon: TwitterIcon,  href: 'https://twitter.com/noorthowfiq',  label: '@noorthowfiq',        color: '#8AAAE5' },
  { name: 'Email',    Icon: EmailIcon,    href: 'mailto:noor@example.com',           label: 'noor@example.com',    color: '#6BA877' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ position: 'relative', padding: '120px 24px 80px', zIndex: 1 }}
    >
      {/* Sunset gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(11,15,20,0.2) 0%, rgba(15,20,28,0.7) 60%, rgba(11,15,20,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Heading */}
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
            — Let's Connect
          </p>
          <h2
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.15 }}
          >
            Get in <span className="gradient-text-nature">Touch</span>
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
            Have a project in mind? Let's build something meaningful together.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Left — Socials */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div
              style={{
                background: 'rgba(17,24,32,0.85)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '22px 24px',
                marginBottom: '8px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#fff',
                  marginBottom: '8px',
                }}
              >
                Open to Opportunities
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#7A8FA0',
                  lineHeight: 1.7,
                }}
              >
                I'm always open to discussing new projects, creative ideas, or opportunities
                to be part of an innovative team.
              </p>
            </div>

            {SOCIALS.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                custom={2 + i * 0.15}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: 'rgba(17,24,32,0.8)',
                  border: `1px solid rgba(255,255,255,0.05)`,
                  borderRadius: '10px',
                  padding: '14px 18px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${social.color}30`;
                  e.currentTarget.style.background = 'rgba(20,28,38,0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.background = 'rgba(17,24,32,0.8)';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: `${social.color}14`,
                    border: `1px solid ${social.color}28`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: social.color,
                    flexShrink: 0,
                  }}
                >
                  <social.Icon />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: '#fff',
                      marginBottom: '2px',
                    }}
                  >
                    {social.name}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#4A5E70' }}>
                    {social.label}
                  </p>
                </div>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ width: 14, height: 14, color: '#4A5E70', flexShrink: 0 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" />
                </svg>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              background: 'rgba(17,24,32,0.85)',
              border: '1px solid rgba(53,94,59,0.25)',
              borderRadius: '12px',
              padding: '32px',
            }}
          >
            {sent ? (
              <div
                style={{
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(107,168,119,0.12)',
                    border: '1px solid rgba(107,168,119,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6BA877" strokeWidth="2" style={{ width: 26, height: 26 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px', color: '#fff' }}>
                  Message Sent
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#7A8FA0' }}>
                  I'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { key: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
                  { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#4A5E70',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(53,94,59,0.6)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(53,94,59,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.07)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#4A5E70',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(53,94,59,0.6)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(53,94,59,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { y: -2, transition: { duration: 0.2 } } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#fff',
                    padding: '13px 28px',
                    borderRadius: '8px',
                    background: loading ? 'rgba(53,94,59,0.3)' : 'rgba(53,94,59,0.5)',
                    border: '1px solid rgba(107,168,119,0.4)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.04em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.25s ease',
                    width: '100%',
                  }}
                >
                  {loading ? (
                    <>
                      <svg
                        style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                        <path d="M12 2a10 10 0 0110 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          custom={6}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            marginTop: '80px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(91,143,185,0.4))' }} />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '18px', color: '#6BA877' }}>NT</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(107,168,119,0.4))' }} />
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#4A5E70' }}>
            &copy; {new Date().getFullYear()} Noor Thowfiq &mdash; All rights reserved
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#303D4A' }}>
            React &middot; Three.js &middot; Framer Motion &middot; GSAP
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
