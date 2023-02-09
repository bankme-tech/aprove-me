import React from "react";
import Router from "next/router";

const FormPayable = (data) => {
  const assignorID = data.data.id;
  console.log(assignorID, "assingnorID");
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const emissionDate = new Date(event.target.emission_date.value);
    const valueFloat =parseFloat(event.target.value.value.replace(",", "."));
    const data = {
      emission_date: emissionDate,
      value: valueFloat
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = `http://localhost:3003/integrations/payable/${assignorID}`;

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    alert(`Recebivel R$${result.value} cadastrado com sucesso!`);
    Router.reload(window.location.pathname);
  };

  return (
    <div className="w-full mt-2 flex justify-center items-center">
      <div className="p-6 shadow-xl bg-[#f6f6f9] border rounded-lg">
        <form onSubmit={handleSubmit}>
          <input
            className="border-2 border-[#e0e0e0] rounded-2xl p-2 m-2 w-full"
            placeholder="Data de emissão"
            type="date"
            id="emission_date"
            name="emission_date"
            required
          />
          <input
            className="border-2 border-[#e0e0e0] rounded-2xl p-2 m-2 w-full"
            placeholder="Valor R$"
            type="float"
            id="value"
            name="value"
            required
          />
          <button className="py-2 m-2">Cadastre um novo recebível</button>
        </form>
      </div>
    </div>
  );
};

export default FormPayable;
