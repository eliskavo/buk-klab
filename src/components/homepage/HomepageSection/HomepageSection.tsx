import clsx from 'clsx';

import { ChildrenFC } from '../../../utils/type';
import style from './HomepageSection.module.scss';

type HomepageSectionProps = {
  className?: string;
};

export const HomepageSection: ChildrenFC<HomepageSectionProps> = ({
  children,
  className,
}) => (
  <section className={clsx(style.container, className)}>{children}</section>
);
