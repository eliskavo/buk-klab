import style from './Welcome.module.scss';

export const Welcome = () => (
  <div className={style.welcome}>
    <section className={style.leftSection}>
      <div className={style.elementsSection}>
        <div className="heading3">Welcome to</div>
        <h1 className="heading1">
          buk klab
          <span />
        </h1>
        <p className={style.description}>
          buk klab is a place where you can read books, discuss them with
          others, and meet new friends. We are a community of book lovers who
          are passionate about reading and sharing our thoughts with others.
          Join us today and start your reading journey with us!
        </p>
        <button type="button" className={style.welcomeButton}>
          join buk klab
        </button>
      </div>
    </section>
    <div className={style.rightSection}>písmenka</div>
  </div>
);
