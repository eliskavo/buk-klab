import { ComponentProps } from 'react';
import clsx from 'clsx';

import { ChildrenFC } from '../../utils/type';
import style from './SecondaryButton.module.scss';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  type?: 'button';
} & ComponentProps<'button'>;

export const SecondaryButton: ChildrenFC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = 'button',
  ...props
}) => (
  <button
    className={clsx(style.button, className)}
    onClick={onClick}
    type={type}
    {...props}
  >
    {children}
  </button>
);
