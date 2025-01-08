import { useState, FormEvent, ChangeEvent } from 'react';
import clsx from 'clsx';

import group_of_people from '../../assets/images/group_of_people.png';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import { FormInput } from '../FormInput/FormInput';
import { getSupabaseClient } from '../../api/supabase';
import style from './RegistrationForm.module.scss';

const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const INITIAL_ERRORS = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
};

type FormData = typeof INITIAL_FORM_DATA;
type FormErrors = typeof INITIAL_ERRORS;

const ERROR_MESSAGES = {
  firstName: 'First name cannot be empty or contain numbers',
  lastName: 'Last name cannot be empty or contain numbers',
  email: 'Please enter a valid email',
  password:
    'Password must have at least 8 characters, 1 uppercase letter and 1 number',
  passwordMatch: "Passwords don't match",
  emailExists: 'User with this email already exists',
};

const isNumber = (value: string) => value >= '0' && value <= '9';
const isUpperCase = (value: string) => value >= 'A' && value <= 'Z';

const validators = {
  name: (value: string) =>
    value.length > 0 && value.split('').every((char) => !isNumber(char)),
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  password: (value: string) => {
    if (value.length < 8) {
      return false;
    }

    const charList = value.split('');

    return charList.some(isUpperCase) && charList.some(isNumber);
  },
};

const isInputInvalid = ({
  name,
  value,
  formData,
}: {
  name: string;
  value: string;
  formData: FormData;
}) => {
  switch (name) {
    case 'firstName':
    case 'lastName':
      return !validators.name(value);
    case 'email':
      return !validators.email(value);
    case 'password':
      return !validators.password(value);
    case 'confirmPassword':
      return value !== formData.password;

    default:
      return false;
  }
};

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: isInputInvalid({ name, value, formData }),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailErrorMessage('');

    const newErrors = {
      firstName: isInputInvalid({
        name: 'firstName',
        value: formData.firstName,
        formData,
      }),
      lastName: isInputInvalid({
        name: 'lastName',
        value: formData.lastName,
        formData,
      }),
      email: isInputInvalid({ name: 'email', value: formData.email, formData }),
      password: isInputInvalid({
        name: 'password',
        value: formData.password,
        formData,
      }),
      confirmPassword: isInputInvalid({
        name: 'confirmPassword',
        value: formData.confirmPassword,
        formData,
      }),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);

      return;
    }

    try {
      const { data, error } = await getSupabaseClient().auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      const isUserDuplicate = data.user?.identities?.length === 0;

      if (isUserDuplicate) {
        setEmailErrorMessage(ERROR_MESSAGES.emailExists);
        setShakeAnimation(true);

        return;
      }

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className={style.registerPage}>
      <div className={style.illustrationSection}>
        <img src={group_of_people} className={style.illustration} alt="" />
      </div>
      <div>
        {isSubmitted ? (
          <div className={style.successMessage}>
            <h2>
              Registration successful! Check your email for a verification link.
            </h2>
          </div>
        ) : (
          <FormWrapper
            title="sign up for your buk klab"
            onSubmit={handleSubmit}
            className={clsx({ [style.shakeAnimation]: shakeAnimation })}
            redirectLinkText="Sign in"
            redirectText="Already have an account?"
            redirectTo="/signin"
            submitText="register"
          >
            <FormInput
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              error={errors.firstName}
              errorMessage={ERROR_MESSAGES.firstName}
              onChange={handleChange}
            />

            <FormInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              error={errors.lastName}
              errorMessage={ERROR_MESSAGES.lastName}
              onChange={handleChange}
            />

            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              error={errors.email}
              errorMessage={ERROR_MESSAGES.email}
              onChange={handleChange}
            />

            <FormInput
              type="password"
              name="password"
              placeholder="Choose your password"
              value={formData.password}
              error={errors.password}
              errorMessage={ERROR_MESSAGES.password}
              onChange={handleChange}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              errorMessage={ERROR_MESSAGES.passwordMatch}
              onChange={handleChange}
            />

            {emailErrorMessage && (
              <div className={style.emailExistsText}>{emailErrorMessage}</div>
            )}
          </FormWrapper>
        )}
      </div>
    </div>
  );
};
