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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1.5rem',
        }}>
          {technologies.map((tech, index) => (
            <motion.div 
              key={tech.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              style={{
                padding: '2rem 1.5rem',
                borderRadius: '1.5rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
              }}
              className="tech-card"
            >
              <div style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <BaseImage 
                  src={tech.logo} 
                  alt={tech.ten} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'grayscale(1) contrast(1.2) brightness(1.2)' }} 
                  className="tech-icon"
                />
              </div>
              <span style={{ 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                color: 'rgba(255, 255, 255, 0.4)',
                textAlign: 'center',
                letterSpacing: '-0.01em',
                transition: 'color 0.3s ease'
              }} className="tech-name">
                {tech.ten}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
        }
        .tech-card:hover .tech-icon {
          filter: grayscale(0) brightness(1) !important;
          transform: scale(1.1);
        }
        .tech-card:hover .tech-name {
          color: white !important;
        }
      `}</style>
    </section>
  );
};


export default TechStack;
