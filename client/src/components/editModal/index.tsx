import api from "@/services/api";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

interface IAssignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

const EditModal = ({ isVisible, setIsVisible, type }: Props) => {
  const [assignor, setAssignor] = useState<IAssignor[]>();
  const [value, setValue] = useState<string>();
  const [assignorName, setAssignorName] = useState<string>();
  const [indexAssignor, setIndexAssignor] = useState<string>();

  const [emissionDate, setEmissionDate] = useState<string>();

  useEffect(() => {
    api
      .get("/api/assignor")
      .then((response) => setAssignor(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  function handleEdit() {
    var date = moment(emissionDate);

    //pegar o id so assignor selecionado no modal
    let assignorSelected: IAssignor = assignor.filter(
      (item) => item.name == assignorName,
    );

    console.log(assignorSelected);

    if (type == "assignor") {
      api
        .post("/api/assignor", {
          document: "12312313123",
          email: "teste@cedente.com",
          phone: "15 99999 8888",
          name: "Cedente 2",
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    } else {
      api
        .post("/api/payable", {
          value: parseFloat(
            value.replaceAll("R$", "").replaceAll(".", "").replaceAll(",", "."),
          ),
          emission_date: date.format(),
          id_assignor: assignorSelected,
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }

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
                    Atualize as informações do pagável
                  </h3>
                  <button
                    className="pl-10 ml-auto border-0  float-right  leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsVisible(false)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form action="#" method="POST">
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Valor
                            </label>
                            <MaskedInput
                              onChange={(event) => {
                                setValue(event.target.value);
                              }}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              mask={createNumberMask({
                                prefix: "R$",
                                suffix: "",
                                includeThousandsSeparator: true,
                                thousandsSeparatorSymbol: ".",
                                includeDecimalSeparator: true,
                                allowDecimal: true,
                                decimalSymbol: ",",
                                decimalLimit: 2,
                                integerLimit: 7,
                                allowNegative: false,
                                allowLeadingZeroes: false,
                              })}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Data de emissão
                            </label>
                            <input
                              onChange={(event) => {
                                setEmissionDate(event.target.value);
                              }}
                              type="date"
                              name="last-name"
                              id="last-name"
                              autoComplete="family-name"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cedente
                            </label>
                            <select
                              onChange={(event) => {
                                setAssignorName(event.target.value);
                              }}
                              id="assignor"
                              name="assignor"
                              className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              {assignor?.map((item) => (
                                <option>{item.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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
                    className="bg-green-600 text-white active:bg-green-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleEdit();
                    }}
                  >
                    Salvar
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

export default EditModal;
