import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BaseImage from '../components/BaseImage';
import { Link } from 'react-router-dom';

interface AllProjectsProps {
  projects: any[];
}

export default function AllProjects({ projects }: AllProjectsProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '150px', minHeight: '100vh', backgroundColor: '#000000' }}>
      <div className="container">
        <h1 style={{ 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          fontWeight: 800, 
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          color: '#ffffff',
          marginBottom: '5rem',
          textAlign: 'left'
        }}>
          OUR WORKS
          {projects && projects.length > 0 && (
            <span style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              display: 'block',
              marginTop: '1.5rem',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.1em'
            }}>
              SHOWCASING {projects.length} PROJECTS
            </span>
          )}
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: '5rem 4rem',
          paddingBottom: '8rem'
        }}>
          {projects && projects.map((project, index) => (
            <Link 
              to={`/project/${project.id}`}
              key={project.id || index}
              style={{ textDecoration: 'none' }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                <motion.div 
                  whileHover={{ scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    position: 'relative',
                    aspectRatio: '16/11',
                    width: '100%',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer'
                  }}>
                  <BaseImage 
                    src={project.thumbnail || project.image || ''} 
                    alt={project.title || project.ten || 'Project Image'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
                
                <div>
                  <h3 style={{ 
                    fontSize: '2.4rem', 
                    fontWeight: 700, 
                    color: 'white',
                    marginBottom: '1rem',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1
                  }}>
                    {project.title || project.ten || 'Untitled'}
                  </h3>
                  <p style={{
                    fontSize: '1.2rem',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.5)'
                  }}>
                    {project.mo_ta_ngan || project.moTa || 'No description available for this project.'}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
