import React from "react";
import { Topics, Payable } from "./styles";

export const BoxPayable = () => {
  return (
    <>
      <Topics>
        <h1>Id</h1>
        <h1>Valor</h1>
        <h1>Data de Emissão</h1>
      </Topics>
      <Payable>
        <h1>1</h1>
        <h1>100,00</h1>
        <h1>20/11/2023</h1>
        <div className="button-container">
          <button onClick={() => console.log("Editar")}>Editar</button>
          <button className="delete-button" onClick={() => console.log("Deletar")}>
            Deletar
          </button>
        </div>
      </Payable>
    </>
  );
};
