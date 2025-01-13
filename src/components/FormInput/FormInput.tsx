import { ComponentProps } from 'react';
import clsx from 'clsx';

import style from './FormInput.module.scss';

type InputProps = ComponentProps<'input'>;
type TextAreaProps = ComponentProps<'textarea'>;

type FormInputProps = {
  type: InputProps['type'] | 'textarea';
  name: string;
  placeholder: string;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: InputProps['onChange'] | TextAreaProps['onChange'];
  required?: boolean;
  rows?: number;
};

export const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  value,
  error,
  errorMessage,
  onChange,
  required,
  rows,
}) => (
  <div className={style.inputWrapper}>
    {type === 'textarea' ? (
      <textarea
        name={name}
        placeholder={placeholder}
        className={clsx(
          style.textAreaInput,
          style.textArea,
          error && style.error,
        )}
        value={value}
        onChange={onChange as TextAreaProps['onChange']}
        required={required}
        rows={rows}
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={clsx(style.input, error && style.error)}
        value={value}
        onChange={onChange as InputProps['onChange']}
        required={required}
      />
    )}
    {error && <p className={style.errorText}>{errorMessage}</p>}
  </div>
);
