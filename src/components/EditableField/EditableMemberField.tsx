import { useState, ChangeEvent, FormEvent } from 'react';

import { ChildrenFC } from '../../utils/type';
import { MemberType } from '../../model/Member';
import { Button } from '../Button/Button';
import style from './EditableField.module.scss';

type EditableMemberFieldProps = {
  memberDetails: MemberType;
  onSave: (data: Partial<MemberType>) => void;
  isEditing: boolean;
  onCancel: () => void;
};

export const EditableMemberField: ChildrenFC<EditableMemberFieldProps> = ({
  memberDetails,
  children,
  onSave,
  onCancel,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    firstname: memberDetails.firstname,
    lastname: memberDetails.lastname,
    bio: memberDetails.bio ?? '',
  });

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={style.editableFieldContainer}>
      <div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className={style.editableForm}>
            <input
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className={style.input}
            />
            <input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={style.input}
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={style.textarea}
            />

            <div className={style.buttonGroup}>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="secondary" type="submit">
                Save
              </Button>
            </div>
          </form>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
