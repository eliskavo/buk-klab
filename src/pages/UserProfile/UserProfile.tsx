import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import placeholder_member from '../../assets/images/placeholder_member.png';
import { MemberType } from '../../model/Member';
import { getMemberDetail, updateMember } from '../../api/membersApi';
import { MyClubsCard } from '../../components/userprofile/MyClubsCard/MyClubsCard';
import { UserProfileInfo } from '../../components/userprofile/UserProfileInfo/UserProfileInfo';
import { useAuth } from '../../context/AuthContext';
import { MemberCurrentlyReadingCard } from '../../components/userprofile/MembersCurrentlyReadingCard/MemberCurrentlyReadingCard';
import { NotFound } from '../../components/NotFound/NotFound';
import { Loading } from '../../components/Loading/Loading';
import style from './UserProfile.module.scss';

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAuth();

  const [memberDetail, setMemberDetail] = useState<MemberType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = user?.id === memberDetail?.id;

  useEffect(() => {
    const getMemberData = async () => {
      setIsLoading(true);

      if (id) {
        const membersData = await getMemberDetail(id);
        setMemberDetail(membersData);
      }

      setIsLoading(false);
    };

    getMemberData();
  }, [id]);

  const handleUpdate = async (updatedData: Partial<MemberType>) => {
    if (id) {
      const updatedMember = await updateMember(id, updatedData);
      setMemberDetail(updatedMember);
    }
  };

  if (!id) {
    return <NotFound />;
  }
  if (isLoading || !memberDetail) {
    return (
      <Layout>
        <Loading message="loading user profile" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={style.userProfilePage}>
        <div className={style.userBanner} />
        <div className={style.imageWrapper}>
          <div className={style.userImageCircle}>
            <img
              src={memberDetail.profile_image || placeholder_member}
              alt={`${memberDetail.firstname}'s profile'`}
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
            />
          </section>
        </div>
      </div>
    </Layout>
  );
};
