import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { ArrowLeft } from 'lucide-react';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found-main">
      <Section id="404" background="primary" className="not-found-section">
        <Container>
          <div className="not-found-content">
            <div className="not-found-text-wrapper">
              <div className="not-found-badge">
                <Typography variant="label" style={{ letterSpacing: '0.1em' }}>ERR_404</Typography>
              </div>
              <Typography variant="h1" className="not-found-title">
                404
              </Typography>
              <Typography variant="h2" style={{ marginBottom: 'var(--spacing-6)' }}>
                System Object Not Found
              </Typography>
              
              <div className="not-found-description-box">
                <Typography variant="body" color="secondary">
                  The endpoint you requested does not exist in the current configuration. Please verify the path and try again or return to the base index.
                </Typography>
              </div>
              
              <Link to="/" className="not-found-return-btn">
                <ArrowLeft size={16} className="btn-icon" />
                <Typography variant="label" color="inherit">Return to Base</Typography>
              </Link>
            </div>
            
            <div className="not-found-graphics">
              <div className="not-found-grid-pattern"></div>
              <div className="not-found-radar-container">
                <div className="not-found-circle not-found-circle-outer"></div>
                <div className="not-found-circle not-found-circle-middle"></div>
                <div className="not-found-circle not-found-circle-inner"></div>
                <div className="not-found-radar-sweep"></div>
                <div className="not-found-radar-dot"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
};
