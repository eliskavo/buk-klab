import { useState, FormEvent, ChangeEvent } from 'react';

import style from './RegistrationForm.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface TouchedFields {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState<TouchedFields>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [shake, setShake] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateName = (name: string): boolean =>
    /^[^0-9]+$/.test(name) && name.length > 0;

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    return regex.test(password);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid =
      validateName(formData.firstName) &&
      validateName(formData.lastName) &&
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword;

    if (!isValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);

      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true,
      });

      return;
    }

    setIsSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setTouched({
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirmPassword: false,
    });

    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`${style.registrationFormCard} ${shake ? style.shake : ''}`}
      >
        <div className={style.inputSection}>
          <h1 className={style.registrationTitle}>register to buk klab</h1>

          <div className={style.inputWrapper}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={`${style.input} ${touched.firstName && !validateName(formData.firstName) ? style.error : ''}`}
              value={formData.firstName}
              onChange={handleChange}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, firstName: true }))
              }
            />
            {touched.firstName && !validateName(formData.firstName) && (
              <p className={style.errorText}>
                First name cannot be empty or contain numbers
              </p>
            )}
          </div>

          <div className={style.inputWrapper}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={`${style.input} ${touched.lastName && !validateName(formData.lastName) ? style.error : ''}`}
              value={formData.lastName}
              onChange={handleChange}
              onBlur={() => setTouched((prev) => ({ ...prev, lastName: true }))}
            />
            {touched.lastName && !validateName(formData.lastName) && (
              <p className={style.errorText}>
                Last name cannot be empty or contain numbers
              </p>
            )}
          </div>

          <div className={style.inputWrapper}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`${style.input} ${touched.email && !validateEmail(formData.email) ? style.error : ''}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            />
            {touched.email && !validateEmail(formData.email) && (
              <p className={style.errorText}>Please enter a valid email</p>
            )}
          </div>

          <div className={style.inputWrapper}>
            <input
              type="password"
              name="password"
              placeholder="Choose your password"
              className={`${style.input} ${touched.password && !validatePassword(formData.password) ? style.error : ''}`}
              value={formData.password}
              onChange={handleChange}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            />
            {touched.password && !validatePassword(formData.password) && (
              <p className={style.errorText}>
                Password must have at least 8 characters, 1 uppercase letter and
                1 number
              </p>
            )}
          </div>

          <div className={style.inputWrapper}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className={`${style.input} ${touched.confirmPassword && formData.password !== formData.confirmPassword ? style.error : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
            />
            {touched.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className={style.errorText}>Passwords don't match</p>
              )}
          </div>

          {isSubmitted ? (
            <div className={style.successMessage}>Registration successful!</div>
          ) : (
            <button type="submit" className={style.registerButton}>
              register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
