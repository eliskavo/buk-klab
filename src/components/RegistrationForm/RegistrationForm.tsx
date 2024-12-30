import { useState, FormEvent, ChangeEvent, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { FormInput } from '../FormInput/FormInput';
import style from './RegistrationForm.module.scss';

const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const INITIAL_TOUCHED = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
};

type FormData = typeof INITIAL_FORM_DATA;
type TouchedFields = typeof INITIAL_TOUCHED;

const ERROR_MESSAGES = {
  firstName: 'First name cannot be empty or contain numbers',
  lastName: 'Last name cannot be empty or contain numbers',
  email: 'Please enter a valid email',
  password:
    'Password must have at least 8 characters, 1 uppercase letter and 1 number',
  passwordMatch: "Passwords don't match",
};

const validators = {
  name: (value: string): boolean => /^[^0-9]+$/.test(value) && value.length > 0,
  email: (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  password: (value: string): boolean =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
};

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [touched, setTouched] = useState<TouchedFields>(INITIAL_TOUCHED);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const formErrors = useMemo(
    () => ({
      firstName: touched.firstName && !validators.name(formData.firstName),
      lastName: touched.lastName && !validators.name(formData.lastName),
      email: touched.email && !validators.email(formData.email),
      password: touched.password && !validators.password(formData.password),
      confirmPassword:
        touched.confirmPassword &&
        formData.password !== formData.confirmPassword,
    }),
    [formData, touched],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (fieldName: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const isValid =
      validators.name(formData.firstName) &&
      validators.name(formData.lastName) &&
      validators.email(formData.email) &&
      validators.password(formData.password) &&
      formData.password === formData.confirmPassword;

    if (!isValid) {
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);

      return;
    }

    setIsSubmitted(true);
    formRef.current?.reset();
    setFormData(INITIAL_FORM_DATA);
    setTouched(INITIAL_TOUCHED);

    // eslint-disable-next-line no-console
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      {isSubmitted ? (
        <div className={style.successMessage}>
          <h2>registration successful!</h2>
          <p>
            you can now{' '}
            <Link to="/signin" className={style.signInLink}>
              sign{' '}
            </Link>
            in to your account
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={clsx(
            style.registrationFormCard,
            shakeAnimation && style.shakeAnimation,
          )}
          ref={formRef}
        >
          <div className={style.inputSection}>
            <h1 className={style.registrationTitle}>register to buk klab</h1>

            <FormInput
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              error={formErrors.firstName}
              errorMessage={ERROR_MESSAGES.firstName}
              onChange={handleChange}
              onBlur={() => handleBlur('firstName')}
            />

            <FormInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              error={formErrors.lastName}
              errorMessage={ERROR_MESSAGES.lastName}
              onChange={handleChange}
              onBlur={() => handleBlur('lastName')}
            />

            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              error={formErrors.email}
              errorMessage={ERROR_MESSAGES.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
            />

            <FormInput
              type="password"
              name="password"
              placeholder="Choose your password"
              value={formData.password}
              error={formErrors.password}
              errorMessage={ERROR_MESSAGES.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              error={formErrors.confirmPassword}
              errorMessage={ERROR_MESSAGES.passwordMatch}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
            />

            <button type="submit" className={style.registerButton}>
              register
            </button>

            <div className={style.signInSection}>
              Already have an account?{' '}
              <Link to="/signin" className={style.signInLink}>
                Sign in
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
