import { ComponentProps } from 'react';
import clsx from 'clsx';

import { ChildrenFC } from '../../utils/type';
import style from './Button.module.scss';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  variant: 'primary' | 'secondary';
} & ComponentProps<'button'>;

export const Button: ChildrenFC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}) => (
  <button
    className={clsx(
      style.base,
      variant === 'primary' ? style.primary : style.secondary,
      className,
    )}
    onClick={onClick}
    type={type}
    {...props}
  >
    {children}
  </button>
);
