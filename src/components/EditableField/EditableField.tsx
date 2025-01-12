import { useState, useRef } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import { ChildrenFC } from '../../utils/type';

type EditableFieldProps = {
  value: string;
  handleSave: (newValue: string) => void;
};

export const EditableField: ChildrenFC<EditableFieldProps> = ({
  value,
  handleSave,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);

    if (inputRef.current) {
      handleSave(inputRef.current.value);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" defaultValue={value} ref={inputRef} />

          <button type="button" onClick={handleSubmit}>
            <CheckRoundedIcon />
          </button>
        </div>
      ) : (
        <div>
          <button type="button" onClick={handleEditClick}>
            <EditRoundedIcon />
          </button>
          {children}
        </div>
      )}
    </div>
  );
};
