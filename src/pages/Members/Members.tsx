import { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout/Layout';
import girlHoldingBooks from '../../assets/images/girl_holding_books.png';
import mockMembers from '../../data/mockMembers.json';
import { getMembers } from '../../api/membersApi';
import style from './Members.module.scss';

export const Members: React.FC = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getMembers();
      setMembers(data);
    };

    getData();
  }, []);

  console.log(members);

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
          {mockMembers.map((member) => (
            <li key={member.id} className={style.member}>
              <img
                className={style.memberImg}
                src={member.img}
                alt={member.name}
              />
              <p className={style.memberName}>{member.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};
