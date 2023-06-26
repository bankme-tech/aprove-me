import React, { useEffect, useState } from "react";
import Task from "./Task";

const Listing = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/integrations/payable/"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/integrations/payable/${id}`, {
        method: "DELETE",
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div id="listing" className="w-full lg:h-screen">
      <div className="max-w-[600px] m-auto pt-24 w-full">
        <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
          <div className=" my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <div className="flex flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl font-medium">Lista de Pagáveis</h1>
              </div>
              <div className="inline-flex space-x-2 items-center"></div>
            </div>

            <div id="tasks" className="my-5">
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  value={task.value}
                  emissionDate={task.emissionDate}
                  assignor={task.assignor}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
