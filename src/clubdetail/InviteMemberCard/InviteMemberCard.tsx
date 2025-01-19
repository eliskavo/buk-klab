import { useState, ChangeEvent } from 'react';
import clsx from 'clsx';

import { inviteMemberByEmail } from '../../api/clubsMembers';
import style from './InviteMemberCard.module.scss';

type InviteMemberCardProps = {
  title: string;
  text: string;
  clubId: number;
  onMemberUpdate: () => void;
  // memberId: string;
};

export const InviteMemberCard: React.FC<InviteMemberCardProps> = ({
  title,
  text,
  clubId,
  onMemberUpdate,
  // memberId,
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

    // const isMember = await isUserClubMember(memberId, clubId);
    // if (isMember) {
    //   setErrorMessage('User is already a member of this club');

    //   return;
    // }
    setEmail('');
    setSuccessMessage('User added to the club successfully!');
    onMemberUpdate();
  };

  return (
    <div className={`${style.card} ${style.inviteCard}`}>
      <h2 className={`${style.cardTitle} ${style.inviteCardTitle}`}>{title}</h2>
      <p className={`${style.cardText} ${style.inviteCardText}`}>{text}</p>
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
    </div>
  );
};
