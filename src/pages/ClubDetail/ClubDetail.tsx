import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import { Loading } from '../../components/Loading/Loading';
import { getClubDetail, deleteClub } from '../../api/clubsApi';
import { useAuth } from '../../context/AuthContext';
import { ClubType } from '../../model/Club';
import style from './ClubDetail.module.scss';

export const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuth();

  const [clubDetail, setClubDetail] = useState<ClubType | null>(null);

  const handleDelete = async () => {
    try {
      const isDeletionConfirmed = window.confirm(
        'Are you sure you want to delete this club?',
      );

      if (isDeletionConfirmed) {
        await deleteClub(Number(id));

        navigate('/joinclub');
      }
    } catch (error) {
      console.error('Error deleting club:', error);
    }
  };

  useEffect(() => {
    const fetchClubDetail = async () => {
      try {
        const clubData = await getClubDetail(Number(id));

        setClubDetail(clubData);
      } catch (error) {
        console.error('Error getting club detail:', error);
      }
    };

    fetchClubDetail();
  }, [id]);

  return (
    <Layout>
      <div>
        {clubDetail ? (
          <div className={style.clubDetailPage}>
            <h1 className={style.title}>{clubDetail.name}</h1>
            <p className={style.description}>{clubDetail.description}</p>
            <p>members: </p>
            {user?.id === String(clubDetail.ownerId) ? (
              <button
                type="button"
                onClick={handleDelete}
                className={style.deleteButton}
              >
                delete
              </button>
            ) : null}
          </div>
        ) : (
          <Loading message="loading club" />
        )}
      </div>
    </Layout>
  );
};
