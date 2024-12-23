import { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout/Layout';
import { getClubs } from '../../api/clubsApi';
import { ClubType } from '../../model/Club';
import { ClubCard } from '../../components/ClubCard/ClubCard';
import style from './JoinClub.module.scss';

export const JoinClub = () => {
  const [clubs, setClubs] = useState<ClubType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getClubs();
      setClubs(data);
    };

    getData();
  }, []);

  return (
    <Layout>
      <h1>Join a book club</h1>
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
