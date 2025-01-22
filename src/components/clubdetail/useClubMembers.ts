import { useState, useEffect } from 'react';

import {
  getClubMembers,
  isUserClubMember,
  leaveClub,
} from '../../api/clubsMembers';
import { MemberType } from '../../model/Member';

export const useClubMembers = (clubId: number, userId: string | undefined) => {
  const [isMember, setIsMember] = useState(false);

  const [members, setMembers] = useState<MemberType[]>([]);

  const loadClubMembers = async () => {
    const membersData = await getClubMembers(clubId);
    setMembers(membersData);
  };

  useEffect(() => {
    if (!clubId) {
      return;
    }
    loadClubMembers();
  }, [clubId]);

  useEffect(() => {
    const checkMembership = async () => {
      if (userId) {
        const membershipStatus = await isUserClubMember(userId, clubId);
        setIsMember(membershipStatus);
      }
    };

    checkMembership();
  }, [userId, clubId]);

  const handleLeaveClub = async () => {
    if (!userId || !clubId) {
      return;
    }

    await leaveClub(userId, clubId);
    setIsMember(false);

    setMembers((prev) => prev.filter((member) => member.id !== userId));
  };

  return {
    members,
    isMember,
    handleLeaveClub,
    loadClubMembers,
  };
};
