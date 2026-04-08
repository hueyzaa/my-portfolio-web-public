import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import BaseImage from './BaseImage';

interface ProjectsGridProps {
  projects?: any[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects: initialProjects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const projects = initialProjects ? initialProjects.slice(0, 3) : [];

  if (projects.length === 0) return null;

  // Track scroll progress within the projects section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoothing the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      id="projects" 
      style={{ 
        backgroundColor: '#000000',
        position: 'relative',
      }}
    >
      {/* Intro Header - Scrolls away normally */}
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 2rem'
      }}>
        <h2 
          style={{ 
            fontSize: 'clamp(4rem, 15vw, 15rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: 'white',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Latest Work
          <span style={{ 
            fontSize: 'clamp(1rem, 3vw, 2.5rem)', 
            fontWeight: 400, 
            verticalAlign: 'super',
            marginLeft: '1rem',
            color: 'rgba(255, 255, 255, 0.3)',
            letterSpacing: '0'
          }}>
            {projects.length.toString().padStart(2, '0')}
          </span>
        </h2>
      </div>

      {/* Sticky Slider Area */}
      <div 
        ref={containerRef} 
        style={{ 
          height: `${projects.length * 100}vh`, // Height proportional to project count
          position: 'relative',
        }}
      >
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}>
          
          <div className="container" style={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '8rem',
            alignItems: 'center',
          }}>
            
            {/* Left Column (Info) */}
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              {/* Static Project List Tracker */}
              <div style={{ 
                position: 'absolute', 
                top: '32vh', // Brought much closer to the number above
                left: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                zIndex: 20
              }}>
                {projects.map((project, index) => (
                  <ProjectListItem 
                    key={project.id} 
                    project={project} 
                    index={index} 
                    progress={smoothProgress} 
                    total={projects.length} 
                  />
                ))}
              </div>

              {/* Dynamic Scrolling Info (Number & Description) */}
              {projects.map((project, index) => (
                <ProjectInfoSlide 
                  key={`info-${project.id}`} 
                  project={project} 
                  index={index} 
                  progress={smoothProgress} 
                  total={projects.length} 
                />
              ))}

            </div>

            {/* Right Column (Images) */}
            <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {projects.map((project, index) => (
                 <ProjectImageSlide 
                   key={`img-${project.id}`} 
                   project={project} 
                   index={index} 
                   progress={smoothProgress} 
                   total={projects.length} 
                 />
               ))}
            </div>

          </div>
        </div>
      </div>

      {/* More Projects Button */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 6rem 0', background: '#000', position: 'relative', zIndex: 10 }}>
        <Link 
          to="/works"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.2rem',
            width: 'clamp(280px, 40vw, 500px)',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#FF4500',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
             e.currentTarget.style.borderColor = '#FF4500';
             e.currentTarget.style.color = '#fff';
             e.currentTarget.style.background = '#FF4500';
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
             e.currentTarget.style.color = '#FF4500';
             e.currentTarget.style.background = 'transparent';
          }}
        >
          MORE PROJECTS
        </Link>
      </div>
    </section>
  );
};


// --- Internal Components ---

interface SlideProps {
  project: any;
  index: number;
  progress: any;
  total: number;
}

const ProjectListItem: React.FC<SlideProps> = ({ project, index, progress, total }) => {
  const getTransform = () => {
    if (total <= 1) return { input: [0, 1], opac: [1, 1], width: ["40px", "40px"] };
    const sec = 1 / (total - 1);
    const center = index * sec;
    const inStart = center - sec * 0.5;
    const inEnd = center - sec * 0.1;
    const outStart = center + sec * 0.1;
    const outEnd = center + sec * 0.5;
    
    if (index === 0) {
      return { input: [0, outStart, outEnd], opac: [1, 1, 0.3], width: ["40px", "40px", "20px"] };
    } else if (index === total - 1) {
      return { input: [inStart, inEnd, 1], opac: [0.3, 1, 1], width: ["20px", "40px", "40px"] };
    } else {
      return { input: [inStart, inEnd, outStart, outEnd], opac: [0.3, 1, 1, 0.3], width: ["20px", "40px", "40px", "20px"] };
    }
  };

  const { input, opac, width: wOut } = getTransform();
  const opacity = useTransform(progress, input, opac);
  const width = useTransform(progress, input, wOut);

  const title = project.title || project.ten || 'Untitled Project';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <motion.div style={{ height: '1.5px', background: 'white', width, opacity }} />
      <motion.span style={{ fontSize: '1.25rem', fontWeight: 600, opacity }}>{title}</motion.span>
    </div>
  );
};

