import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

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
      const clubData = await getClubDetail(Number(id));

      setClubDetail(clubData);
    };

    fetchClubDetail();
  }, [id]);

  const handleDelete = async () => {
    const isDeletionConfirmed = window.confirm(
      'Are you sure you want to delete this club?',
    );

    if (isDeletionConfirmed) {
      await deleteClub(Number(id));

      navigate('/joinclub');
    }
  };

  const handleUpdate = async (updatedData: Partial<ClubType>) => {
    await updateClub(Number(id), updatedData);
    const clubData = await getClubDetail(Number(id));
    setClubDetail(clubData);
  };

  if (!clubDetail) {
    return (
      <Layout>
        <Loading message="Loading book club details" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={style.clubDetailPage}>
        <div className={style.clubBanner} />
        <div className={style.imageWrapper}>
          <div className={style.clubImageCircle}>
            <img
              src={clubDetail.clubImage || placeholder_club}
              alt={`${clubDetail.name} club`}
              className={style.clubImage}
            />
          </div>
        </div>

        <div className={style.pageContent}>
          {user?.id === clubDetail.ownerId ? (
            <section className={style.infoSection}>
              <EditableField
                type="text"
                value={clubDetail.name}
                handleSave={(newValue) => {
                  handleUpdate({ name: newValue });
                }}
              >
                <h1 className={style.title}>{clubDetail.name}</h1>
              </EditableField>

              <EditableField
                type="textarea"
                value={clubDetail.description}
                handleSave={(newValue) => {
                  handleUpdate({ description: newValue });
                }}
              >
                <p className={style.description}>{clubDetail.description}</p>
              </EditableField>

              <button
                type="button"
                onClick={handleDelete}
                className={style.deleteButton}
                aria-label="delete club"
              >
                <DeleteRoundedIcon />
              </button>
            </section>
          ) : (
            <section className={style.infoSection}>
              <div className={style.editableContent}>
                <h1 className={style.notEditableTitle}>{clubDetail.name}</h1>
                <p className={style.description}>{clubDetail.description}</p>
              </div>
            </section>
          )}

          <section className={style.contentSection}>
            <div className={`${style.card} ${style.inviteCard}`}>
              <h2 className={`${style.cardTitle} ${style.inviteCardTitle}`}>
                Invite Members
              </h2>
              <p className={`${style.cardText} ${style.inviteCardText}`}>
                Grow your book club by inviting new members
              </p>
            </div>
            <div className={`${style.card} ${style.readingCard}`}>
              <h2 className={style.cardTitle}>Currently Reading</h2>
              <p className={style.cardText}>No book selected</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};
