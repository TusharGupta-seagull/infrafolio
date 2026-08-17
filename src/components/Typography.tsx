import React from 'react';
import './Typography.css';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body-lg' | 'body' | 'body-sm' | 'label';
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'inherit';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  as,
  className = '',
  style,
  color = 'primary',
}) => {
  const Component = (as || getDefaultElement(variant)) as any;
  return (
    <Component className={`typography variant-${variant} color-${color} ${className}`} style={style}>
      {children}
    </Component>
  );
};

function getDefaultElement(variant: string): React.ElementType {
  switch (variant) {
    case 'h1': return 'h1';
    case 'h2': return 'h2';
    case 'h3': return 'h3';
    case 'h4': return 'h4';
    case 'label': return 'span';
    default: return 'p';
  }
}
