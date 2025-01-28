import React, { useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

import { leaveClub } from '../../../api/clubsMembers';
import { MemberType } from '../../../model/Member';
import { ConfirmDialog } from '../../../components/ConfirmDialog/ConfirmDialog';
import { ClubDetailCardWrapper } from '../ClubDetailCardWrapper/ClubDetailCardWrapper';
import style from './ClubMembersCard.module.scss';

type ClubMembersCardProps = {
  title: string;
  clubId: number;
  isOwner: boolean;
  ownerId: string;
  members: MemberType[];
  loadClubMembers: () => Promise<void>;
};

export const ClubMembersCard: React.FC<ClubMembersCardProps> = ({
  title,
  clubId,
  isOwner,
  ownerId,
  members,
  loadClubMembers,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberType | null>(null);

  const handleDeleteMember = (member: MemberType) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!memberToDelete) {
        return;
      }
      await leaveClub(String(memberToDelete.id), clubId);
      await loadClubMembers();
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <ClubDetailCardWrapper title={title}>
      <ul className={style.membersList}>
        {members.map((member) => (
          <li key={member.id} className={style.memberItem}>
            <Link to={`/member/${member.id}`} className={style.memberLink}>
              <div className={style.memberInfo}>
                <img
                  src={member.profile_image}
                  alt={member.firstname}
                  className={style.memberImage}
                />
                <p className={style.memberName}>
                  {member.firstname} {member.lastname}
                  {member.id === ownerId && (
                    <Tooltip title="Owner">
                      <StarsRoundedIcon area-label="owner" />
                    </Tooltip>
                  )}
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
            </Link>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove member"
        message={
          memberToDelete
            ? `Are you sure you want to remove ${memberToDelete.firstname} ${memberToDelete.lastname}?`
            : ''
        }
        closeButtonText="Cancel"
        confirmButtonText="Remove"
      />
    </ClubDetailCardWrapper>
  );
};
