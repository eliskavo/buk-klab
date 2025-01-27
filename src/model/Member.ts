export type MemberType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  profile_image: string;
  bio?: string | null;
};

export type MembershipType = {
  memberId: string;
};
