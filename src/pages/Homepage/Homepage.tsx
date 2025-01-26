import { Layout } from '../../components/Layout/Layout';
import { Welcome } from '../../components/homepage/Welcome/Welcome';
import { HowDoesItWork } from '../../components/homepage/HowDoesItWork/HowDoesItWork';
import { CurrentlyReading } from '../../components/homepage/CurrentlyReading/CurrentlyReading';
import { UpcomingEvents } from '../../components/homepage/UpcomingEvents/UpcomingEvents';

export const Homepage = () => (
  <div>
    <Layout>
      <Welcome />
      <HowDoesItWork />
      <CurrentlyReading />
      <UpcomingEvents />
    </Layout>
  </div>
);
