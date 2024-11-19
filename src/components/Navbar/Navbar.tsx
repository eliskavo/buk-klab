import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { LinkButton } from '../LinkButton/LinkButton';
import style from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={style.navbar}>
      <NavLink to="/" className={style.logo}>
        buk klab
      </NavLink>
      <button className={style.hamburger} onClick={toggleMenu}>
        {isOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
      </button>
      <ul className={`${style.navbarList} ${isOpen ? style.open : ''}`}>
        <li className={style.navbarItem}>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? `${style.navbarLink} ${style.active}`
                : style.navbarLink
            }
          >
            books
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive
                ? `${style.navbarLink} ${style.active}`
                : style.navbarLink
            }
          >
            members
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `${style.navbarLink} ${style.active}`
                : style.navbarLink
            }
          >
            about
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive
                ? `${style.navbarLink} ${style.active}`
                : style.navbarLink
            }
          >
            sign in
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          <LinkButton
            to="/join"
            className={`${style.navbarLink} ${style.navbarButton}`}
          >
            join buk klab
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
};
