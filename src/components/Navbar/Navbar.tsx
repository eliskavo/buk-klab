import { Link } from 'react-router-dom';

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
        <Link to="/about" className={style.navbarLink}>
          about
        </Link>
      </li>
      <li className={style.navbarItem}>
        <Link to="/signin" className={style.navbarLink}>
          sign in
        </Link>
      </li>
      <li className={style.navbarItem}>
        <Link to="/join" className={style.navbarLink}>
          <button type="button" className={style.navbarButton}>
            join buk klab
          </button>
        </Link>
      </li>
    </ul>
  </nav>
);
