import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { ClubType } from '../../model/Club';
import { useAuth } from '../../context/AuthContext';
import { getClubs } from '../../api/clubsApi';
import { setClubsCurrentBook } from '../../api/clubsCurrentlyReading';
import style from './SelectClubDialog.module.scss';

type SelectClubDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  closeButtonText: string;
  confirmButtonText: string;
  bookId: string;
};

export const SelectClubDialog: React.FC<SelectClubDialogProps> = ({
  isOpen = false,
  onClose,
  title,
  bookId,
  message,
  closeButtonText,
  confirmButtonText,
}) => {
  const [clubs, setClubs] = useState<ClubType[]>([]);
  const [selectedClubId, setSelectedClubId] = useState<number | null>(null);

  const user = useAuth();

  useEffect(() => {
    const fetchClubs = async () => {
      if (!user) {
        return;
      }
      const allClubs = await getClubs();
      const ownerClubs = allClubs.filter((club) => club.ownerId === user.id);
      setClubs(ownerClubs);
    };

    fetchClubs();
  }, [user]);

  const handleClose = () => {
    setSelectedClubId(null);
    onClose();
  };

  const handleConfirm = async () => {
    if (!selectedClubId) {
      return;
    }

    try {
      await setClubsCurrentBook(selectedClubId, bookId);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.backdrop}>
      <div className={style.dialog}>
        <section className={style.content}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.message}>{message}</p>
          <ul className={style.clubList}>
            {clubs.map((club) => (
              <li key={club.id} className={style.clubListItem}>
                <button
                  type="button"
                  className={clsx(
                    style.clubButton,
                    selectedClubId === club.id && style.selected,
                  )}
                  onClick={() => setSelectedClubId(club.id)}
                >
                  {club.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className={style.buttons}>
          <button
            onClick={handleClose}
            className={clsx(style.closeButton, style.button)}
          >
            {closeButtonText}
          </button>
          <button
            onClick={handleConfirm}
            className={clsx(style.confirmButton, style.button)}
          >
            {confirmButtonText}
          </button>
        </section>
      </div>
    </div>
  );
};
