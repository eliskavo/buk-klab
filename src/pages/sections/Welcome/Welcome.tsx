import './Welcome.scss';

export const Welcome = () => (
  <div className="welcome">
    <section className="welcome-section-left">
      <div className="welcome-section-elements">
        <div className="heading3">Welcome to</div>
        <h1 className="heading1">
          buk klab
          <span />
        </h1>
        <p className="welcome-description">
          buk klab is a place where you can read books, discuss them with
          others, and meet new friends. We are a community of book lovers who
          are passionate about reading and sharing our thoughts with others.
          Join us today and start your reading journey with us!
        </p>
        <button type="button" className="button welcome-button">
          join buk klab
        </button>
      </div>
    </section>
    <div className="welcome-section-right">písmenka</div>
  </div>
);
