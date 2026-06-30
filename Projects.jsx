import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    title: 'AI Chat Assistant',
    desc: 'Real-time AI chatbot with streaming responses, built with React and OpenAI GPT API. Features conversation history and a sleek dark UI.',
    tags: ['React', 'OpenAI', 'Node.js', 'WebSocket'],
    color: '#5B8FB9',
    status: 'Live',
    year: '2024',
  },
  {
    id: 2,
    title: 'Smart Code Reviewer',
    desc: 'AI-assisted code review tool that analyzes quality, suggests improvements, and detects potential bugs using machine learning.',
    tags: ['Python', 'AI/ML', 'Flask', 'GitHub API'],
    color: '#4E8B5A',
    status: 'In Progress',
    year: '2024',
  },
  {
    id: 3,
    title: 'Linux System Monitor',
    desc: 'Real-time system monitoring dashboard for Linux — tracks CPU, memory, disk usage, and processes with clean data visualization.',
    tags: ['React', 'Node.js', 'Linux', 'WebSocket'],
    color: '#8AAAE5',
    status: 'Live',
    year: '2023',
  },
  {
    id: 4,
    title: '3D Portfolio Website',
    desc: 'This portfolio — built with React, Three.js, and GSAP. Features 3D landscapes, parallax scroll, and a cinematic nature theme.',
    tags: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    color: '#6BA877',
    status: 'Live',
    year: '2024',
  },
  {
    id: 5,
    title: 'Image Classification API',
    desc: 'REST API for image classification using a custom-trained CNN model. Supports batch processing and confidence score output.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
    color: '#A8B5C2',
    status: 'Completed',
    year: '2023',
  },
  {
    id: 6,
    title: 'Open Source CLI Tool',
    desc: 'Developer productivity CLI tool with project scaffolding, file generation, and templates to accelerate common workflows.',
    tags: ['Node.js', 'CLI', 'GitHub', 'Open Source'],
    color: '#5B8FB9',
    status: 'Completed',
    year: '2023',
  },
];

const STATUS_STYLE = {
  Live:          { color: '#6BA877', bg: 'rgba(107,168,119,0.1)', border: 'rgba(107,168,119,0.3)' },
  'In Progress': { color: '#C4A93A', bg: 'rgba(196,169,58,0.1)',  border: 'rgba(196,169,58,0.3)' },
  Completed:     { color: '#5B8FB9', bg: 'rgba(91,143,185,0.1)',  border: 'rgba(91,143,185,0.3)' },
};

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  };

  const st = STATUS_STYLE[project.status] || STATUS_STYLE.Completed;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(17,24,32,0.85)',
        border: `1px solid rgba(255,255,255,0.06)`,
        borderRadius: '12px',
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
        boxSizing: 'border-box',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.color}30`;
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${project.color}15`;
      }}
      onMouseLeave={(e) => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
          borderRadius: '12px 12px 0 0',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: '2.5rem',
            color: project.color,
            opacity: 0.12,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {String(project.id).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            color: st.color,
            background: st.bg,
            border: `1px solid ${st.border}`,
            padding: '4px 10px',
            borderRadius: '20px',
            letterSpacing: '0.04em',
          }}
        >
          {project.status}
        </span>
      </div>

      <h3
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '1rem',
          color: '#fff',
          marginBottom: '10px',
          lineHeight: 1.35,
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          fontWeight: 300,
          color: '#7A8FA0',
          lineHeight: 1.7,
          marginBottom: '20px',
        }}
      >
        {project.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: project.color,
              background: `${project.color}12`,
              border: `1px solid ${project.color}25`,
              padding: '3px 9px',
              borderRadius: '5px',
              letterSpacing: '0.03em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: '#4A5E70',
          }}
        >
          {project.year}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: project.color,
            cursor: 'pointer',
          }}
        >
          View Project
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ position: 'relative', padding: '120px 24px', zIndex: 1 }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(11,15,20,0.2) 0%, rgba(11,20,30,0.55) 50%, rgba(11,15,20,0.2) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            — Selected Work
          </p>
          <h2
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.15 }}
          >
            My <span className="gradient-text-nature">Projects</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '1rem',
              color: '#7A8FA0',
              marginTop: '16px',
              maxWidth: '480px',
              margin: '16px auto 0',
            }}
          >
            A showcase of projects I've built — from AI experiments to full-stack applications.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
