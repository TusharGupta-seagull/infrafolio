import React from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { certifications } from '../data/content';
import { SiHashicorp } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import './Certifications.css';

const getCertIcon = (issuer: string) => {
  if (issuer.includes('Amazon')) return <FaAws size={40} />;
  if (issuer.includes('HashiCorp')) return <SiHashicorp size={40} />;
  return null;
};

export const Certifications: React.FC = () => {
  return (
    <Section id="certifications" background="surface">
      <Container>
        <div className="section-header">
          <Typography variant="h2">Certifications</Typography>
        </div>
        <div className="certs-editorial">
          {certifications.map(cert => (
            <div key={cert.id} id={`cert-${cert.id}`} className="cert-row">
              <div className="cert-info">
                <div className="cert-icon">
                  {getCertIcon(cert.issuer)}
                </div>
                <div className="cert-text">
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
                      <Typography variant="body" style={{ fontWeight: 600 }}>{cert.name}</Typography>
                      <ArrowUpRight size={16} className="cert-link-icon" />
                    </a>
                  ) : (
                    <Typography variant="body" style={{ fontWeight: 600 }}>{cert.name}</Typography>
                  )}
                </div>
              </div>
              <div className="cert-provider">
                <Typography variant="body" color="tertiary">
                  {cert.issuer}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
