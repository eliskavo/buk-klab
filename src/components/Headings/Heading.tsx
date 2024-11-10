import React from 'react';

import style from './Headings.module.scss';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<HeadingProps> = ({ children, className }) => (
  <h1 className={`${style.Title} ${className}`}>{children}</h1>
);

export const Heading1: React.FC<HeadingProps> = ({ children, className }) => (
  <h1 className={`${style.heading1} ${className}`}>{children}</h1>
);

export const Heading2: React.FC<HeadingProps> = ({ children, className }) => (
  <h2 className={`${style.heading2} ${className}`}>{children}</h2>
);

export const Heading3: React.FC<HeadingProps> = ({ children, className }) => (
  <h3 className={`${style.heading3} ${className}`}>{children}</h3>
);
