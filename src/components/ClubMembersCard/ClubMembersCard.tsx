import React, { useEffect, useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { deleteMember, viewClubMembers } from '../../api/clubsMembers';
import { MemberType } from '../../model/Member';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import style from './ClubMembersCard.module.scss';

type ClubMembersCardProps = {
  title: string;
  clubId: number;
  isOwner: boolean;
  ownerId: string;
};

export const ClubMembersCard: React.FC<ClubMembersCardProps> = ({
  title,
  clubId,
  isOwner,
  ownerId,
}) => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!clubId) {
        return;
      }

      const membersData = await viewClubMembers(clubId);
      setMembers(membersData);
    };

    getData();
  }, [clubId]);

  const handleDeleteMember = async (memberId: string) => {
    setMemberToDelete(memberId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!memberToDelete) {
        return;
      }

      await deleteMember(memberToDelete, clubId);
      const updatedMembers = await viewClubMembers(clubId);
      setMembers(updatedMembers);
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
                onClick={() => handleDeleteMember(String(member.id))}
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
        message="Are you sure you want to delete this member?"
        closeButtonText="Cancel"
        confirmButtonText="Delete"
      />
    </div>
  );
};
