import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import ProjectsGrid from '../components/ProjectsGrid';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';

export default function Home({ profile, config, technologies, projects, services }: any) {
  return (
    <main>
      <Hero profile={profile} config={config} />
      <About profile={profile} config={config} />
      <ProjectsGrid projects={projects} />
      <ServicesSection services={services} technologies={technologies} />
      <TechStack technologies={technologies} />
      <ContactSection config={config} />
    </main>
  );
}
