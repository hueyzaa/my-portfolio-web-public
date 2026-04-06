import React from 'react';
import { motion } from 'framer-motion';
import BackgroundGradient from './BackgroundGradient';
import ScrollIndicator from './ScrollIndicator';
import LogoCloud from './LogoCloud';

interface HeroProps {
  profile?: any;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const bio = profile?.profile || {};
  const name = bio.ho_ten || 'Creative Developer';
  const jobTitle = bio.chuc_danh || 'Crafting Unique Brand Identities';
  const summary = bio.tieu_su || 'Elevate your brand with custom identity and package design. Showcase your story through bold visuals and strategic design solutions.';

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '8rem 2rem 4rem 2rem',
      textAlign: 'center',
    }}>
      <BackgroundGradient />

      <div className="container" style={{ 
        zIndex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.4rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2.5rem',
            gap: '0.5rem'
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.5)' }} />
          {jobTitle}
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: 'white',
            maxWidth: '1200px',
            marginBottom: '2rem',
          }}
        >
          {name.split(' ')[0]} <span style={{ fontWeight: 400, fontStyle: 'italic', opacity: 0.9 }}>Digital</span> <br /> 
          Experiences
        </motion.h1>

        {/* Subtext */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '3.5rem',
            maxWidth: '650px',
            lineHeight: 1.5,
            fontWeight: 400,
          }}
          dangerouslySetInnerHTML={{ __html: summary.length > 150 ? summary.substring(0, 150) + '...' : summary }}
        />

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', marginBottom: '6rem' }}
        >
          <a href="#contact" className="btn btn-primary" style={{ minWidth: '180px' }}>
            Get Started Now
          </a>
          <a href="#projects" className="btn btn-secondary" style={{ minWidth: '180px' }}>
            See Projects
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1 }}
           style={{ width: '100%', maxWidth: '800px', marginBottom: '5rem' }}
        >
          <ScrollIndicator />
        </motion.div>

        {/* Logo Cloud */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1.2 }}
           style={{ width: '100%' }}
        >
          <LogoCloud />
        </motion.div>
      </div>

      {/* Decorative Gradient Overlay at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '15vh',
        background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />
    </section>
  );
};

export default Hero;

