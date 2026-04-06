import React from 'react';
import { motion } from 'framer-motion';
import BaseImage from './BaseImage';

interface AboutProps {
  profile?: any;
  config?: any;
}

const About: React.FC<AboutProps> = ({ profile, config }) => {
  const bio = profile?.profile || {};
  const skills = profile?.skills || [];
  const description = bio.tieu_su || 'Passionate developer dedicated to building high-quality web applications.';
  const avatar = bio.avatar;
  const name = bio.ho_ten || 'Developer';
  const jobTitle = bio.chuc_danh || 'Creative Professional';
  const headlineSuffix = config?.find((c: any) => c.key === 'ABOUT_HEADLINE_SUFFIX')?.value || 'that resonate.';

  return (
    <section id="about" className="full-page-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: 'clamp(4rem, 8vw, 10rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: Content */}
          <div>
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
              About {name.split(' ').pop()}
            </div>
            
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              lineHeight: 1.1, 
              marginBottom: '3rem',
              letterSpacing: '-0.04em'
            }}>
              {jobTitle} <br /> 
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{headlineSuffix}</span>
            </h2>

            <div style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.5)',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              maxWidth: '600px'
            }}>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>

            <div style={{ marginTop: '5rem', display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
              {(skills.length > 0 ? skills.slice(0, 4) : ['Brand Identity', 'Product Strategy', 'UI/UX Design', 'Development']).map((tag: any) => (
                <div key={typeof tag === 'string' ? tag : tag.ten} style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.02)',
                }}>
                  {typeof tag === 'string' ? tag : tag.ten}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Illustration/Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '4/5',
              width: '100%',
              borderRadius: '3rem',
              overflow: 'hidden',
              background: '#0a0a0a',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              {avatar ? (
                <BaseImage 
                  src={avatar} 
                  alt={name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', fontSize: '8rem', fontWeight: 700 }}>
                  {name.charAt(0)}
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default About;
