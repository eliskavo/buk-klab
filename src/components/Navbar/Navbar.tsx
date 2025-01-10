import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import clsx from 'clsx';

import { useAuth } from '../../context/AuthContext';
import { getSupabaseClient } from '../../api/supabase';
import { LinkButton } from '../LinkButton/LinkButton';
import style from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = useAuth();
  const firstName = user?.user_metadata?.first_name || '';

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? clsx(style.navbarLink, style.active) : style.navbarLink;

  const handleSignOut = async () => {
    try {
      const { error } = await getSupabaseClient().auth.signOut();

      if (error) {
        throw error;
      }

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
          <NavLink to="/books" className={getNavLinkStyle}>
            books
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          <NavLink to="/members" className={getNavLinkStyle}>
            members
          </NavLink>
        </li>
        <li className={style.navbarItem}>
          <NavLink to="/about" className={getNavLinkStyle}>
            about
          </NavLink>
        </li>
        {user ? null : (
          <li className={style.navbarItem}>
            <NavLink to="/signin" className={getNavLinkStyle}>
              sign in
            </NavLink>
          </li>
        )}
        {user ? (
          <li className={style.navbarItem}>
            <div className={style.userMenuWrapper}>
              <button
                className={style.userButton}
                type="button"
                onClick={toggleDropdown}
              >
                {firstName}
                <ExpandMoreRoundedIcon
                  className={clsx(style.dropdownIcon, {
                    [style.dropdownIconOpen]: isDropdownOpen,
                  })}
                />
              </button>
              {isDropdownOpen && (
                <div className={style.dropdownMenu}>
                  <button
                    onClick={handleSignOut}
                    className={style.dropdownItem}
                    type="button"
                  >
                    sign out
                  </button>
                </div>
              )}
            </div>
          </li>
        ) : (
          <>
            <li className={style.navbarItem}>
              <NavLink to="/register" className={getNavLinkStyle}>
                sign up
              </NavLink>
            </li>
          </>
        )}
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
