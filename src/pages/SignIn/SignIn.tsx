import { Layout } from '../../components/Layout/Layout';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import style from './SignIn.module.scss';

export const SignIn = () => (
  <Layout>
    <div className={style.pageSection}>
      <LoginForm />
    </div>
  </Layout>
);
