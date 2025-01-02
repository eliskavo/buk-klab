import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { ChildrenFC } from '../../utils/type';
import style from './FormWrapper.module.scss';

type FormWrapperProps = {
  children: React.ReactNode;
  title: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formRef?: React.RefObject<HTMLFormElement>;
  className?: string;
  redirectText?: string;
  redirectTo?: string;
  redirectLinkText?: string;
  illustration?: string;
  variant?: 'default' | 'register';
};

export const FormWrapper: ChildrenFC<FormWrapperProps> = ({
  children,
  title,
  onSubmit,
  formRef,
  className,
  redirectText,
  redirectTo = '/',
  redirectLinkText,
}) => (
  <div className={style.formSection}>
    <form
      onSubmit={onSubmit}
      className={clsx(style.form, className)}
      ref={formRef}
    >
      <h1 className={style.formTitle}>{title}</h1>
      {children}
      <p className={style.redirectText}>
        {redirectText}{' '}
        <Link to={redirectTo} className={style.redirectLink}>
          {redirectLinkText}
        </Link>
      </p>
    </form>
  </div>
);
