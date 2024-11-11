import { Link } from 'react-router-dom';

import { LinkButton } from '../LinkButton/LinkButton';
import style from './Navbar.module.scss';

export const Navbar: React.FC = () => (
  <nav className={style.navbar}>
    <div className={style.logo}>
      <Link to="/" className={style.navbarLink}>
        buk klab
      </Link>
    </div>
    <ul className={style.navbarList}>
      <li className={style.navbarItem}>
        <Link to="/books" className={style.navbarLink}>
          books
        </Link>
      </li>
      <li className={style.navbarItem}>
        <Link to="/members" className={style.navbarLink}>
          members
        </Link>
      </li>

      <li className={style.navbarItem}>
        <LinkButton to="/join" className={style.navbarLink}>
          join buk klab
        </LinkButton>
      </li>
    </ul>
  </nav>
);
