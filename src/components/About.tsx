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
            <div style={{ textAlign: 'left' }}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.5rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '2.5rem',
                  gap: '0.6rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF4500' }} />
                About {name.split(' ').pop()}
              </motion.div>
              
              <h2 style={{ 
                fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                fontWeight: 700, 
                lineHeight: 1, 
                marginBottom: '3rem',
                letterSpacing: '-0.05em',
                textTransform: 'uppercase'
              }}>
                {jobTitle.split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-editorial" style={{ color: '#FF4500' }}>{jobTitle.split(' ').slice(2).join(' ')}</span> <br />
                <span style={{ opacity: 0.3 }} className="text-outline">{headlineSuffix}</span>
              </h2>

              <div style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: 1.7,
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                maxWidth: '600px',
                fontWeight: 400
              }}>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>

              <div style={{ marginTop: '5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {(skills.length > 0 ? skills.slice(0, 6) : ['Brand Identity', 'Product Strategy', 'UI/UX Design', 'Development']).map((tag: any) => (
                  <div key={typeof tag === 'string' ? tag : (tag.ten || tag.name)} style={{
                    padding: '0.7rem 1.4rem',
                    borderRadius: '100px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.8)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {typeof tag === 'string' ? tag : (tag.ten || tag.name)}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Illustration/Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                aspectRatio: '1/1',
                width: '100%',
                borderRadius: '3rem',
                overflow: 'hidden',
                background: '#0a0a0a',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)',
              }}>
                {avatar ? (
                  <BaseImage 
                    src={avatar} 
                    alt={name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', fontSize: '12rem', fontWeight: 900 }}>
                    {name.charAt(0)}
                  </div>
                )}
              </div>
              
              {/* Decorative Accent */}
              <div style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '-2rem',
                width: '12rem',
                height: '12rem',
                background: 'radial-gradient(circle, rgba(255, 69, 0, 0.15) 0%, transparent 70%)',
                zIndex: -1
              }} />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


export default About;
