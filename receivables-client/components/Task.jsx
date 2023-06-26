import React, { useState, useEffect, useRef } from "react";

const Task = ({ id, value, emissionDate, assignor, onDelete }) => {
  const [showMiniScreen, setShowMiniScreen] = useState(false);
  const [assignorData, setAssignorData] = useState(null);

  const miniScreenRef = useRef(null);

  const handleClick = async () => {
    setShowMiniScreen(!showMiniScreen);

    if (showMiniScreen) {
      setAssignorData(null);
    } else {
      try {
        const response = await fetch(
          `http://localhost:3001/integrations/assignor/${assignor}`
        );
        const data = await response.json();
        setAssignorData(data);
      } catch (error) {
        console.error("Error fetching assignor data:", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        miniScreenRef.current &&
        !miniScreenRef.current.contains(event.target)
      ) {
        setShowMiniScreen(false);
        setAssignorData(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div
      id="task"
      className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4 border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
    >
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div>{id}</div>
        <div>{value}</div>
        <div>{emissionDate}</div>
      </div>
      <div>
        <div className="grid grid-rows-3 grid-flow-col ">
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
            onClick={handleClick}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Warning / Info">
                <path
                  id="Vector"
                  d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
            onClick={handleDeleteClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>

      {showMiniScreen && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-gray-300 rounded shadow"
          ref={miniScreenRef}
        >
          {assignorData && assignorData.id ? (
            <div>
              <ul>
                <li>ID: {assignorData.id}</li>
                <li>Document: {assignorData.document}</li>
                <li>Email: {assignorData.email}</li>
                <li>Phone: {assignorData.phone}</li>
                <li>Name: {assignorData.name}</li>
              </ul>
            </div>
          ) : (
            <div>Cedente não encontrado.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
