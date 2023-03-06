import api from "@/services/api";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  type: string;
}

const DeleteModal = ({ isVisible, setIsVisible, id, type }: Props) => {
  function handleDelete() {
    api.delete(`/api/${type}/${id}`).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });

    setIsVisible(false);
  }

  return (
    <div>
      {isVisible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg font-semibold">
                    Deseja apagar esse registro?
                  </h3>
                  <button
                    className="pl-10 ml-auto border-0  float-right  leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsVisible(false)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>

                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setIsVisible(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default DeleteModal;
