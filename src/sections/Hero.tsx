import React from 'react';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { InfrastructureVisual } from '../components/InfrastructureVisual';
import { ArrowRight, Mouse } from 'lucide-react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-visual">
        <InfrastructureVisual />
      </div>
      <Container>
        <div className="hero-layout">
          <div className="hero-content">
            <Typography variant="label" className="hero-label">
              DEVOPS / CLOUD ENGINEER
            </Typography>
            <Typography variant="h1" className="hero-title">
              Tushar Gupta
            </Typography>
            <Typography variant="body-lg" color="secondary" className="hero-description">
              DevOps & Cloud Engineer focused on AWS infrastructure, Kubernetes, delivery automation, and observability.
            </Typography>
            
            <div className="hero-cta-group">
              <a href="#experience" className="hero-cta-link" onClick={(e) => {
                e.preventDefault();
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Typography variant="body" style={{ fontWeight: 500 }}>View experience</Typography>
                <ArrowRight size={16} />
              </a>
              <a href="#projects" className="hero-cta-link hero-cta-secondary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Typography variant="body" style={{ fontWeight: 500 }}>View projects</Typography>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </Container>
      
      <div className="hero-interaction-hint">
        <Mouse size={14} className="hero-interaction-icon" />
        <Typography variant="body-sm">Scroll and drag to explore</Typography>
      </div>
    </section>
  );
};
