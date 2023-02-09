import React, { useEffect, useState } from "react";
import Router from 'next/router'

const FormAssignor = () => {
  

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      document: event.target.document.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "http://localhost:3003/integrations/assignor";

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
    alert(`Cedente ${result.name} cadastrado com sucesso!`);
    Router.reload(window.location.pathname)

  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-6 shadow-xl bg-[#f6f6f9] border rounded-lg">
        <form onSubmit={handleSubmit}>
          <input
            className="border-2 border-[#e0e0e0] rounded-2xl p-2 m-2"
            placeholder="Nome"
            type="text"
            id="name"
            name="name"
            required
          />
          <input
            className="border-2 border-[#e0e0e0] rounded-2xl p-2 m-2"
            placeholder="Documento"
            type="text"
            id="document"
            name="document"
            required
          />
          <input
            className="border-2 border-[#e0e0e0] rounded-2xl p-2 m-2"
            placeholder="Email"
            type="text"
            id="email"
            name="email"
            required
          />
          <input
            className="border-2 border-[#e0e0e0] rounded-2xl p-2 m-2"
            placeholder="Telefone"
            type="text"
            id="phone"
            name="phone"
            required
          />
          <button className="py-2 m-2">Cadastre um novo cedente</button>
        </form>
      </div>
    </div>
  );
};

export default FormAssignor;
