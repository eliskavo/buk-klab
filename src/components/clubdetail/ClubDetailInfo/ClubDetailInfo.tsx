import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { EditableField } from '../../EditableField/EditableField';
import { ClubType } from '../../../model/Club';
import style from './ClubDetailInfo.module.scss';

type ClubDetailInfoProps = {
  clubDetail: ClubType;
  isOwner: boolean;
  isMember: boolean;
  memberCount: number;
  onUpdate: (data: Partial<ClubType>) => void;
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
  if (isOwner) {
    return (
      <section className={style.infoSection}>
        <EditableField
          type="text"
          value={clubDetail.name}
          handleSave={(newValue) => {
            onUpdate({ name: newValue });
          }}
        >
          <h1 className={style.title}>{clubDetail.name}</h1>
        </EditableField>

        <EditableField
          type="textarea"
          value={clubDetail.description}
          handleSave={(newValue) => {
            onUpdate({ description: newValue });
          }}
        >
          <p className={style.memberCount}>
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </p>
          <p className={style.description}>{clubDetail.description}</p>
        </EditableField>

        <button
          type="button"
          onClick={onDelete}
          className={style.deleteButton}
          aria-label="delete club"
        >
          <DeleteRoundedIcon />
        </button>
      </section>
    );
  }

  return (
    <section className={style.infoSection}>
      <div className={style.editableContent}>
        <h1 className={style.notEditableTitle}>{clubDetail.name}</h1>
        <p className={style.memberCount}>{memberCount} members</p>
        <p className={style.description}>{clubDetail.description}</p>

        {isMember && (
          <button
            onClick={onLeaveClub}
            type="button"
            className={style.leaveButton}
            aria-label="leave club"
          >
            leave club
          </button>
        )}
      </div>
    </section>
  );
};
