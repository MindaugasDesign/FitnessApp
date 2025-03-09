import { useRef, useEffect } from "react";

export function DialogWindow({ dialogText, isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <p>{dialogText}</p>
    </dialog>
  );
}
