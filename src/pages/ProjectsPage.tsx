import React, { useEffect, useState } from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { projects } from '../data/content';
import { Search, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ProjectsPage.css';

export const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCardClick = (projectSlug: string) => {
    navigate(`/projects/${projectSlug}`);
  };

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
              placeholder="Search by name or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="projects-search-input"
              aria-label="Search projects by name or technology"
            />
          </div>
          
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className="projects-page-card"
                onClick={() => handleCardClick(project.slug)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(project.slug); }}
                aria-label={`View details for ${project.title}`}
              >
                <div className="projects-page-card-bg">
                  <div className={`abstract-gradient-bg index-${index % 3}`}></div>
                </div>

                <div className="projects-page-card-inner">
                  <div className="projects-page-card-top">
                    <Typography variant="label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {project.technologies[0]}
                    </Typography>
                    <Typography variant="label" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      0{index + 1}
                    </Typography>
                  </div>

                  <div className="projects-page-card-content">
                    <div className="projects-page-card-text">
                      <Typography variant="h3" style={{ color: 'white' }} className="projects-page-card-title">
                        {project.title}
                      </Typography>
                      <Typography variant="body" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {project.description}
                      </Typography>
                    </div>

                    <span className="projects-page-view-btn">
                      <ExternalLink size={13} />
                      <Typography variant="label" color="inherit">View project</Typography>
                    </span>
                  </div>
                </div>

                <div className="projects-page-tags" onClick={(e) => e.stopPropagation()}>
                  {project.technologies.map(tech => (
                    <span key={tech} className="projects-page-tag">{tech}</span>
                  ))}
                </div>
              </article>
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
