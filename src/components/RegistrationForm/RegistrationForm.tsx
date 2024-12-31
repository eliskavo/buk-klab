import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import group_of_people from '../../assets/images/group_of_people.png';
import { FormInput } from '../FormInput/FormInput';
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
};

const validators = {
  name: (value: string): boolean => {
    if (value.length === 0) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (value[i] >= '0' && value[i] <= '9') {
        return false;
      }
    }

    return true;
  },
  email: (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  password: (value: string): boolean => {
    let hasUpperCase = false;
    let hasNumber = false;
    if (value.length < 8) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (value[i] >= '0' && value[i] <= '9') {
        hasNumber = true;
      }
      if (value[i] >= 'A' && value[i] <= 'Z') {
        hasUpperCase = true;
      }
    }

    return hasUpperCase && hasNumber;
  },
};

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldValidation = {
      firstName: () => !validators.name(value),
      lastName: () => !validators.name(value),
      email: () => !validators.email(value),
      password: () => ({
        password: !validators.password(value),
        confirmPassword: formData.confirmPassword !== value,
      }),
      confirmPassword: () => ({
        confirmPassword: value !== formData.password,
      }),
    };

    const fieldValidationResult =
      fieldValidation[name as keyof typeof fieldValidation]();

    setErrors((prev) => ({
      ...prev,
      ...(typeof fieldValidationResult === 'boolean'
        ? { [name]: fieldValidationResult }
        : fieldValidationResult),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      firstName: !validators.name(formData.firstName),
      lastName: !validators.name(formData.lastName),
      email: !validators.email(formData.email),
      password: !validators.password(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword,
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);

      return;
    }

    setIsSubmitted(true);

    // eslint-disable-next-line no-console
    console.log('Form submitted:', formData);
  };

  return (
    <div className={style.registerPage}>
      <div className={style.illustrationSection}>
        <img src={group_of_people} className={style.illustration} />
      </div>
      <div>
        {isSubmitted ? (
          <div className={style.successMessage}>
            <h2>registration successful!</h2>
            <p>
              you can now{' '}
              <Link to="/signin" className={style.signInLink}>
                sign in
              </Link>{' '}
              to your account
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={shakeAnimation ? style.shakeAnimation : ''}
          >
            <div className={style.inputSection}>
              <h1 className={style.registrationTitle}>register to buk klab</h1>

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
    </div>
  );
};
