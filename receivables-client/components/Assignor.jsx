import React, { useState } from "react";

const Assignor = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [document, setDocument] = useState("");
  const [documentError, setDocumentError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validateName = () => {
    if (!name || name.length > 140 || !/^[a-zA-Z\s]+$/.test(name)) {
      setNameError(
        "Nome inválido. O nome deve ter apenas letras e no máximo 140 caracteres."
      );
      return false;
    }
    setNameError("");
    return true;
  };

  const validateDocument = () => {
    const cpfCnpjPattern = /^\d{11}$|^\d{14}$/;
    if (!document || !cpfCnpjPattern.test(document)) {
      setDocumentError(
        "Documento inválido. O documento deve ser um CPF ou CNPJ válido."
      );
      return false;
    }
    setDocumentError("");
    return true;
  };

  const validatePhone = () => {
    if (!phone || !/^\d+$/.test(phone)) {
      setPhoneError("Telefone inválido. Apenas números são permitidos.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateEmail = () => {
    if (!email || email.length > 140) {
      setEmailError(
        "Email inválido. O email deve ter no máximo 140 caracteres."
      );
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    isValid = validateName() && isValid;
    isValid = validateDocument() && isValid;
    isValid = validatePhone() && isValid;
    isValid = validateEmail() && isValid;

    if (isValid) {
      try {
        const payload = {
          document,
          email,
          phone,
          name,
        };

        const response = await fetch(
          "http://localhost:3001/integrations/assignor",
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
          const data = await response.json();
          console.log(data);
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

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setPhone(value);
  };

  return (
    <div id="Assignor" className="w-full lg:h-screen">
      <div className="max-w-[600px] m-auto pt-24 w-full">
        <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="uppercase text-sm py-2">Nome</label>
                <input
                  className={`border-2 rounded-lg p-3 flex border-gray-300 ${
                    nameError ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && <p className="text-red-500">{nameError}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                <div className="flex flex-col">
                  <label className="uppercase text-sm py-2">Documento</label>
                  <input
                    className={`border-2 rounded-lg p-3 flex border-gray-300 ${
                      documentError ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="document"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                  />
                  {documentError && (
                    <p className="text-red-500">{documentError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="uppercase text-sm py-2">Celular</label>
                  <input
                    className={`border-2 rounded-lg p-3 flex border-gray-300 ${
                      phoneError ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  {phoneError && <p className="text-red-500">{phoneError}</p>}
                </div>
              </div>
              <div className="flex flex-col py-2">
                <label className="uppercase text-sm py-2">Email</label>
                <input
                  className={`border-2 rounded-lg p-3 flex border-gray-300 ${
                    emailError ? "border-red-500" : ""
                  }`}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <button className="w-full p-4 text-gray-100 mt-4">
                Cadastrar cedente
              </button>

              {submitError && <p className="text-red-500">{submitError}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignor;
