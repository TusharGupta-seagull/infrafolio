import React from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { SiGmail } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { links } from '../data/content';
import './Contact.css';

export const Contact: React.FC = () => {
  return (
    <Section id="contact" background="tertiary">
      <Container>
        <div className="contact-content">
          <Typography variant="h2" className="contact-title">Let's Connect</Typography>
          <Typography variant="body-lg" color="secondary" className="contact-desc">
            Currently open for new opportunities in DevOps and Cloud Engineering.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </Typography>

          <div className="contact-buttons">
            <Button
              size="lg"
              onClick={() => window.location.href = 'mailto:tushar@example.com'}
              className="contact-btn contact-btn-gmail"
            >
              <SiGmail size={18} style={{ marginRight: '8px' }} />
              Say Hello
            </Button>
            <Button
              size="lg"
              onClick={() => window.open(links.linkedin, '_blank')}
              className="contact-btn contact-btn-linkedin"
            >
              <FaLinkedinIn size={18} style={{ marginRight: '8px' }} />
              LinkedIn
            </Button>
          </div>
        </div>
      </Container>

      <footer className="footer">
        <Container className="footer-container">
          <Typography variant="body-sm" color="tertiary">
            Designed & Built deliberately.
          </Typography>
          <Typography variant="body-sm" color="tertiary">
            © 2026 Tushar Gupta
          </Typography>
        </Container>
      </footer>
    </Section>
  );
};
