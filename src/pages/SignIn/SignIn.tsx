import { Link } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import style from './SignIn.module.scss';

export const SignIn = () => (
  <Layout>
    <div className={style.pageSection}>
      <h2>functional login section hýr</h2>
      <p>
        Don't have an account?{' '}
        <Link to="/register" className={style.signUpLink}>
          Sign up
        </Link>{' '}
        here to join the amazing community of book lovers.
      </p>
    </div>
  </Layout>
);
