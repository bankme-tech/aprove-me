import React, { useEffect, useState, Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ModalFormPayable from "./ModalFormPayable";

const ListPayable = () => {
  const [open, setOpen] = useState(1);
  const [payables, setPayables] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

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

              <Fragment>
                <Accordion open={open === 1}>
                  <AccordionHeader
                    className="text-[var(--primary-dark)]"
                    onClick={() => handleOpen(1)}
                  >
                    Lista de recebíveis
                  </AccordionHeader>
                  <AccordionBody>
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
                  </AccordionBody>
                </Accordion>
              </Fragment>
              <ModalFormPayable assingnorID={"teste"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPayable;
