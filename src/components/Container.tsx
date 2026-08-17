import React from 'react';
import './Container.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  as: Component = 'div' as any
}) => {
  return (
    <Component className={`container ${className}`}>
      {children}
    </Component>
  );
};
