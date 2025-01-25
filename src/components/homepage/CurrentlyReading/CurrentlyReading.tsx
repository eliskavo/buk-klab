import { Heading2 } from '../../Headings/Heading';
import { HomepageSection } from '../HomepageSection/HomepageSection';
import style from './CurrentlyReading.module.scss';

export const CurrentlyReading = () => (
  <HomepageSection className={style.section}>
    <Heading2>what are we currently reading?</Heading2>
  </HomepageSection>
);
