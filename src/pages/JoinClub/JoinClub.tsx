import { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout/Layout';
import { getClubs } from '../../api/clubsApi';
import { ClubType } from '../../model/Club';
import { ClubCard } from '../../components/ClubCard/ClubCard';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import group_readers from '../../assets/images/group_readers.png'; // Add your image
import style from './JoinClub.module.scss';

export const JoinClub: React.FC = () => {
  const [clubs, setClubs] = useState<ClubType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const clubsData = await getClubs();
      setClubs(clubsData);
    };

    getData();
  }, []);

  return (
    <Layout>
      <div className={style.bannerWrapper}>
        <div className={style.contentSection}>
          <h1 className={style.bannerTitle}>
            Build your own reading community{' '}
          </h1>
          <p className={style.bannerSubtitle}>
            Manage, start, or join a book club with ease.
          </p>
          <LinkButton
            to="/signin"
            variant="primary"
            className={style.bannerButton}
          >
            create a club
          </LinkButton>
        </div>
        <div className={style.imageSection}>
          <img src={group_readers} alt="" className={style.bannerImage} />
        </div>
      </div>

      <div className={style.container}>
        <h2 className={style.title}>book clubs in our community</h2>
        <ul className={style.clubsList} aria-label="Clubs list">
          {clubs.map((club) => (
            <li key={club.id}>
              <ClubCard club={club} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};
