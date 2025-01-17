import clsx from 'clsx';

import style from './ConfirmDialog.module.scss';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  closeButtonText: string;
  confirmButtonText: string;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen = false,
  onClose,
  onConfirm,
  title,
  message,
  closeButtonText,
  confirmButtonText,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
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
