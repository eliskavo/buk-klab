import React from 'react';
import './Members.scss';

import girl_holding_books from '../../assets/girl_holding_books.png';

export const Members: React.FC = () => (
  <div className="members-section">
    <div className="members-section-left">
      <h2 className="heading2-underlined">our great members</h2>
      <span />
      <p className="members-description">
        Our community is made up of book lovers from all walks of life. We have
        students, teachers, parents, and professionals who are passionate about
        reading and sharing their thoughts with others. Join us today and meet
        new friends who share your love for reading.
      </p>
    </div>
    <div className="members-section-right">
      <img
        className="members-illustration"
        src={girl_holding_books}
        alt="girl_holding_books"
      />
    </div>
  </div>
);
