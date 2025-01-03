import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import style from '../Button/Button.module.scss';
import { ChildrenFC } from '../../utils/type';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'form';
} & ComponentProps<typeof Link>;

export const LinkButton: ChildrenFC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'default',
  ...props
}) => (
  <Link
    className={clsx(
      style.button,
      variant === 'form' && style.formButton,
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);
