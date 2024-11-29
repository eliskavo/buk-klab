import { Layout } from '../Layout/Layout';
import style from './NotFound.module.scss';

export const NotFound = () => (
  <Layout>
    <div className={style.notFound}>
      <h2>error</h2>
      <h1 className={style.notFoundHeading}>404</h1>
      <div className={style.pageNotFoundDescription}>
        This page took the wrong turn on the Road to Mordor...
      </div>
    </div>
  </Layout>
);
