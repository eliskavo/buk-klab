import { Title, Heading1, Heading3 } from '../../Headings/Heading';
import { useAuth } from '../../../context/AuthContext';
import { LinkButton } from '../../LinkButton/LinkButton';
import style from './Welcome.module.scss';

export const Welcome: React.FC = () => {
  const { user } = useAuth();

  const firstName = user?.user_metadata?.first_name || '';

  return (
    <section className={style.welcome}>
      <div className={style.container}>
        <div className={style.leftSection}>
          <div className={style.elementsSection}>
            {user ? (
              <>
                <Heading3>Welcome back,</Heading3>
                <Title>{firstName}</Title>
              </>
            ) : (
              <>
                <Heading3>Welcome to</Heading3>
                <Title>buk klab</Title>
              </>
            )}

            <p className={style.description}>
              buk klab is a place where you can read books, discuss them with
              others, and meet new friends. We are a community of book lovers
              who are passionate about reading and sharing our thoughts with
              others. Join us today and start your reading journey with us!
            </p>
            <LinkButton to="/joinclub" className={style.ctaButton}>
              join buk klab
            </LinkButton>
          </div>
        </div>

        <div className={style.rightSection}>
          <Heading1>písmenka</Heading1>
        </div>
      </div>
    </section>
  );
};
