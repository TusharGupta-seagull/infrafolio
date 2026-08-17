import React, { useEffect, useState } from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { projects } from '../data/content';
import { Search } from 'lucide-react';
import '../sections/Projects.css'; // Import the card styles
import './ProjectsPage.css';

export const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <Section id="projects-page" background="primary">
        <Container>
          <div className="section-header" style={{ marginBottom: 'var(--spacing-16)' }}>
            <Typography variant="label" color="secondary">PORTFOLIO</Typography>
            <Typography variant="h1" style={{ marginTop: 'var(--spacing-4)' }}>Projects</Typography>
          </div>

          <div className="projects-search-bar">
            <Search size={18} className="projects-search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="projects-search-input"
              aria-label="Search projects by name"
            />
          </div>
          
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="glass-card page-glass-card">
                <div className="glass-card-bg">
                  <div className={`abstract-gradient-bg index-${index % 3}`}></div>
                </div>

                <div className="glass-card-top">
                  <Typography variant="label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {project.technologies[0]}
                  </Typography>
                  <Typography variant="label" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    0{index + 1}
                  </Typography>
                </div>

                <div className="glass-card-content">
                  <div className="glass-card-text">
                    <Typography variant="h3" style={{ color: 'white' }} className="glass-card-title">
                      {project.title}
                    </Typography>
                    <Typography variant="body" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {project.description}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="projects-empty-state">
              <Typography variant="body" color="secondary">
                No projects found matching "{searchQuery}"
              </Typography>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
};
