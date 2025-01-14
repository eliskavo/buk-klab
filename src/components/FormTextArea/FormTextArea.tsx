import { ComponentProps } from 'react';
import clsx from 'clsx';

import style from './FormTextArea.module.scss';

type TextAreaProps = ComponentProps<'textarea'>;

type FormTextAreaProps = {
  type: 'textarea';
  name: string;
  placeholder: string;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: TextAreaProps['onChange'];
  required?: boolean;
  rows?: number;
};

export const FormTextArea: React.FC<FormTextAreaProps> = ({
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
    <textarea
      name={name}
      placeholder={placeholder}
      className={clsx(
        style.textAreaInput,
        style.textArea,
        error && style.error,
      )}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />

    {error && <p className={style.errorText}>{errorMessage}</p>}
  </div>
);
