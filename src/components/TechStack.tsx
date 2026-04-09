import React from 'react';
import { motion } from 'framer-motion';
import BaseImage from './BaseImage';

interface TechStackProps {
  technologies?: any[];
}

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  if (!technologies || technologies.length === 0) return null;

  return (
    <section id="tech-stack" className="full-page-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '6rem', textAlign: 'center' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.4rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'white',
            marginBottom: '2rem',
            gap: '0.5rem'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />
            Capabilities
          </div>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: 700, 
            letterSpacing: '-0.04em' 
          }}>Core <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Technologies.</span></h2>
        </motion.div>

        <div className="marquee-container" style={{
          overflow: 'hidden',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          padding: '2rem 0'
        }}>
          <div className="marquee-track" style={{
            display: 'flex',
            gap: '1.5rem',
            width: 'max-content'
          }}>
            {[...technologies, ...technologies].map((tech, index) => (
              <div 
                key={`${tech.id}-${index}`} 
                style={{
                  padding: '1.2rem 2.5rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'default',
                  flexShrink: 0
                }}
                className="tech-card"
              >
                <span style={{ 
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  color: 'rgba(255, 255, 255, 0.5)',
                  textAlign: 'center',
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s ease'
                }} className="tech-name">
                  {tech.ten}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .tech-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-2px);
        }
        
        .tech-card:hover .tech-name {
          color: white !important;
        }
      `}</style>
    </section>
  );
};


export default TechStack;
