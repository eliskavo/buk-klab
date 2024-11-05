import { Welcome } from './sections/Welcome/Welcome';
import { HowDoesItWork } from './sections/HowDoesItWork/HowDoesItWork';
import { CurrentlyReading } from './sections/CurrentlyReading/CurrentlyReading';
import { UpcomingEvents } from './sections/UpcomingEvents/UpcomingEvents';
import { Testimonials } from './sections/Testimonials/Testimonials';
export const Homepage = () => (
  <div>
    <Welcome />
    <HowDoesItWork />
    <CurrentlyReading />
    <UpcomingEvents />
    <Testimonials />
  </div>
);
