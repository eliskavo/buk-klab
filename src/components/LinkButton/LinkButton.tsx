import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import style from '../Button/Button.module.scss';
import { ChildrenFC } from '../../utils/type';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  variant: 'primary' | 'secondary';
} & ComponentProps<typeof Link>;

export const LinkButton: ChildrenFC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'primary',
  ...props
}) => (
  <Link
    className={clsx(
      style.base,
      {
        [style.primary]: variant === 'primary',
        [style.secondary]: variant === 'secondary',
      },
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);
