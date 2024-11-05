import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

export const Navbar: React.FC = () => (
  <nav className="nav">
    <div className="logo">
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
