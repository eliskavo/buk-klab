import { useState } from 'react';

import { MemberType } from '../../../model/Member';
import { Button } from '../../Button/Button';
import { EditableMemberField } from '../../EditableField/EditableMemberField';
import style from './UserProfileInfo.module.scss';

type UserProfileInfoProps = {
  memberDetails: MemberType;
  isOwner: boolean;
  onUpdate: (data: Partial<MemberType>) => void;
};

export const UserProfileInfo: React.FC<UserProfileInfoProps> = ({
  memberDetails,
  isOwner,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (data: Partial<MemberType>) => {
    onUpdate(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <section className={style.infoSection}>
      <EditableMemberField
        memberDetails={memberDetails}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={isEditing}
      >
        <div className={style.editableContent}>
          <h1 className={style.notEditableTitle}>
            {memberDetails.firstname} {memberDetails.lastname}
          </h1>
          <p className={style.about}>about me:</p>
          <p className={style.description}>
            {memberDetails.bio || 'Still deciding what to write here...'}
          </p>
        </div>
      </EditableMemberField>

      {isOwner && !isEditing && (
        <Button variant="secondary" type="button" onClick={handleEditClick}>
          edit profile
        </Button>
      )}
    </section>
  );
};
