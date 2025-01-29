import { Layout } from '../../components/Layout/Layout';
import { Welcome } from '../../components/homepage/Welcome/Welcome';
import { HowDoesItWork } from '../../components/homepage/HowDoesItWork/HowDoesItWork';

export const Homepage = () => (
  <div>
    <Layout>
      <Welcome />
      <HowDoesItWork />
    </Layout>
  </div>
);
