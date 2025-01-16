import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import clsx from 'clsx';

import { Layout } from '../../components/Layout/Layout';
import { Loading } from '../../components/Loading/Loading';
import {
  getClubDetail,
  deleteClub,
  updateClub,
  joinClub,
  isUserClubMember,
  leaveClub,
  getClubMembers,
} from '../../api/clubsApi';
import { useAuth } from '../../context/AuthContext';
import { ClubType } from '../../model/Club';
import placeholder_club from '../../assets/images/placeholder_club.png';
import { EditableField } from '../../components/EditableField/EditableField';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import style from './ClubDetail.module.scss';

export const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuth();

  const [clubDetail, setClubDetail] = useState<ClubType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [memberCount, setMemberCount] = useState<number>(0);

  useEffect(() => {
    const fetchClubDetail = async () => {
      const clubData = await getClubDetail(Number(id));

      setClubDetail(clubData);
    };

    fetchClubDetail();
  }, [id]);

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteClub(Number(id));
    setIsDeleteDialogOpen(false);
    navigate('/joinclub');
  };

  useEffect(() => {
    const fetchMemberCount = async () => {
      if (id) {
        const { count } = await getClubMembers(Number(id));
        setMemberCount(count ?? 0);
      }
    };

    fetchMemberCount();
  }, [id]);

  useEffect(() => {
    const checkMembership = async () => {
      if (user) {
        const membershipStatus = await isUserClubMember(user.id, Number(id));
        setIsMember(membershipStatus);
      }
    };

    checkMembership();
  }, [user, id]);

  const handleMembership = async () => {
    if (!user) {
      return;
    }

    try {
      await (isMember
        ? leaveClub(user.id, Number(id))
        : joinClub(user.id, Number(id)));

      setIsMember(!isMember);

      const { count } = await getClubMembers(Number(id));
      setMemberCount(count ?? 0);
    } catch (error) {
      console.error('Error handling membership:', error);
    }
  };

  const handleUpdate = async (updatedData: Partial<ClubType>) => {
    const updatedClub = await updateClub(Number(id), updatedData);

    setClubDetail(updatedClub);
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
                <p className={style.memberCount}>{memberCount} members</p>
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
                <p className={style.memberCount}>{memberCount} members</p>
                <button
                  onClick={handleMembership}
                  type="button"
                  className={clsx(style.joinButton, {
                    [style.leaveButton]: isMember,
                  })}
                  aria-label={isMember ? 'leave club' : 'join club'}
                >
                  {isMember ? 'leave club' : 'join club'}
                </button>
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

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete club"
        message="Are you sure you want to delete this club?"
        closeButtonText="Cancel"
        confirmButtonText="Delete"
      />
    </Layout>
  );
};