const ProjectInfoSlide: React.FC<SlideProps> = ({ project, index, progress, total }) => {
  const getTransform = () => {
    if (total <= 1) return { input: [0, 1], opac: [1, 1], yStr: [0, 0] };
    const sec = 1 / (total - 1);
    const center = index * sec;
    const inStart = center - sec * 0.5;
    const inEnd = center - sec * 0.15;
    const outStart = center + sec * 0.15;
    const outEnd = center + sec * 0.5;

    if (index === 0) {
      return { input: [0, outStart, outEnd], opac: [1, 1, 0], yStr: [0, 0, -50] };
    } else if (index === total - 1) {
      return { input: [inStart, inEnd, 1], opac: [0, 1, 1], yStr: [50, 0, 0] };
    } else {
      return { input: [inStart, inEnd, outStart, outEnd], opac: [0, 1, 1, 0], yStr: [50, 0, 0, -50] };
    }
  };

  const { input, opac, yStr } = getTransform();
  const opacity = useTransform(progress, input, opac);
  const y = useTransform(progress, input, yStr);

  const displayNumber = (index + 1).toString().padStart(2, '0');
  const title = project.title || project.ten || 'Untitled Project';
  const description = project.mo_ta_ngan || project.moTa || '';

  return (
    <motion.div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity,
        y,
        pointerEvents: 'none'
      }}
    >
      <div style={{ pointerEvents: 'auto', height: '100%', width: '100%', position: 'relative' }}>
        {/* Top Number */}
      <div style={{ 
        position: 'absolute',
        top: '12vh',
        left: 0,
        fontSize: 'clamp(5rem, 8vw, 9rem)', // Significantly shrunk the number
        fontWeight: 800, 
        lineHeight: 1, 
        color: 'rgba(255, 255, 255, 0.05)',
        letterSpacing: '-0.06em',
      }}>
        {displayNumber}.
      </div>

      {/* Bottom Description */}
      <div style={{ position: 'absolute', bottom: '12vh', left: 0 }}>
        <h3 style={{ 
          fontSize: 'clamp(3rem, 5vw, 5rem)', 
          fontWeight: 700, 
          marginBottom: '1rem',
          letterSpacing: '-0.04em',
          color: '#ffffff'
        }}>
          {title}
        </h3>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(255, 255, 255, 0.6)', 
          lineHeight: 1.6,
          maxWidth: '400px'
        }}>
          {description}
        </p>
        

      </div>
    </div>
    </motion.div>
  );
};

const ProjectImageSlide: React.FC<SlideProps> = ({ project, index, progress, total }) => {
  const getTransform = () => {
    if (total <= 1) return { input: [0, 1], opac: [1, 1], yStr: ["0vh", "0vh"], sc: [1, 1] };
    const sec = 1 / (total - 1);
    const center = index * sec;
    const inStart = center - sec * 0.5;
    const inEnd = center - sec * 0.15;
    const outStart = center + sec * 0.15;
    const outEnd = center + sec * 0.5;

    if (index === 0) {
      return { 
        input: [0, outStart, outEnd], 
        opac: [1, 1, 0], 
        yStr: ["0vh", "0vh", "-30vh"], 
        sc: [1, 1, 0.85] 
      };
    } else if (index === total - 1) {
      return { 
        input: [inStart, inEnd, 1], 
        opac: [0, 1, 1], 
        yStr: ["100vh", "0vh", "0vh"], 
        sc: [0.85, 1, 1] 
      };
    } else {
      return { 
        input: [inStart, inEnd, outStart, outEnd], 
        opac: [0, 1, 1, 0], 
        yStr: ["100vh", "0vh", "0vh", "-30vh"], 
        sc: [0.85, 1, 1, 0.85] 
      };
    }
  };

  const { input, opac, yStr, sc } = getTransform();
  
  // Adjusted transitions for a exactly pulled from bottom and scaled properly
  const opacity = useTransform(progress, input, opac);
  const y = useTransform(progress, input, yStr);
  const scale = useTransform(progress, input, sc);

  const title = project.title || project.ten || 'Untitled Project';
  const image = project.thumbnail || project.image || '';

  return (
    <motion.div 
      style={{ 
        position: 'absolute',
        width: '100%',
        height: '76vh', // Huge commanding image filling the center space vertically
        top: '12vh', // precisely align with the top number
        opacity,
        y,
        scale,
      }}
    >
      <Link 
        to={`/project/${project.id}`}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '2rem',
          overflow: 'hidden',
          background: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <BaseImage 
            src={image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </Link>
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '120%',
        height: '120%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
};

export default ProjectsGrid;
