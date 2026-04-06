import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import ProjectsGrid from '../components/ProjectsGrid';
import ContactSection from '../components/ContactSection';

export default function Home({ profile, config, technologies, projects }: any) {
  return (
    <main>
      <Hero profile={profile} />
      <About profile={profile} config={config} />
      <TechStack technologies={technologies} />
      <ProjectsGrid projects={projects} />
      <ContactSection config={config} />
    </main>
  );
}
