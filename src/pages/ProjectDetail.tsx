import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectById, getTechnologies, getProjects } from '../api/api';
import BaseImage from '../components/BaseImage';
import { ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [projectData, techData, projectsData] = await Promise.all([
          getProjectById(id),
          getTechnologies(),
          getProjects()
        ]);
        // Safe parse for current project
        if (projectData) {
          if (typeof projectData.tools === 'string') projectData.tools = JSON.parse(projectData.tools);
          if (typeof projectData.gallery === 'string') projectData.gallery = JSON.parse(projectData.gallery);
        }

        // Safe parse for all projects (used for 'Next Project' navigation)
        const parsedProjects = projectsData.map((p: any) => ({
          ...p,
          tools: typeof p.tools === 'string' ? JSON.parse(p.tools) : p.tools,
          gallery: typeof p.gallery === 'string' ? JSON.parse(p.gallery) : p.gallery,
        }));

        setProject(projectData);
        setTechnologies(techData);
        setAllProjects(parsedProjects);
      } catch (error) {
        console.error('Error fetching project detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div className="loader" />
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', background: '#000', color: '#fff' }}>
        <h2 style={{ fontSize: '3rem' }}>Project not found</h2>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}
    >
      {/* Floating Back Button */}
      <Link 
        to="/works" 
        style={{ 
          position: 'absolute', 
          top: '7rem', 
          left: '2rem', 
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          color: '#fff',
          textDecoration: 'none',
          padding: '0.7rem 1.4rem',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.15)',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
        <span>BACK</span>
      </Link>

      {/* Hero Section */}
      <section style={{ 
        height: '100vh', 
        width: '100%', 
        position: 'relative', 
        overflow: 'hidden',
        marginBottom: '6rem'
      }}>
        {/* Background Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1
        }} />
        
        <BaseImage 
          src={project.thumbnail} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />

        <div className="container" style={{
          position: 'absolute',
          bottom: '10%',
          left: 0,
          right: 0,
          zIndex: 2,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             <h1 style={{ 
               fontSize: 'clamp(3.5rem, 10vw, 8.5rem)', 
               fontWeight: 900, 
               lineHeight: 0.9, 
               margin: 0,
               textTransform: 'uppercase',
               letterSpacing: '-0.05em'
             }}>
               {project.title}
             </h1>

             {/* MO TA NGAN ADDITION */}
             <p style={{
               fontSize: '1.2rem',
               color: 'rgba(255,255,255,0.7)',
               marginTop: '2rem',
               maxWidth: '600px',
               lineHeight: 1.5,
               fontWeight: 400
             }}>
               {project.mo_ta_ngan}
             </p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <div className="container" style={{ marginBottom: '10rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(300px, 35%) 1fr', 
          gap: '4rem',
          paddingTop: '4rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }} className="info-grid">
          {/* Left: Metadata */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Role</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{project.vai_tro || 'Creative Direction'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Slogan</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{project.tieu_de_phu || 'Conceptual Excellence'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Service</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{project.dich_vu || 'Full Stack Dev'}</span>
            </div>
          </aside>

          {/* Right: Tech & Description */}
          <div>
            <div style={{ marginBottom: '4rem' }}>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Technologies</span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {project.tools && project.tools.map((toolId: string, i: number) => {
                  const tech = technologies.find(t => t.id === Number(toolId));
                  const toolName = tech ? (tech.ten || tech.name) : toolId;
                  return (
                    <span key={i} style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      padding: '0.6rem 1.2rem', 
                      borderRadius: '100px', 
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.7)'
                    }}>
                      {toolName}
                    </span>
                  );
                })}
              </div>
            </div>

            <div style={{ 
              fontSize: '1.25rem', 
              lineHeight: 1.6, 
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '800px'
            }}>
              {project.mo_ta_chi_tiet ? (
                <div dangerouslySetInnerHTML={{ __html: project.mo_ta_chi_tiet.replace(/\n/g, '<br/>') }} />
              ) : (
                <p>{project.mo_ta_ngan}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '10rem' }}>
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            {project.gallery.map((img: string, i: number) => {
              // Pattern: Wide, Side-by-Side, Wide...
              const isWide = (i % 3 === 0);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ 
                    gridColumn: isWide ? 'span 2' : 'span 1',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    background: '#0a0a0a'
                  }}
                >
                  <BaseImage 
                    src={img} 
                    alt={`${project.title} gallery ${i}`} 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Other Projects Slider Section */}
      <section style={{ 
        padding: '10rem 0',
        background: '#040404',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            marginBottom: '5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginTop: '1rem', textTransform: 'uppercase' }}>Other Projects</h2>
            </motion.div>

            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => {
                  const el = document.getElementById('project-slider');
                  if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('project-slider');
                  if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div 
            id="project-slider"
            style={{ 
              display: 'flex', 
              gap: '2.5rem', 
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingBottom: '2rem',
              scrollSnapType: 'x mandatory'
            }}
          >
            {allProjects
              .filter(p => p.id !== project.id)
              .map((otherProject, index) => (
                <motion.div
                  key={otherProject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/project/${otherProject.id}`);
                  }}
                  style={{ 
                    minWidth: 'calc(33.333% - 1.7rem)', 
                    cursor: 'pointer',
                    scrollSnapAlign: 'start'
                  }}
                  className="slider-item"
                >
                  <div style={{ 
                    aspectRatio: '16/10', 
                    overflow: 'hidden', 
                    borderRadius: '1.5rem',
                    marginBottom: '1.5rem',
                    background: '#0a0a0a'
                  }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <BaseImage 
                        src={otherProject.thumbnail} 
                        alt={otherProject.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </motion.div>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>{otherProject.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 400 }}>{otherProject.mo_ta_ngan}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <style>{`
        #project-slider::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1024px) {
          .slider-item {
            min-width: calc(50% - 1.25rem) !important;
          }
        }
        @media (max-width: 640px) {
          .slider-item {
            min-width: 85% !important;
          }
        }
        .loader {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(255,255,255,0.1);
          border-bottom-color: #FF4500;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectDetail;
