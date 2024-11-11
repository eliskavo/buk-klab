import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { ChildrenFC } from '../../utils/type';
import style from './Layout.module.scss';

export const Layout: ChildrenFC = ({ children }) => (
  <div className={style.pageContainer}>
    <Navbar />
    <div className={style.content}>{children}</div>
    <Footer />
  </div>
);
