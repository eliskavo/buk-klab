import { useState, ChangeEvent } from 'react';
import clsx from 'clsx';

import { inviteMemberByEmail } from '../../../api/clubsMembers';
import { ClubDetailCardWrapper } from '../ClubDetailCardWrapper/ClubDetailCardWrapper';
import style from './InviteMemberCard.module.scss';

type InviteMemberCardProps = {
  title: string;
  text: string;
  clubId: number;
  loadClubMembers: () => Promise<void>;
};

export const InviteMemberCard: React.FC<InviteMemberCardProps> = ({
  title,
  text,
  clubId,
  loadClubMembers,
}) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (emailValidation: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValidation);

  const handleInvite = async () => {
    if (!email) {
      setErrorMessage('Please enter an email');

      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email');

      return;
    }

    await inviteMemberByEmail(clubId, email);
    setEmail('');
    setSuccessMessage('User added to the club successfully!');
    loadClubMembers();
  };

  return (
    <ClubDetailCardWrapper title={title} text={text}>
      <input
        type="email"
        placeholder="Email"
        className={style.input}
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <button type="button" onClick={handleInvite} className={style.button}>
        Invite
      </button>
      <p
        className={clsx({
          [style.errorMessage]: errorMessage,
          [style.successMessage]: successMessage,
        })}
      >
        {errorMessage || successMessage}
      </p>
    </ClubDetailCardWrapper>
  );
};
