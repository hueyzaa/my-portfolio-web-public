import { useState, useEffect } from 'react';
import { 
  getPageConfig, 
  getProfileFull, 
  getProjects, 
  getTechnologies,
  getServices 
} from './api/api';
import { resolveAssetUrl } from './utils/asset.utils';

import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';


function App() {
  const [data, setData] = useState<{
    config: any;
    profile: any;
    projects: any[];
    technologies: any[];
    services: any[];
    loading: boolean;
  }>({
    config: null,
    profile: null,
    projects: [],
    technologies: [],
    services: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [config, profile, projects, technologies, services] = await Promise.all([
          getPageConfig(),
          getProfileFull(),
          getProjects(),
          getTechnologies(),
          getServices(),
        ]);

        setData({
          config,
          profile,
          projects,
          technologies,
          services,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.config) {
      const title = data.config.find((c: any) => c.key === 'HEADER_TITLE')?.value;
      const logo = data.config.find((c: any) => c.key === 'HEADER_LOGO')?.value;
      
      if (title) {
        document.title = title;
      }
      
      if (logo) {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = resolveAssetUrl(logo);
      }
    }
  }, [data.config]);

  if (data.loading) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        gap: '1.5rem',
      }}>
        <div className="loader" />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em' }}>
          LOADING PORTFOLIO
        </span>
        <style>{`
          .loader {
            width: 48px;
            height: 48px;
            border: 3px solid var(--border);
            border-bottom-color: var(--primary);
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
          }
          @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="portfolio-app">
      <Header config={data.config} />
      
      <Routes>
        <Route path="/" element={<Home profile={data.profile} config={data.config} technologies={data.technologies} projects={data.projects} services={data.services} />} />
        <Route path="/works" element={<AllProjects projects={data.projects} />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>

      <Footer config={data.config} />

      <style>{`
        .portfolio-app {
          background-color: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }
        
        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
        
        section {
          scroll-margin-top: 80px;
        }
      `}</style>
    </div>
  );
}

export default App;
