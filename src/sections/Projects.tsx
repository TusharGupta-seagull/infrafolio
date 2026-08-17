import React, { useRef, useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { projects } from '../data/content';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Projects.css';

export const Projects: React.FC = () => {
  const [isAtEnd, setIsAtEnd] = useState(false);
  const lastCardRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtEnd(entry.isIntersecting);
      },
      {
        root: sliderRef.current,
        threshold: 0.5,
      }
    );

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="projects" background="primary">
      <Container>
        <div className="section-header projects-header-row">
          <Typography variant="h2">Projects</Typography>
          <Link to="/projects" className={`view-all-link ${isAtEnd ? 'hidden' : ''}`}>
            <Typography variant="body" style={{ fontWeight: 500 }}>View all projects</Typography>
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>

      <div className="projects-glass-slider" ref={sliderRef}>
        {projects.map((project, index) => (
          <div key={project.id} className="glass-card">
            <div className="glass-card-bg">
              {/* We use an abstract CSS gradient since we don't have images yet */}
              <div className={`abstract-gradient-bg index-${index}`}></div>
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

              <Link to="/projects" className="glass-learn-more">
                <Typography variant="label">Learn more</Typography>
              </Link>
            </div>
          </div>
        ))}

        <div className="glass-card view-all-card" ref={lastCardRef}>
          <Link to="/projects" className="view-all-slider-link">
            <Typography variant="h3">View all projects</Typography>
            <ArrowRight size={24} className="view-all-icon" />
          </Link>
        </div>
      </div>
    </Section>
  );
};
