import clsx from 'clsx';

import style from './ImageUploadDialog.module.scss';

type ImageUploadDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText: string;
};

export const ImageUploadDialog = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmButtonText,
}: ImageUploadDialogProps) => {
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
            className={clsx(style.closeButton, style.button)}
            onClick={handleClose}
          >
            Close
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
