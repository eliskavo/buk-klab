import { Heading2 } from '../../Headings/Heading';
import { HomepageSection } from '../HomepageSection/HomepageSection';
import style from './UpcomingEvents.module.scss';

export const UpcomingEvents = () => (
  <HomepageSection className={style.section}>
    <Heading2>upcoming events</Heading2>
  </HomepageSection>
);
