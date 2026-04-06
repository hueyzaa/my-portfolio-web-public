import React from 'react';
import { Github, Linkedin, Twitter, LayoutGrid } from 'lucide-react';
import BaseImage from './BaseImage';

interface FooterProps {
  config?: any;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const headerTitle = config?.find((c: any) => c.key === 'HEADER_TITLE')?.value || 'Portfolio';
  const logoUrl = config?.find((c: any) => c.key === 'FOOTER_LOGO')?.value;
  const description = config?.find((c: any) => c.key === 'FOOTER_DESCRIPTION')?.value || 'Crafting digital experiences with passion and precision.';
  const copyright = config?.find((c: any) => c.key === 'FOOTER_COPYRIGHT')?.value || `© ${new Date().getFullYear()} ${headerTitle}. All rights reserved.`;

  return (
    <footer style={{
      padding: '8rem 0 4rem',
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '6rem',
          marginBottom: '6rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              {logoUrl ? (
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden' }}>
                  <BaseImage 
                    src={logoUrl} 
                    alt={headerTitle} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </div>
              ) : (
                <div style={{ color: 'white' }}>
                  <LayoutGrid size={24} strokeWidth={2.5} />
                </div>
              )}
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: 710, 
                color: 'white',
                letterSpacing: '-0.02em'
              }}>
                {headerTitle}
              </span>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              lineHeight: 1.6,
              maxWidth: '320px',
              fontSize: '1rem',
              fontWeight: 450,
            }}>
              {description}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white', marginBottom: '2rem', letterSpacing: '0.1em' }}>NAVIGATION</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a href="#" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#projects" className="footer-link">Project</a>
              <a href="#services" className="footer-link">Service</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white', marginBottom: '2rem', letterSpacing: '0.1em' }}>SOCIAL</h4>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="#" className="footer-social-link"><Twitter size={20} /></a>
              <a href="#" className="footer-social-link"><Github size={20} /></a>
              <a href="#" className="footer-social-link"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '4rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}>
          <div>{copyright}</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-weight: 500;
        }
        .footer-link:hover {
          color: white;
          transform: translateX(5px);
        }
        .footer-social-link {
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
        }
        .footer-social-link:hover {
          color: white;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
