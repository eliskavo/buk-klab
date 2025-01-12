import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import { Loading } from '../../components/Loading/Loading';
import { getClubDetail, deleteClub, updateClub } from '../../api/clubsApi';
import { useAuth } from '../../context/AuthContext';
import { ClubType } from '../../model/Club';
import placeholder_club from '../../assets/images/placeholder_club.png';
import { EditableField } from '../../components/EditableField/EditableField';
import style from './ClubDetail.module.scss';

export const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuth();

  const [clubDetail, setClubDetail] = useState<ClubType | null>(null);

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

  const handleUpdate = async (updatedData: Partial<ClubType>) => {
    try {
      await updateClub(Number(id), updatedData);
      const clubData = await getClubDetail(Number(id));
      setClubDetail(clubData);
    } catch (error) {
      console.error('ClubDetail error:', error);
    }
  };

  return (
    <Layout>
      {!clubDetail ? (
        <Loading message="Loading book club details..." />
      ) : (
        <div className={style.clubDetailPage}>
          <div className={style.imageWrapper}>
            <img
              src={clubDetail.clubImage || placeholder_club}
              alt={`${clubDetail.name} club`}
              className={style.clubImage}
            />
          </div>

          {user?.id === clubDetail.ownerId ? (
            <div>
              <EditableField
                value={clubDetail.name}
                handleSave={(newValue) => {
                  handleUpdate({ name: newValue });
                }}
              >
                <h1 className={style.title}>{clubDetail.name}</h1>
              </EditableField>

              <EditableField
                value={clubDetail.description}
                handleSave={(newValue) => {
                  handleUpdate({ description: newValue });
                }}
              >
                <p className={style.description}>{clubDetail.description}</p>
              </EditableField>
            </div>
          ) : (
            <div>
              <h1 className={style.title}>{clubDetail.name}</h1>
              <p className={style.description}>{clubDetail.description}</p>
            </div>
          )}

          <p>members: </p>
          {user?.id === clubDetail.ownerId && (
            <button
              type="button"
              onClick={handleDelete}
              className={style.deleteButton}
            >
              delete
            </button>
          )}
        </div>
      )}
    </Layout>
  );
};
