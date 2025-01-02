import { useRef, FormEvent } from 'react';

import { Button } from '../Button/Button';
import { FormInput } from '../FormInput/FormInput';
import { FormWrapper } from '../FormWrapper/FormWrapper';

export const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const loginData = {
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ''),
    };

    // eslint-disable-next-line no-console
    console.log(loginData);
    formRef.current.reset();
  };

  return (
    <FormWrapper
      title="sign in to your buk klab account"
      onSubmit={handleSubmit}
      formRef={formRef}
      redirectText="Don't have an account?"
      redirectTo="/register"
      redirectLinkText="Sign up"
    >
      <FormInput type="email" name="email" placeholder="email" required />

      <FormInput
        type="password"
        name="password"
        placeholder="password"
        required
      />

      <Button variant="form" type="submit">
        sign in
      </Button>
    </FormWrapper>
  );
};
