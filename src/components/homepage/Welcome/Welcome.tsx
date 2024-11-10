import { Link } from 'react-router-dom';

import { Title, Heading1, Heading3 } from '../../Headings/Heading';
import { Button } from '../../Button/Button';
import style from './Welcome.module.scss';

export const Welcome = () => (
  <div className={style.welcome}>
    <section className={style.leftSection}>
      <div className={style.elementsSection}>
        <Heading3>Welcome to</Heading3>
        <Title>
          buk klab
          <span />
        </Title>
        <p className={style.description}>
          buk klab is a place where you can read books, discuss them with
          others, and meet new friends. We are a community of book lovers who
          are passionate about reading and sharing our thoughts with others.
          Join us today and start your reading journey with us!
        </p>
        <Link to="/join">
          <Button>join buk klab</Button>
        </Link>
      </div>
    </section>
    <div className={style.rightSection}>
      <Heading1>písmenka</Heading1>
    </div>
  </div>
);
