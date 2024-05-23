"use client";

import { useState } from "react";
import { Button } from "../atoms/Button";
import { DialogFooter } from "../molecules/DialogFooter";
import { DialogHeader } from "../molecules/DialogHeader";

export const Dialog = ({
  label,
  title,
  confirm,
  cancel,
  children,
  padding,
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button label={label} onClick={openModal} />
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <DialogHeader title={title} onClose={closeModal} />
              <div className={padding ? "p-4 " : ""}>{children}</div>
              <DialogFooter
                confirm={confirm}
                cancel={cancel}
                onClose={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
