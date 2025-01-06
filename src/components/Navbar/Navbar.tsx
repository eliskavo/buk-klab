import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { getSupabaseClient } from '../../api/supabase';
import { LinkButton } from '../LinkButton/LinkButton';
import style from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const supabase = getSupabaseClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      navigate('/');
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
          {isLoggedIn ? (
            <button
              onClick={signOut}
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
                  ? `${style.navbarLink} ${style.active}`
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
            className={`${style.navbarLink} ${style.navbarButton}`}
          >
            join buk klab
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
};
