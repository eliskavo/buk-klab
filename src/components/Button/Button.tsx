import { ComponentProps } from 'react';
import clsx from 'clsx';

import { ChildrenFC } from '../../utils/type';
import style from './Button.module.scss';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'form';
  type?: 'button' | 'submit';
} & ComponentProps<'button'>;

export const Button: ChildrenFC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'default',
  type = 'button',
  ...props
}) => (
  <button
    className={clsx(
      style.button,
      variant === 'form' && style.formButton,
      className,
    )}
    onClick={onClick}
    type={type}
    {...props}
  >
    {children}
  </button>
);
