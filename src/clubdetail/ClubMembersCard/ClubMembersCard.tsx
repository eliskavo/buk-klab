import React, { useEffect, useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { deleteMember, viewClubMembers } from '../../api/clubsMembers';
import { MemberType } from '../../model/Member';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import style from './ClubMembersCard.module.scss';

type ClubMembersCardProps = {
  title: string;
  clubId: number;
  isOwner: boolean;
  ownerId: string;
  refreshTrigger: number;
};

export const ClubMembersCard: React.FC<ClubMembersCardProps> = ({
  title,
  clubId,
  isOwner,
  ownerId,
  refreshTrigger,
}) => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberType | null>(null);

  const loadClubMembers = async () => {
    const membersData = await viewClubMembers(clubId);
    setMembers(membersData);
  };

  const handleDeleteMember = (member: MemberType) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    loadClubMembers();
  }, [clubId, refreshTrigger]);

  const handleConfirmDelete = async () => {
    try {
      if (!memberToDelete) {
        return;
      }
      await deleteMember(String(memberToDelete.id), clubId);
      await loadClubMembers();
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className={`${style.card} ${style.memberCard}`}>
      <h2 className={`${style.cardTitle} ${style.memberCardTitle}`}>{title}</h2>
      <ul className={style.membersList}>
        {members.map((member) => (
          <li key={member.id} className={style.memberItem}>
            <div className={style.memberInfo}>
              <img
                src={member.profile_image}
                alt={member.firstname}
                className={style.memberImage}
              />
              <p>
                {member.firstname} {member.lastname}
              </p>
            </div>

            {isOwner && String(member.id) !== ownerId && (
              <button
                onClick={() => handleDeleteMember(member)}
                className={style.deleteButton}
                type="button"
                aria-label="delete member"
              >
                <DeleteRoundedIcon />
              </button>
            )}
          </li>
        ))}
      </ul>
      {members.length === 0 && <p>No members found in this book club</p>}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete member"
        message={`Are you sure you want to delete ${memberToDelete?.firstname ?? ''} ${memberToDelete?.lastname ?? ''}?`}
        closeButtonText="Cancel"
        confirmButtonText="Delete"
      />
    </div>
  );
};
