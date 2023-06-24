import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Payable = () => {
  const [id, setId] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date());
  const [cedente, setCedente] = useState("");
  const [idError, setIdError] = useState("");
  const [valorError, setValorError] = useState("");
  const [cedenteError, setCedenteError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const isValidUUID = (uuid) => {
    const uuidv4Pattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidv4Pattern.test(uuid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Verificar o campo ID
    if (!id || !isValidUUID(id)) {
      isValid = false;
      setIdError("ID inválido. O ID deve ser um UUIDv4 válido.");
    } else {
      setIdError("");
    }

    // Verificar o campo Valor
    const parsedValor = parseFloat(valor);
    if (isNaN(parsedValor) || !Number.isFinite(parsedValor)) {
      isValid = false;
      setValorError("Valor inválido. O Valor deve ser um número válido.");
    } else {
      setValorError("");
    }

    // Verificar o campo Cedente
    const parsedCedente = parseInt(cedente);
    if (isNaN(parsedCedente) || !Number.isInteger(parsedCedente)) {
      isValid = false;
      setCedenteError(
        "Cedente inválido. O Cedente deve ser um número inteiro válido."
      );
    } else {
      setCedenteError("");
    }

    if (isValid) {
      try {
        const payload = {
          id,
          value: parsedValor,
          emissionDate: data.toISOString(),
          assignor: parsedCedente,
        };

        const response = await fetch(
          "http://localhost:3001/integrations/payable",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          console.log("POST request successful");

          setId("");
          setValor("");
          setData(new Date());
          setCedente("");
          setSubmitError("");
        } else {
          throw new Error("Error submitting data");
        }
      } catch (error) {
        setSubmitError(
          "Erro ao enviar dados. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <div id="payable" className="w-full lg:h-screen">
      <div className="max-w-[600px] m-auto pt-24 w-full">
        <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="uppercase text-sm py-2">ID</label>
                <input
                  className="border-2 rounded-lg p-3 flex border-gray-300"
                  type="text"
                  name="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                {idError && <p className="text-red-500">{idError}</p>}
              </div>
              <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                <div className="flex flex-col">
                  <label className="uppercase text-sm py-2">Valor</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="text"
                    name="valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />
                  {valorError && <p className="text-red-500">{valorError}</p>}
                </div>
                <div className="flex flex-col ">
                  <label className="uppercase text-sm py-2">Data</label>
                  <DatePicker
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    selected={data}
                    onChange={(date) => setData(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>

              <div className="flex flex-col py-2">
                <label className="uppercase text-sm py-2">Cedente</label>
                <input
                  className="border-2 rounded-lg p-3 flex border-gray-300"
                  type="text"
                  name="cedente"
                  value={cedente}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setCedente(value);
                  }}
                />
                {cedenteError && <p className="text-red-500">{cedenteError}</p>}
              </div>

              <button className="w-full p-4 text-gray-100 mt-4">
                Cadastrar pagáveis
              </button>

              {submitError && <p className="text-red-500">{submitError}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payable;
