import { useState } from 'react';

import { MemberType } from '../../../model/Member';
import { Button } from '../../Button/Button';
import style from './UserProfileInfo.module.scss';

type UserProfileInfoProps = {
  memberDetails: MemberType;
  isOwner: boolean;
  onUpdate: (data: Partial<MemberType>) => void;
};

export const UserProfileInfo: React.FC<UserProfileInfoProps> = ({
  memberDetails,
  isOwner,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (isOwner) {
    return (
      <section className={style.infoSection}>
        <div className={style.editableContent}>
          {isEditing ? (
            <div>Editing mode</div>
          ) : (
            <>
              <h1 className={style.notEditableTitle}>
                {memberDetails.firstname} {memberDetails.lastname}
              </h1>
              <p className={style.about}>about me:</p>
              <p className={style.description}>
                {memberDetails.bio || 'Still deciding what to write here...'}
              </p>
            </>
          )}
        </div>
        <Button
          variant="secondary"
          type="submit"
          onClick={() => handleEditClick}
        >
          edit profile
        </Button>
      </section>
    );
  }

  return (
    <section className={style.infoSection}>
      <div className={style.editableContent}>
        <h1 className={style.notEditableTitle}>
          {memberDetails.firstname} {memberDetails.lastname}
        </h1>
        <p className={style.about}>about me:</p>
        <p className={style.description}>
          {memberDetails.bio || 'Still deciding what to write here...'}
        </p>
      </div>
    </section>
  );
};
