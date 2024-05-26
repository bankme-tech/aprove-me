import { Table } from "antd";
import { Payable } from "../../model/payable";
import { useEffect, useState } from "react";
import payableService from "../../services/payableService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PayableList = () => {
  const [payables, setPayables] = useState<Payable[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await payableService.delete(id);
      const response = await payableService.findAll();
      setPayables(response.data);
    } catch (error) {
      toast.error("Erro ao deletar pagável");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPayables = async () => {
      const response = await payableService.findAll();
      setPayables(response.data);
    };

    try {
      fetchPayables();
    } catch (error) {
      toast.error("Erro ao buscar pagáveis");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4  w-full items-center pt-8">
      <h1 className="text-2xl">Pagáveis</h1>

      <div className="flex flex-col gap-2 w-full">
        <Table
          loading={loading}
          dataSource={payables}
          pagination={{
            total: payables.length,
          }}
          scroll={{ x: "100%" }}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Valor",
              dataIndex: "value",
              key: "value",
            },
            {
              title: "Data de Emissão",
              dataIndex: "emissionDate",
              key: "emissionDate",
            },
            {
              title: "Opções",
              render: (payable: Payable) => (
                <div className="flex gap-2">
                  <button
                    className="bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                      navigate(`/payable/${payable.id}`);
                    }}
                  >
                    Ver
                  </button>

                  <button
                    className="bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                      navigate(`/payable/${payable.id}/edit`);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-700 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(payable.id)}
                  >
                    Excluir
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PayableList;
