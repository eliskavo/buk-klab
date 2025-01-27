import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import placeholder_club from '../../assets/images/placeholder_club.png';
import { MemberType } from '../../model/Member';
import { getMemberDetail, updateMember } from '../../api/membersApi';
import { MyClubsCard } from '../../components/userprofile/MyClubsCard/MyClubsCard';
import { UserProfileInfo } from '../../components/userprofile/UserProfileInfo/UserProfileInfo';
import { useAuth } from '../../context/AuthContext';
import { MemberCurrentlyReadingCard } from '../../components/userprofile/MembersCurrentlyReadingCard/MemberCurrentlyReadingCard';
import { NotFound } from '../../components/NotFound/NotFound';
import style from './UserProfile.module.scss';

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAuth();

  const [memberDetail, setMemberDetail] = useState<MemberType | null>(null);

  const isOwner = user?.id === memberDetail?.id;

  useEffect(() => {
    const getMemberData = async () => {
      if (id) {
        const membersData = await getMemberDetail(id);
        setMemberDetail(membersData || null);
      }
    };

    getMemberData();
  }, [id]);

  const handleUpdate = async (updatedData: Partial<MemberType>) => {
    if (id) {
      const updatedMember = await updateMember(id, updatedData);
      setMemberDetail(updatedMember || null);
    }
  };

  if (!memberDetail) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className={style.userProfilePage}>
        <div className={style.userBanner} />
        <div className={style.imageWrapper}>
          <div className={style.userImageCircle}>
            <img
              src={memberDetail.profile_image || placeholder_club}
              alt={`${memberDetail.firstname} club`}
              className={style.memberImage}
            />
          </div>
        </div>

        <div className={style.pageContent}>
          <UserProfileInfo
            memberDetails={memberDetail}
            isOwner={isOwner}
            onUpdate={handleUpdate}
          />
          <section className={style.contentSection}>
            <MyClubsCard title="My clubs" userId={memberDetail.id} />

            <MemberCurrentlyReadingCard
              title="Currently reading"
              userId={memberDetail.id}
              isOwner={isOwner}
            />
          </section>
        </div>
      </div>
    </Layout>
  );
};
