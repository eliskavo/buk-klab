import { useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { FormInput } from '../FormInput/FormInput';
import style from './LoginForm.module.scss';

export const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const loginData = {
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    };

    // eslint-disable-next-line no-console
    console.log(loginData);
  };

  return (
    <div className={style.loginSection}>
      <form onSubmit={handleSubmit} className={style.loginForm} ref={formRef}>
        <h1 className={style.signInTitle}>sign in to your buk klab account</h1>
        <FormInput type="email" name="email" placeholder="email" required />

        <FormInput
          type="password"
          name="password"
          placeholder="password"
          required
        />

        <button type="submit" className={style.signInButton}>
          sign in
        </button>
      </form>

      <p className={style.signUpText}>
        Don't have an account?{' '}
        <Link to="/register" className={style.signUpLink}>
          Sign up
        </Link>{' '}
        here to join the amazing community of book lovers.
      </p>
    </div>
  );
};
