import style from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => (
  <button className={`${style.button} ${className}`} onClick={onClick}>
    {children}
  </button>
);
