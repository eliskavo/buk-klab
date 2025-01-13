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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);

    if (inputRef.current) {
      handleSave(inputRef.current.value);
    } else if (textareaRef.current) {
      handleSave(textareaRef.current.value);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className={style.editableField}>
          {type === 'textarea' ? (
            <textarea
              defaultValue={value}
              ref={textareaRef}
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
      ) : (
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
      )}
    </div>
  );
};
