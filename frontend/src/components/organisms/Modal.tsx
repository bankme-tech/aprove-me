"use client";

import { useState } from "react";
import { Button } from "../atoms/Button";

const ModalMy = ({
  isOpen,
  onClose,
  children,
  title,
  confirm,
  cancel,
}: any) => {
  return (
    <>
      {isOpen && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {children}
              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  onClick={onClose}
                  type="button"
                  className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {confirm}
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  {cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// TODO: add listeners to know when route changes

export const Modal = ({ label, title, confirm, cancel, children }: any) => {
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
      <ModalMy
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        confirm={confirm}
        cancel={cancel}
      >
        {children}
      </ModalMy>
    </>
  );
};
