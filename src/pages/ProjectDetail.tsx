import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectById, getTechnologies, getProjects } from '../api/api';
import BaseImage from '../components/BaseImage';

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
      style={{ minHeight: '100vh', background: '#000', color: '#fff' }}
    >
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
             <span style={{ 
               display: 'block', 
               fontSize: '1rem', 
               fontWeight: 600, 
               color: '#FF4500', 
               textTransform: 'uppercase',
               letterSpacing: '0.2em',
               marginBottom: '1rem'
             }}>
               (Selected Work)
             </span>
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
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Year</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{project.nam || '2024'}</span>
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

      {/* Next Project Teaser */}
      {(() => {
        const currentIndex = allProjects.findIndex(p => p.id === project.id);
        const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
        
        if (!nextProject || allProjects.length <= 1) return null;

        return (
          <section
            onClick={() => navigate(`/project/${nextProject.id}`)}
            style={{ 
              padding: '12rem 0',
              background: '#040404',
              cursor: 'pointer',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="container">
              <span style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem' }}>Next Case Study</span>
              <h2 style={{ 
                fontSize: 'clamp(3rem, 12vw, 10rem)', 
                fontWeight: 900, 
                marginTop: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '-0.04em',
                transition: 'transform 0.5s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {nextProject.title}
              </h2>
            </div>
          </section>
        );
      })()}

      <style>{`
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
