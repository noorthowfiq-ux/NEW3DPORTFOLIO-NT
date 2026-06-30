import React, { useRef, useCallback } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

export default function App() {
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  return (
    <div className="bg-nature" onMouseMove={handleMouseMove}>
      {/* Fixed 3D Nature Background */}
      <Background mousePos={mousePos} />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}
