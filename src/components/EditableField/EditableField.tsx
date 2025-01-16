import { useState, useRef } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import { ChildrenFC } from '../../utils/type';
import style from './EditableField.module.scss';

const iconSx = { fontSize: 20 };

type EditableFieldProps = {
  type?: 'text' | 'textarea';
  value: string;
  handleSave: (newValue: string) => void;
};

export const EditableField: ChildrenFC<EditableFieldProps> = ({
  type = 'text',
  value,
  handleSave,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);

    const inputValue = inputRef.current?.value;
    const textAreaValue = textAreaRef.current?.value;

    handleSave(inputValue ?? textAreaValue ?? '');
  };

  if (!isEditing) {
    return (
      <div className={style.editableField}>
        {children}

        <button
          type="button"
          onClick={handleEditClick}
          className={style.editButton}
          aria-label="edit"
        >
          <EditRoundedIcon sx={iconSx} />
        </button>
      </div>
    );
  }

  return (
    <div className={style.editableFieldContainer}>
      <div className={style.editableField}>
        {type === 'textarea' ? (
          <textarea
            defaultValue={value}
            ref={textAreaRef}
            className={style.editTextarea}
            rows={4}
          />
        ) : (
          <input
            type="text"
            defaultValue={value}
            ref={inputRef}
            className={style.editInput}
          />
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className={style.editButton}
          aria-label="save changes"
        >
          <CheckRoundedIcon sx={iconSx} />
        </button>
      </div>
    </div>
  );
};
