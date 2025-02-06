import { useState, ChangeEvent, FormEvent } from 'react';

import { ChildrenFC } from '../../utils/type';
import { Button } from '../Button/Button';
import { ClubType } from '../../model/Club';
import style from './EditableField.module.scss';

type EditableClubFieldProps = {
  clubDetails: ClubType;
  onSave: (data: Partial<ClubType>) => void;
  isEditing: boolean;
  onCancel: () => void;
};

export const EditableClubField: ChildrenFC<EditableClubFieldProps> = ({
  clubDetails,
  children,
  onSave,
  onCancel,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    name: clubDetails.name,
    description: clubDetails.description,
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

  return (
    <div className={style.editableFieldContainer}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className={style.editableForm}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={style.input}
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={style.textarea}
          />

          <div className={style.buttonGroup}>
            <Button variant="secondary" onClick={() => onCancel()}>
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
  );
};
