import React from 'react';
import { Link } from 'react-router-dom';

import waving_girl from '../../assets/images/waving_girl.png';
import style from './Footer.module.scss';

export const Footer: React.FC = () => (
  <footer className={style.footer}>
    <div className={style.mainContent}>
      <h1 className={style.logo}>buk klab</h1>

      <section>
        <h3 className={style.sectionTitle}>navigation</h3>
        <nav aria-label="Footer navigation">
          <ul className={style.linkList}>
            <li>
              <Link to="/books" className={style.link}>
                books
              </Link>
            </li>
            <li>
              <Link to="/joinclub" className={style.link}>
                join club
              </Link>
            </li>
            <li>
              <Link to="/members" className={style.link}>
                members
              </Link>
            </li>
            <li>
              <Link to="/about" className={style.link}>
                about
              </Link>
            </li>
          </ul>
        </nav>
      </section>

      <section>
        <h3 className={style.sectionTitle}>app</h3>
        <nav>
          <ul className={style.linkList}>
            <li>
              <Link to="/signin" className={style.link}>
                sign in
              </Link>
            </li>
            <li>
              <Link to="/register" className={style.link}>
                sign up
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </div>

    <div className={style.bottomBar}>
      <p>
        created by{' '}
        <a
          className={style.profileLink}
          href="https://github.com/eliskavo"
          target="_blank"
          rel="noreferrer noopener"
        >
          Eliška Võ
        </a>
      </p>
    </div>

    <img src={waving_girl} alt="" className={style.image} />
  </footer>
);
