import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import { Loading } from '../../components/Loading/Loading';
import { getClubDetail, deleteClub, updateClub } from '../../api/clubsApi';
import { useAuth } from '../../context/AuthContext';
import { ClubType } from '../../model/Club';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { InviteMemberCard } from '../../components/clubdetail/InviteMemberCard/InviteMemberCard';
import { ClubMembersCard } from '../../components/clubdetail/ClubMembersCard/ClubMembersCard';
import { CurrentlyReadingCard } from '../../components/clubdetail/CurrentlyReadingCard/CurrentlyReadingCard';
import { useClubMembers } from '../../components/clubdetail/useClubMembers';
import { ClubDetailInfo } from '../../components/clubdetail/ClubDetailInfo/ClubDetailInfo';
import placeholder_club from '../../assets/images/placeholder_club.png';
import style from './ClubDetail.module.scss';

export const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAuth();
  const navigate = useNavigate();

  const [clubDetail, setClubDetail] = useState<ClubType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

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

  const handleLeave = () => {
    setIsLeaveDialogOpen(true);
  };

  const handleConfirmLeave = async () => {
    await handleLeaveClub();
    setIsLeaveDialogOpen(false);
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
          {isOwner ? (
            <div className={style.clubImageCircle}>
              <img
                src={clubDetail.clubImage || placeholder_club}
                alt={`${clubDetail.name} club`}
                className={style.editableClubImage}
              />
              <p className={style.edit}>edit</p>
            </div>
          ) : (
            <div className={style.clubImageCircle}>
              <img
                src={clubDetail.clubImage || placeholder_club}
                alt={`${clubDetail.name} club`}
                className={style.clubImage}
              />
            </div>
          )}
        </div>

        <div className={style.pageContent}>
          <ClubDetailInfo
            clubDetail={clubDetail}
            isOwner={isOwner}
            isMember={isMember}
            memberCount={memberCount}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onLeaveClub={handleLeave}
          />

          <section className={style.contentSection}>
            {isOwner && (
              <InviteMemberCard
                title="Invite Members"
                text="Invite your friends to join your book club and share your reading adventures with them."
                clubId={clubId}
                loadClubMembers={loadClubMembers}
              />
            )}

            <CurrentlyReadingCard
              title="Currently Reading"
              clubId={clubId}
              isOwner={isOwner}
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
        message="Are you sure you want to delete this club? :("
        closeButtonText="Cancel"
        confirmButtonText="Delete"
      />

      <ConfirmDialog
        isOpen={isLeaveDialogOpen}
        onClose={() => setIsLeaveDialogOpen(false)}
        onConfirm={handleConfirmLeave}
        title="Leave club"
        message="Are you sure you want to leave this club? :("
        closeButtonText="Cancel"
        confirmButtonText="Leave"
      />
    </Layout>
  );
};
