import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILLS = [
  { name: 'HTML',       level: 90, color: '#C26B3A' },
  { name: 'CSS',        level: 85, color: '#5B8FB9' },
  { name: 'JavaScript', level: 88, color: '#C4A93A' },
  { name: 'React',      level: 82, color: '#5B9EC9' },
  { name: 'Python',     level: 83, color: '#4E8B5A' },
  { name: 'AI / ML',    level: 75, color: '#7A6BAA' },
  { name: 'Linux',      level: 80, color: '#A8B5C2' },
  { name: 'GitHub',     level: 87, color: '#8A8FA0' },
];

const EXTRAS = ['Node.js', 'Git', 'REST APIs', 'SQL', 'Tailwind CSS', 'Vite', 'Three.js', 'Docker', 'VS Code'];

const ICONS = {
  HTML: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '120px 24px',
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(11,15,20,0.2) 0%, rgba(11,18,28,0.65) 50%, rgba(11,15,20,0.2) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            — Technical Skills
          </p>
          <h2
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.15 }}
          >
            My <span className="gradient-text-nature">Expertise</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '1rem',
              color: '#7A8FA0',
              marginTop: '16px',
              maxWidth: '500px',
              margin: '16px auto 0',
            }}
          >
            Technologies I work with to build powerful, scalable applications.
          </p>
        </motion.div>

        {/* Skill bars grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={fadeUp}
              custom={i * 0.1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="stone-card"
              style={{ padding: '20px 22px' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: skill.color,
                  }}
                >
                  {ICONS[skill.name] || ICONS.default}
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: '#fff',
                    }}
                  >
                    {skill.name}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: skill.color,
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress track */}
              <div
                style={{
                  height: '3px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,0.05)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    borderRadius: '3px',
                    background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color}55)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra technologies */}
        <motion.div
          variants={fadeUp}
          custom={9}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: '#4A5E70',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Also familiar with
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
            }}
          >
            {EXTRAS.map((t, i) => (
              <motion.span
                key={t}
                variants={fadeUp}
                custom={10 + i * 0.05}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="skill-tag"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
