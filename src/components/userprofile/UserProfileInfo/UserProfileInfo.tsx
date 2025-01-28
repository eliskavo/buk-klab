import { EditableField } from '../../EditableField/EditableField';
import { MemberType } from '../../../model/Member';
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
  if (isOwner) {
    return (
      <section className={style.infoSection}>
        <EditableField
          type="text"
          value={memberDetails.firstname}
          handleSave={(newValue) => onUpdate({ firstname: newValue })}
        >
          <h1 className={style.title}>{memberDetails.firstname}</h1>
        </EditableField>

        <EditableField
          type="textarea"
          value={memberDetails.bio || ''}
          handleSave={(newValue) => {
            onUpdate({ bio: newValue });
          }}
        >
          <p className={style.about}>About me</p>
          <p className={style.description}>
            {memberDetails.bio || 'Still deciding what to write here...'}
          </p>
        </EditableField>
      </section>
    );
  }

  return (
    <section className={style.infoSection}>
      <div className={style.editableContent}>
        <h1 className={style.notEditableTitle}>
          {memberDetails.firstname} {memberDetails.lastname}
        </h1>
        <p className={style.about}>About me</p>
        <p className={style.description}>{memberDetails.bio}</p>
      </div>
    </section>
  );
};
