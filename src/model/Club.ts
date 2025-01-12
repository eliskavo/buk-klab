export type ClubType = {
  id: number;
  name: string;
  description: string;
  clubImage: string;
  createdAt: string;
  ownerId: string;
};

export type UpdateClubType = {
  name?: string;
  description?: string;
};
