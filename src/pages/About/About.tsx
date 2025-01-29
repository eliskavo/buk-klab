import { Layout } from '../../components/Layout/Layout';
import style from './About.module.scss';

export const About = () => (
  <Layout>
    <div className={style.pageSection}>
      <h1 className={style.text}>i wonder what is this page about?</h1>
    </div>
  </Layout>
);
