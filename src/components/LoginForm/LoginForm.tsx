import { useRef, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInput } from '../FormInput/FormInput';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import { getSupabaseClient } from '../../api/supabase';

const ERROR_MESSAGES = {
  email: 'Invalid e-mail or password',
};

export const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');

    if (!formRef.current) {
      return;
    }

    try {
      const { error } = await getSupabaseClient().auth.signInWithPassword({
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      });

      if (error) {
        throw error;
      }

      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      setErrorMessage(ERROR_MESSAGES.email);
    }
  };

  return (
    <FormWrapper
      title="sign in to your buk klab account"
      onSubmit={handleSubmit}
      formRef={formRef}
      redirectText="Don't have an account?"
      redirectTo="/register"
      redirectLinkText="Sign up"
      submitText="sign in"
    >
      <FormInput
        type="email"
        name="email"
        placeholder="email"
        required
        error={errorMessage !== ''}
        errorMessage={errorMessage}
      />

      <FormInput
        type="password"
        name="password"
        placeholder="password"
        required
      />
    </FormWrapper>
  );
};
