import { Layout } from '../../components/Layout/Layout';
import girlHoldingBooks from '../../assets/images/girl_holding_books.png';
import style from './Members.module.scss';

export const Members: React.FC = () => (
  <Layout>
    <div className={style.section}>
      <div className={style.sectionLeft}>
        <h2 className={style.underlined}>our great members</h2>
        <span />
        <p className={style.description}>
          Our community is made up of book lovers from all walks of life. We
          have students, teachers, parents, and professionals who are passionate
          about reading and sharing their thoughts with others. Join us today
          and meet new friends who share your love for reading.
        </p>
      </div>
      <div className={style.sectionRight}>
        <img className={style.illustration} src={girlHoldingBooks} alt="" />
      </div>
    </div>
  </Layout>
);
