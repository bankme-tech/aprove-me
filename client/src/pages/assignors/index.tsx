import EditModal from "@/components/createModal";
import DeleteModal from "@/components/deleteModal";
import CreateModal from "@/components/editModal";
import NavBar from "@/components/navBar";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { AiFillEdit, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

interface IAssignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}

const AssignorsTable = () => {
  const [assignor, setAssignor] = useState<IAssignor[]>();
  const [id, setId] = useState<string>();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  useEffect(() => {
    api
      .get("/api/assignor")
      .then((response) => setAssignor(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [openDeleteModal]);

  return (
    <div className="min-h-full ">
      <NavBar active="assignor" />
      <DeleteModal
        isVisible={openDeleteModal}
        setIsVisible={setOpenDeleteModal}
        id={id}
        type={"assignor"}
      />
      <CreateModal
        isVisible={openCreateModal}
        setIsVisible={setOpenCreateModal}
        type={"assignor"}
      />
      <EditModal
        isVisible={openEditModal}
        setIsVisible={setOpenEditModal}
        type={"assignor"}
      />
      <div className="relative overflow-x-auto  pt-10 pr-10 pl-10">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
          <button
            className="inline-flex items-center text-white bg-sky-700 border border-gray-300 focus:outline-none hover:bg-sky-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            onClick={() => setOpenCreateModal(true)}
          >
            Adicionar
            <AiOutlinePlus />
          </button>
          <div className="pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiOutlineSearch />
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  ID
                  <a href="#">
                    <FaSort />
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Nome
                  <a href="#">
                    <FaSort />
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Documento
                  <a href="#">
                    <FaSort />
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Email
                  <a href="#">
                    <FaSort />
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Telefone
                  <a href="#">
                    <FaSort />
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Details</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {assignor?.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id}
                </th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.document}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>

                <td className="px-6 py-4 text-right">
                  <button
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={() => setOpenEditModal(true)}
                  >
                    <AiFillEdit />
                  </button>
                </td>
                <td className="px-6 py-4 ">
                  <a href="#" className="text-blue-600 font-semibold">
                    Detalhes
                  </a>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={() => {
                      setId(item.id);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignorsTable;
