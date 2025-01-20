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
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { InviteMemberCard } from '../../components/clubdetail/InviteMemberCard/InviteMemberCard';
import { ClubMembersCard } from '../../components/clubdetail/ClubMembersCard/ClubMembersCard';
import { CurrentlyReadingCard } from '../../components/clubdetail/CurrentlyReadingCard/CurrentlyReadingCard';
import { useClubMembers } from '../../components/clubdetail/useClubMembers';
import style from './ClubDetail.module.scss';

export const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuth();

  const [clubDetail, setClubDetail] = useState<ClubType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const clubId = Number(id);
  const isOwner = user?.id === clubDetail?.ownerId;

  const { members, isMember, handleLeaveClub, loadClubMembers } =
    useClubMembers(clubId, user?.id);

  useEffect(() => {
    const fetchClubDetail = async () => {
      const clubData = await getClubDetail(clubId);

      setClubDetail(clubData);
    };

    fetchClubDetail();
  }, [id]);

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteClub(clubId);
    setIsDeleteDialogOpen(false);
    navigate('/joinclub');
  };

  const handleUpdate = async (updatedData: Partial<ClubType>) => {
    const updatedClub = await updateClub(clubId, updatedData);

    setClubDetail(updatedClub);
  };

  if (!clubDetail) {
    return (
      <Layout>
        <Loading message="Loading book club details" />
      </Layout>
    );
  }

  const memberCount = members.length;

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
          {isOwner ? (
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
                <p className={style.memberCount}>
                  {memberCount} {memberCount === 1 ? 'member' : 'members'}
                </p>
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
                <p className={style.description}>{clubDetail.description}</p>

                {isMember && (
                  <button
                    onClick={handleLeaveClub}
                    type="button"
                    className={style.leaveButton}
                    aria-label="leave club"
                  >
                    leave club
                  </button>
                )}
              </div>
            </section>
          )}

          <section className={style.contentSection}>
            {clubDetail.ownerId === user?.id && (
              <InviteMemberCard
                title="Invite Members"
                text="Invite your friends to join your book club and share your reading adventures with them."
                clubId={clubId}
                loadClubMembers={loadClubMembers}
              />
            )}

            <CurrentlyReadingCard
              title="Currently Reading"
              text="No book selected"
            />

            <ClubMembersCard
              title="Members"
              clubId={clubId}
              isOwner={isOwner}
              ownerId={clubDetail.ownerId}
              members={members}
              loadClubMembers={loadClubMembers}
            />
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
