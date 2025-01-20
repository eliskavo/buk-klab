import { ReactNode } from 'react';

import { ChildrenFC } from '../../../utils/type';
import style from './ClubDetailCardWrapper.module.scss';

type ClubDetailCardWrapperProps = {
  children: ReactNode;
  title: string;
  text?: string;
};

export const ClubDetailCardWrapper: ChildrenFC<ClubDetailCardWrapperProps> = ({
  children,
  title,
  text,
}) => (
  <div className={style.card}>
    <h2 className={style.cardTitle}>{title}</h2>
    {text && <p className={style.cardText}>{text}</p>}
    {children}
  </div>
);
