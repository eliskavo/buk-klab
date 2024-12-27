import { ChangeEvent } from 'react';

import style from './FormInput.module.scss';

type FormInputProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

export const FormInput = ({
  type,
  name,
  placeholder,
  value,
  error,
  errorMessage,
  onChange,
  onBlur,
}: FormInputProps) => (
  <div className={style.inputWrapper}>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${style.input} ${error ? style.error : ''}`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <p className={style.errorText}>{errorMessage}</p>}
  </div>
);
