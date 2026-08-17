import React from 'react';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { metrics, certifications } from '../data/content';
import './Impact.css';

export const Impact: React.FC = () => {
  return (
    <section id="impact" className="impact-section">
      <Container>
        <div className="impact-layout">
          <Typography variant="label" className="impact-label">
            SELECTED IMPACT
          </Typography>
          
          <div className="impact-metrics-inline">
            {metrics.map((metric) => (
              <div key={metric.id} className="impact-metric">
                <Typography variant="h3" className="metric-value">
                  {metric.value}
                </Typography>
                <div className="metric-text">
                  <Typography variant="body" style={{ fontWeight: 500 }}>
                    {metric.label.toLowerCase()}
                  </Typography>
                </div>
              </div>
            ))}
            
            <div className="impact-badges-container">
              <div className="impact-badges-divider"></div>
              <div className="impact-badges">
                {certifications.map((cert) => cert.image && (
                  <a key={cert.id} href="#certifications" title={cert.name} className="impact-badge-link">
                    <img src={cert.image} alt={cert.name} className="impact-badge-img" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
