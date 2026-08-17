import React, { useEffect, useState } from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { projects } from '../data/content';
import { Search, ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './ProjectsPage.css';

export const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProjectId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleCardClick = (projectId: string) => {
    setSelectedProjectId(projectId);
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
                onClick={() => handleCardClick(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(project.id); }}
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

                    <div className="projects-card-actions">
                      {project.hashnodeUrl && (
                        <a 
                          href={project.hashnodeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="projects-page-view-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Typography variant="label" color="inherit">Learn more</Typography>
                          <ExternalLink size={13} />
                        </a>
                      )}
                      
                      {project.projectUrl && (
                        <a 
                          href={project.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="projects-page-view-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Typography variant="label" color="inherit">Project Link</Typography>
                          <ExternalLink size={13} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="projects-page-view-btn github-circle-btn"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="View on GitHub"
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                    </div>
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

      {/* ── Project Modal ── */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProjectId(null)}>
          <div 
            className="project-modal-content glass-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button className="project-modal-close" onClick={() => setSelectedProjectId(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>
              {selectedProject.title}
            </Typography>
            
            <div className="project-modal-tags">
              {selectedProject.technologies.map(tech => (
                <span key={tech} className="projects-page-tag modal-tag">{tech}</span>
              ))}
            </div>

            <div className="project-modal-body">
              <Typography variant="body" style={{ whiteSpace: 'pre-line' }}>
                {selectedProject.longDescription}
              </Typography>
            </div>
            
            <div className="project-modal-actions">
              {selectedProject.hashnodeUrl && (
                <a 
                  href={selectedProject.hashnodeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="projects-page-view-btn"
                >
                  <Typography variant="label" color="inherit">Learn more</Typography>
                  <ExternalLink size={13} />
                </a>
              )}

              {selectedProject.projectUrl && (
                <a 
                  href={selectedProject.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="projects-page-view-btn"
                >
                  <Typography variant="label" color="inherit">Project Link</Typography>
                  <ExternalLink size={13} />
                </a>
              )}
              
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="projects-page-view-btn github-circle-btn"
                  aria-label="View on GitHub"
                >
                  <FaGithub size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
