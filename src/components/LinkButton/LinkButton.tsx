import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import style from '../Button/Button.module.scss';
import { ChildrenFC } from '../../utils/type';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
} & ComponentProps<typeof Link>;

export const LinkButton: ChildrenFC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  ...props
}) => (
  <Link className={`${style.button} ${className}`} {...props}>
    {children}
  </Link>
);
