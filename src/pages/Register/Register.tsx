import { Layout } from '../../components/Layout/Layout';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import style from './Register.module.scss';

export const Register = () => (
  <Layout>
    <div className={style.registerPage}>
      <RegistrationForm />
    </div>
  </Layout>
);
