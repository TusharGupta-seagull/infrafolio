import React from 'react';
import './Section.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'primary' | 'surface' | 'tertiary';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  background = 'primary'
}) => {
  return (
    <section 
      id={id} 
      className={`section bg-${background} ${className}`}
    >
      {children}
    </section>
  );
};
