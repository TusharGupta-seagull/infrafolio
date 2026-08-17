import React, { useState } from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Badge } from '../components/Badge';
import { experience } from '../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBuilding } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Experience.css';

const getCompanyIcon = () => {
  return <FaBuilding size={16} />;
};

export const Experience: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialExperience = experience.slice(0, 2);
  const additionalExperience = experience.slice(2);

  const renderExperienceItem = (exp: typeof experience[0], showLine: boolean) => (
    <div key={exp.id} className="experience-item">
      <div className="experience-node">
        <div className="experience-dot">
          {getCompanyIcon()}
        </div>
        {showLine && <div className="experience-line" />}
      </div>
      <div className="experience-content">
        <div className="experience-meta">
          <Typography variant="h3">{exp.role}</Typography>
          <Typography variant="body" color="accent" className="experience-company">
            {exp.company}
          </Typography>
          <Typography variant="label" color="tertiary" className="experience-period">
            {exp.period}
          </Typography>
        </div>
        <Typography variant="body" color="secondary" className="experience-desc">
          {exp.description}
        </Typography>
        <div className="experience-tech">
          {exp.technologies.map(tech => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Section id="experience">
      <Container>
        <div className="section-header">
          <Typography variant="h2">Experience</Typography>
          <Typography variant="body-lg" color="secondary">
            Building and operating resilient infrastructure across organizations.
          </Typography>
        </div>

        <div className="experience-timeline">
          {initialExperience.map((exp, index) => 
            // Always show the line for the first item, and for the second item if there is additional experience to connect to
            renderExperienceItem(exp, index !== initialExperience.length - 1 || additionalExperience.length > 0)
          )}

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="additional-experience"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: 'var(--spacing-16)', display: 'flex', flexDirection: 'column' }}>
                  {additionalExperience.map((exp, index) => 
                    renderExperienceItem(exp, index !== additionalExperience.length - 1)
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
      
      {experience.length > 2 && (
        <div className="experience-toggle-container">
          <button 
            className="experience-toggle-btn-centered" 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Show less experience" : "Show all experience"}
          >
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      )}
    </Section>
  );
};
