import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { ChildrenFC } from '../../utils/type';
import style from './Layout.module.scss';

export const Layout: ChildrenFC = ({ children }) => (
  <div className={style.pageContainer}>
    <div className={style.content}>
      <Navbar />
      <main className={style.mainContent}>{children}</main>
    </div>
    <Footer />
  </div>
);
