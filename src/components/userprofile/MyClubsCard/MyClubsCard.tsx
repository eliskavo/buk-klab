import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ClubType } from '../../../model/Club';
import { ClubDetailCardWrapper } from '../../clubdetail/ClubDetailCardWrapper/ClubDetailCardWrapper';
import { getClubsByMember } from '../../../api/membersApi';
import { Loading } from '../../Loading/Loading';
import placeholder_club from '../../../assets/images/placeholder_club.png';
import style from './MyClubsCard.module.scss';

type MyClubsCardProps = {
  title: string;
  userId: string;
};

export const MyClubsCard: React.FC<MyClubsCardProps> = ({ title, userId }) => {
  const [clubs, setClubs] = useState<ClubType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      try {
        const clubsData = await getClubsByMember(userId);
        setClubs(clubsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, [userId]);

  return (
    <ClubDetailCardWrapper title={title}>
      <div>
        {isLoading && <Loading message="loading clubs" />}

        {!clubs.length && <p>No clubs joined yet</p>}

        <ul className={style.clubsList}>
          {clubs.map((club) => (
            <li key={club.id} className={style.clubItem}>
              <div className={style.clubContent}>
                <Link to={`/clubs/${club.id}`} className={style.clubInfo}>
                  <img
                    src={club.clubImage || placeholder_club}
                    alt={club.name}
                    className={style.clubImage}
                  />
                  <div>
                    <h1 className={style.clubName}>{club.name}</h1>
                    <p className={style.description}>{club.description}</p>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ClubDetailCardWrapper>
  );
};
