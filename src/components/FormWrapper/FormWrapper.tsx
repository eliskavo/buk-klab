import { FormEvent, RefObject, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { ChildrenFC } from '../../utils/type';
import style from './FormWrapper.module.scss';

type FormWrapperProps = {
  children: ReactNode;
  title: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formRef?: RefObject<HTMLFormElement>;
  className?: string;
  redirectText?: string;
  redirectTo?: string;
  redirectLinkText?: string;
  submitText?: string;
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
  submitText,
}) => (
  <div className={style.container}>
    <form
      onSubmit={onSubmit}
      className={clsx(style.form, className)}
      ref={formRef}
    >
      <h1 className={style.title}>{title}</h1>

      {children}

      <button type="submit" className={style.submitButton}>
        {submitText}
      </button>
      <p className={style.redirectText}>
        {redirectText}{' '}
        <Link to={redirectTo} className={style.redirectLink}>
          {redirectLinkText}
        </Link>
      </p>
    </form>
  </div>
);
