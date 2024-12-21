import { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout/Layout';
import girlHoldingBooks from '../../assets/images/girl_holding_books.png';
import { getMembers } from '../../api/membersApi';
import { MemberType } from '../../model/Member';
import style from './Members.module.scss';

export const Members: React.FC = () => {
  const [members, setMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getMembers();
      setMembers(data);
    };

    getData();
  }, []);

  const formatName = (firstName: string, lastName: string) =>
    `${firstName} ${lastName.charAt(0)}.`;

  return (
    <Layout>
      <section className={style.section}>
        <div className={style.sectionHeader}>
          <div className={style.sectionLeft}>
            <h1 className={style.underlined}>our great members</h1>
            <p className={style.description}>
              Our community is made up of book lovers from all walks of life. We
              have students, teachers, parents, and professionals who are
              passionate about reading and sharing their thoughts with others.
              Join us today and meet new friends who share your love for
              reading.
            </p>
          </div>
          <div className={style.sectionRight}>
            <img className={style.illustration} src={girlHoldingBooks} alt="" />
          </div>
        </div>
        <ul className={style.sectionMembers} aria-label="Member list">
          {members.map((member) => (
            <li key={member.id} className={style.member}>
              <img
                className={style.memberImg}
                src={member.profileImage}
                alt={member.firstName}
              />
              <p className={style.memberName}>
                {formatName(member.firstName, member.lastName)}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};
