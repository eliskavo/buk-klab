import { Link } from 'react-router-dom';

import style from './Navbar.module.scss';

export const Navbar: React.FC = () => (
  <nav className={style.nav}>
    <div className={style.logo}>
      <Link to="/">buk klab</Link>
    </div>
    <ul>
      <li>
        <Link to="/books">books</Link>
      </li>
      <li>
        <Link to="/members">members</Link>
      </li>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link to="/signin">sign in</Link>
      </li>
      <button type="button" className="button">
        join buk klab
      </button>
    </ul>
  </nav>
);
