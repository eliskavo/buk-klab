import { ClubDetailCardWrapper } from '../ClubDetailCardWrapper/ClubDetailCardWrapper';

type CurrentlyReadingCardProps = {
  title: string;
  text: string;
};

export const CurrentlyReadingCard: React.FC<CurrentlyReadingCardProps> = ({
  title,
  text,
}) => (
  <ClubDetailCardWrapper title={title} text={text}>
    <p>lalala</p>
  </ClubDetailCardWrapper>
);
