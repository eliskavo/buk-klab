import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import style from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={style.pageContainer}>
    <Navbar />
    <div className={style.content}>{children}</div>
    <Footer />
  </div>
);
