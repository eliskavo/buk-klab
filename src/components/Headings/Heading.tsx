import clsx from 'clsx';

import { ChildrenFC } from '../../utils/type';
import style from './Headings.module.scss';

type HeadingProps = {
  className?: string;
};

export const Title: ChildrenFC<HeadingProps> = ({ children, className }) => (
  <h1 className={clsx(style.title, className)}>{children}</h1>
);

export const Heading1: ChildrenFC<HeadingProps> = ({ children, className }) => (
  <h1 className={clsx(style.heading1, className)}>{children}</h1>
);

export const Heading2: ChildrenFC<HeadingProps> = ({ children, className }) => (
  <h2 className={clsx(style.heading2, className)}>{children}</h2>
);

export const Heading3: ChildrenFC<HeadingProps> = ({ children, className }) => (
  <h3 className={clsx(style.heading3, className)}>{children}</h3>
);
