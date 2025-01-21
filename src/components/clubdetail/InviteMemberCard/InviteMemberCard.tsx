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

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleInvite = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter an email');

      return;
    }

    const validateEmail = (emailValidation: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValidation);
    if (!validateEmail(email.trim())) {
      setErrorMessage('Please enter a valid email');

      return;
    }

    try {
      await inviteMemberByEmail(clubId, email.trim());
      await loadClubMembers();
      setSuccessMessage('User added to the club successfully!');
      setEmail('');
    } catch (error: any) {
      setErrorMessage(
        error.message || 'Something went wrong while adding the user',
      );
    }
  };

  return (
    <ClubDetailCardWrapper title={title} text={text}>
      <input
        type="email"
        placeholder="Email"
        className={style.input}
        value={email.trim()}
        onChange={handleEmailChange}
      />
      <button type="button" onClick={handleInvite} className={style.button}>
        Invite
      </button>

      {(errorMessage || successMessage) && (
        <p
          className={clsx({
            [style.errorMessage]: errorMessage,
            [style.successMessage]: successMessage,
          })}
        >
          {errorMessage || successMessage}
        </p>
      )}
    </ClubDetailCardWrapper>
  );
};
