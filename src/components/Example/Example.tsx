import style from './Example.module.scss';

type ExampleProps = {
  children: React.ReactNode;
};

export const Example: React.FC<ExampleProps> = ({ children }) => (
  <div className={style.someStyling}>{children}</div>
);
