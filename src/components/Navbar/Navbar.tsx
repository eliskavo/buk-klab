import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import clsx from 'clsx';

import { useAuth } from '../../context/AuthContext';
import { LinkButton } from '../LinkButton/LinkButton';
import style from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { signOut, user } = useAuth();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className={style.navbar}>
      <NavLink to="/" className={style.logo}>
        buk klab
      </NavLink>
      <button className={style.hamburger} onClick={toggleMenu}>
        {isOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
      </button>
      <ul className={clsx(style.navbarList, { [style.open]: isOpen })}>
        <li className={style.navbarItem}>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? clsx(style.navbarLink, style.active) : style.navbarLink
            }
          >
            books
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive ? clsx(style.navbarLink, style.active) : style.navbarLink
            }
          >
            members
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? clsx(style.navbarLink, style.active) : style.navbarLink
            }
          >
            about
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          {user ? (
            <button
              onClick={handleSignOut}
              className={style.signOutButton}
              type="button"
            >
              sign out
            </button>
          ) : (
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive
                  ? clsx(style.navbarLink, style.active)
                  : style.navbarLink
              }
            >
              sign in
            </NavLink>
          )}
        </li>
        <li className={style.navbarItem}>
          <LinkButton
            to="/joinclub"
            className={clsx(style.navbarLink, style.navbarButton)}
          >
            join buk klab
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
};
