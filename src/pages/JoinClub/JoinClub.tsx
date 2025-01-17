import { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout/Layout';
import { getClubs, getClubMembers } from '../../api/clubsApi';
import { ClubType } from '../../model/Club';
import { ClubCard } from '../../components/ClubCard/ClubCard';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import style from './JoinClub.module.scss';

export const JoinClub = () => {
  const [clubs, setClubs] = useState<ClubType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const clubsData = await getClubs();

      const clubsWithMembers = await Promise.all(
        clubsData.map(async (club) => {
          const { count } = await getClubMembers(club.id);

          return { ...club, memberCount: count ?? 0 };
        }),
      );
      setClubs(clubsWithMembers);
    };

    getData();
  }, []);

  return (
    <Layout>
      <div className={style.joinHeader}>
        <h1>Join a book club</h1>
        <LinkButton to="/create-club">create a book club</LinkButton>
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
