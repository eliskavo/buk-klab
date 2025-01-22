export type ClubType = {
  id: number;
  name: string;
  description: string;
  clubImage: string;
  createdAt: string;
  ownerId: string;
  memberCount: number;
};

export type ClubWithMemberCount = ClubType & {
  members: [{ count: number }];
};

export type UpdateClubType = {
  name?: string;
  description?: string;
};
