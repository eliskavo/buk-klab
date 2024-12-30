import { ComponentProps } from 'react';
import clsx from 'clsx';

import style from './FormInput.module.scss';

type InputProps = ComponentProps<'input'>;

type FormInputProps = {
  type: InputProps['type'];
  name: string;
  placeholder: string;
  value: string;
  error?: boolean;
  errorMessage?: string;
  onChange: InputProps['onChange'];
  onBlur: InputProps['onBlur'];
};

export const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  value,
  error,
  errorMessage,
  onChange,
  onBlur,
}) => (
  <div className={style.inputWrapper}>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={clsx(style.input, error && style.error)}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <p className={style.errorText}>{errorMessage}</p>}
  </div>
);
