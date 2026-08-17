import React from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { skills } from '../data/content';
import { FaAws, FaDocker, FaJenkins, FaLinux, FaJava } from 'react-icons/fa';
import { SiTerraform, SiPrometheus } from 'react-icons/si';
import './Skills.css';

const totalTech = skills.reduce((acc, s) => acc + s.items.length, 0);

const categoryIcons: Record<string, React.ReactNode> = {
  'Cloud Providers': <FaAws size={16} />,
  'Containers & Orchestration': <FaDocker size={16} />,
  'Infrastructure as Code': <SiTerraform size={16} />,
  'CI/CD': <FaJenkins size={16} />,
  'Observability': <SiPrometheus size={16} />,
  'OS & Scripting': <FaLinux size={16} />,
  'Development': <FaJava size={16} />,
};

export const Skills: React.FC = () => {
  return (
    <Section id="skills" background="surface">
      <Container>
        <div className="skills-split">
          {/* Left: anchored header */}
          <div className="skills-aside">
            <Typography variant="h2">Technical Capability</Typography>
            <Typography variant="body" color="tertiary" className="skills-count">
              {skills.length} domains · {totalTech} technologies
            </Typography>
          </div>

          {/* Right: dense multi-column layout */}
          <div className="skills-columns">
            {skills.map((group) => (
              <div key={group.category} className="skills-block">
                <div className="skills-block-header">
                  <span className="skills-block-icon">
                    {categoryIcons[group.category]}
                  </span>
                  <Typography variant="label" color="secondary" className="skills-block-label">
                    {group.category}
                  </Typography>
                </div>
                <ul className="skills-list">
                  {group.items.map((item) => (
                    <li key={item} className="skills-list-item">
                      <Typography variant="body">{item}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
