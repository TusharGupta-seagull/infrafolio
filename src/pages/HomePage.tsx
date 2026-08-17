import React from 'react';
import { Hero } from '../sections/Hero';
import { Impact } from '../sections/Impact';
import { Experience } from '../sections/Experience';
import { Certifications } from '../sections/Certifications';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';

export const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Impact />
      <Experience />
      <Certifications />
      <Projects />
      <Skills />
    </main>
  );
};
