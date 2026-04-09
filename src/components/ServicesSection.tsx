import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseImage from './BaseImage';

interface Service {
  id: number;
  ten: string;
  mo_ta: string;
  anh?: string;
  tags?: string[];
  trang_thai: number | boolean;
  thu_tu: number;
}

interface ServicesSectionProps {
  services: Service[];
  technologies?: any[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services, technologies = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Initialized to null

  if (!services || services.length === 0) return null;

  const activeServices = services
    .filter(s => s.trang_thai)
    .sort((a, b) => (Number(a.thu_tu) || 0) - (Number(b.thu_tu) || 0));
  if (activeServices.length === 0) return null;

  return (
    <section id="services" style={{ 
      background: '#040404', 
      color: '#fff', 
      paddingTop: '10rem',
      paddingBottom: '10rem',
      position: 'relative', 
      overflow: 'hidden'
    }}>
      <div style={{ width: '100%', padding: '0 4rem' }}>
        {/* Header - Nakula Style */}
        <div style={{ marginBottom: '8rem', textAlign: 'center' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 8.5rem)', 
              fontWeight: 800, 
              lineHeight: 1, 
              margin: 0, 
              textTransform: 'uppercase',
              color: 'rgb(202, 202, 202)',
              letterSpacing: '-0.06em', 
              display: 'inline-flex',
              alignItems: 'start',
              gap: '0.75rem',
              textAlign: 'center',
              fontFamily: 'var(--font-main)', 
              whiteSpace: 'nowrap',
              position: 'relative',
              paddingRight: '4rem'
            }}
          >
            HOW WE CAN HELP
            <span style={{ 
              fontSize: '1rem', 
              fontWeight: 500, 
              color: 'rgba(255, 255, 255, 0.4)',
              position: 'absolute',
              top: '5%',
              right: 0,
              letterSpacing: '0.05em',
              lineHeight: 1
            }}>
              (SERVICES)
            </span>
          </motion.h2>
        </div>
      </div>

      <div 
        onMouseLeave={() => setHoveredIndex(null)}
        style={{ width: '100%', position: 'relative' }}
      >
        {activeServices.map((service, index) => (
          <ServiceItem 
            key={service.id || index}
            service={service}
            index={index}
            isActive={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            technologies={technologies}
          />
        ))}
      </div>
    </section>
  );
};

interface ServiceItemProps {
  service: any;
  index: number;
  isActive: boolean;
  onHover: () => void;
  technologies: any[];
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, index, isActive, onHover, technologies }) => {
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        position: 'relative',
        background: isActive ? '#080808' : 'transparent',
        transition: 'background 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isActive ? '180px 1fr 1.2fr' : '100px 1fr 45%',
        gap: isActive ? '3rem' : '0',
        padding: isActive ? '4.5rem 12%' : '3.5rem 12%',
        alignItems: isActive ? 'start' : 'center',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Column 1: Number - Smoothly transitions size and color */}
        <motion.div 
          layout
          style={{ 
            fontSize: isActive ? '6rem' : '1.25rem',
            fontWeight: 800, 
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'baseline',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {(index + 1).toString().padStart(2, '0')}
          <span style={{ 
            color: '#FF4500', 
            fontSize: isActive ? '2rem' : '1.25rem',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>.</span>
        </motion.div>

        {/* Column 2: Architectural Image (Only visible when active) */}
        <div style={{ overflow: 'hidden', height: isActive ? 'auto' : '0', opacity: isActive ? 1 : 0, transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <motion.div 
            style={{ 
              aspectRatio: '1.4 / 1', 
              borderRadius: '1.25rem', 
              overflow: 'hidden', 
              background: '#111',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              width: '100%',
              maxWidth: '460px'
            }}
          >
            <BaseImage 
              src={service.anh} 
              alt={service.ten} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </motion.div>
        </div>

        {/* Column 3: Info Section */}
        <motion.div
          layout
          style={{ paddingTop: isActive ? '0.5rem' : '0' }}
        >
          <h3 style={{ 
            fontSize: isActive ? 'clamp(2rem, 3.5vw, 3.2rem)' : 'clamp(1.4rem, 2.2vw, 1.8rem)',
            fontWeight: isActive ? 800 : 700, 
            lineHeight: 1.1, 
            margin: 0,
            color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
            letterSpacing: isActive ? '-0.04em' : '-0.02em',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {service.ten}
          </h3>
          
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  lineHeight: 1.6, 
                  marginTop: '1.5rem',
                  marginBottom: '2rem',
                  maxWidth: '450px'
                }}>
                  {service.mo_ta}
                </p>

                {/* Pill Tags */}
                {service.tags && service.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {service.tags.map((tagId: any, i: number) => {
                      // Handle both ID (number/string number) and direct name (string)
                      const tech = technologies.find((t: any) => 
                        t.id === Number(tagId) || 
                        String(t.ten || t.name).toLowerCase() === String(tagId).toLowerCase()
                      );
                      const tagName = tech ? (tech.ten || tech.name) : tagId;

                      return (
                        <span key={i} style={{ 
                          fontSize: '0.85rem', 
                          fontWeight: 500, 
                          padding: '0.6rem 1.2rem', 
                          borderRadius: '100px', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}>
                          {tagName}
                        </span>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
