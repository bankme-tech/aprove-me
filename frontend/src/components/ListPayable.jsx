import React, { useEffect, useState } from "react";

const ListPayable = () => {
  const [payables, setPayables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3003/integrations/assignor")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setPayables(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center flex-wrap">
      {console.log(payables, "payables")}
      {payables.map((payable) => (
        <div key={payable.id}>
          <div class="flex justify-center m-10">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
                {payable.name} - {payable.document}
              </h5>
              <ul>
                <li>
                  Nome: {payable.name} - Documento: {payable.document}
                </li>
                <li>
                  Telefone: {payable.phone} || Email: {payable.email}
                </li>
              </ul>

              <div class="flex justify-center">
                <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                  {payable.receivables.map((receivable) => (
                    <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                      Valor: R${receivable.value} || || Data de emissão:{" "}
                      {receivable.emission_date}{" "}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="py-2">Adicionar novo recebível</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPayable;
