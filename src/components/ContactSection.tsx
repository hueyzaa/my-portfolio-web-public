import React, { useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { submitContact } from '../api/api';

interface ContactSectionProps {
  config?: any;
}

const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const address = config?.find((c: any) => c.key === 'CONTACT_ADDRESS')?.value || '123 Market Street,\nSuite 400\nLos Angeles, CA 90001';
  const email = config?.find((c: any) => c.key === 'CONTACT_EMAIL')?.value || 'hello@example.com';
  const phone = config?.find((c: any) => c.key === 'CONTACT_PHONE')?.value || '+84 123 456 789';

  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    chuDe: 'Contact Form',
    noiDung: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await submitContact(formData);
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
      setFormData({ hoTen: '', email: '', soDienThoai: '', chuDe: 'Contact Form', noiDung: '' });
    } catch {
      setStatus({ type: 'error', message: 'Oops! Something went wrong.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
    padding: '1.25rem 1.5rem',
    fontSize: '1.1rem',
    color: 'white',
    width: '100%',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  };

  return (
    <section id="contact" className="full-page-section">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(400px, 1fr) minmax(450px, 1.2fr)', 
          gap: 'clamp(4rem, 8vw, 10rem)', 
          alignItems: 'start',
        }}>
          
          {/* Left Column: Typography */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', marginBottom: '1.5rem', fontWeight: 600 }}>
                (CONTACT US)
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
                <h2 style={{ 
                  fontSize: 'clamp(3.5rem, 5.5vw, 6.5rem)', 
                  fontWeight: 800, 
                  lineHeight: 0.85, 
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  margin: '0',
                  color: '#ffffff',
                  whiteSpace: 'nowrap' 
                }}>
                  Let's<br />
                  Work<br />
                  Together
                </h2>
                
                <div style={{ alignSelf: 'flex-start', marginTop: '2.5rem', width: '100%', maxWidth: '380px' }}>
                  <p style={{ 
                    fontSize: '1.15rem', 
                    color: 'rgba(255, 255, 255, 0.5)', 
                    lineHeight: 1.6,
                    textAlign: 'left' 
                  }}>
                    Have a project in mind? We'd love to hear about it. Let's create something great together!
                  </p>
                </div>
              </div>
            </div>

            {/* Visit Us Moved to Left Under Typography */}
            <div style={{ marginTop: '4rem' }}>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 2rem 0' }}>
                Prefer to hop on a call? <a href="#" style={{ color: '#ff3333', textDecoration: 'none', fontWeight: 500 }}>Book a call</a> instead.
              </p>
              
              <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '2rem', color: '#ffffff' }}>Visit Us</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                    (ADDRESS)
                  </div>
                  <div style={{ fontSize: '1rem', color: '#f0f0f0', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {address}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                    (CONTACT INFO)
                  </div>
                  <div style={{ fontSize: '1rem', color: '#f0f0f0', lineHeight: 1.6 }}>
                    <a href={`mailto:${email}`} style={{ color: '#f0f0f0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FF4500'} onMouseLeave={e => e.currentTarget.style.color = '#f0f0f0'}>{email}</a><br />
                    <a href={`tel:${phone}`} style={{ color: '#f0f0f0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FF4500'} onMouseLeave={e => e.currentTarget.style.color = '#f0f0f0'}>{phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '1.5rem',
              padding: 'clamp(2rem, 3vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              width: '100%',
              boxSizing: 'border-box',
              backdropFilter: 'blur(10px)'
            }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', width: '100%' }}>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  required 
                  value={formData.hoTen}
                  onChange={(e) => setFormData({...formData, hoTen: e.target.value})}
                  style={inputStyle}
                  className="nakula-input"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={inputStyle}
                  className="nakula-input"
                />
              </div>

              <input 
                type="tel" 
                placeholder="Phone number" 
                value={formData.soDienThoai}
                onChange={(e) => setFormData({...formData, soDienThoai: e.target.value})}
                style={inputStyle}
                className="nakula-input"
              />

              <textarea 
                placeholder="Message" 
                rows={4} 
                required
                value={formData.noiDung}
                onChange={(e) => setFormData({...formData, noiDung: e.target.value})}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                className="nakula-input"
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', gap: '2rem', width: '100%' }}>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: '250px', lineHeight: 1.6, margin: 0 }}>
                  By submitting you agree to our <strong style={{fontWeight: 600, color: 'white'}}>Terms of Service</strong> and <strong style={{fontWeight: 600, color: 'white'}}>Privacy Policy</strong>
                </p>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    background: 'transparent',
                    border: '1px solid #FF4500',
                    color: '#FF4500',
                    borderRadius: '100px',
                    padding: '1rem 1.8rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minWidth: '200px', 
                    transition: 'all 0.2s ease',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = '#FF4500';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#FF4500';
                    }
                  }}
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <span>SUBSCRIBE</span>}
                  {!isSubmitting && <ArrowUpRight size={20} strokeWidth={2.5} />}
                </button>
              </div>
              
              {status && (
                <div style={{ color: status.type === 'success' ? '#4caf50' : '#ff4444', fontSize: '0.9rem', textAlign: 'right' }}>
                  {status.message}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>

      <style>{`
        .nakula-input:focus {
          outline: none !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .nakula-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
