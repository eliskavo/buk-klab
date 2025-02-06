import { useState } from 'react';

import { EditableClubField } from '../../EditableField/EditableClubField';
import { ClubType, UpdateClubType } from '../../../model/Club';
import { Button } from '../../Button/Button';
import style from './ClubDetailInfo.module.scss';

type ClubDetailInfoProps = {
  clubDetail: ClubType;
  isOwner: boolean;
  isMember: boolean;
  memberCount: number;
  onUpdate: (data: UpdateClubType) => void;
  onDelete: () => void;
  onLeaveClub: () => void;
};

export const ClubDetailInfo: React.FC<ClubDetailInfoProps> = ({
  clubDetail,
  isOwner,
  isMember,
  memberCount,
  onUpdate,
  onDelete,
  onLeaveClub,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (data: Partial<ClubType>) => {
    onUpdate(data);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const renderActionButtons = () => {
    if (!isMember || isEditing) {
      return null;
    }

    if (isOwner) {
      return (
        <div>
          <Button variant="secondary" onClick={handleEditClick}>
            edit
          </Button>
          <Button variant="secondary" onClick={onDelete}>
            delete club
          </Button>
        </div>
      );
    }

    return (
      <Button
        variant="secondary"
        onClick={onLeaveClub}
        aria-label="leave club"
        className={style.leaveButton}
      >
        leave club
      </Button>
    );
  };

  return (
    <section className={style.infoSection}>
      <div className={style.editableContent}>
        <EditableClubField
          clubDetails={clubDetail}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={isEditing}
        >
          <h1 className={style.title}>{clubDetail.name}</h1>
          <p className={style.memberCount}>
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </p>
          <p className={style.description}>{clubDetail.description}</p>
        </EditableClubField>

        {renderActionButtons()}
      </div>
    </section>
  );
};
