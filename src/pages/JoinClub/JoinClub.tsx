import { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout/Layout';
import { getClubs } from '../../api/clubsApi';
import { ClubType } from '../../model/Club';
import { ClubCard } from '../../components/ClubCard/ClubCard';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import style from './JoinClub.module.scss';

export const JoinClub = () => {
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
      <div className={style.joinHeader}>
        <h1>Join a book club</h1>
        <LinkButton to="/create-club" variant="primary">
          create a book club
        </LinkButton>
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
