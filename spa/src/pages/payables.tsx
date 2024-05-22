import { useEffect, useState } from "react"
import { PayableType } from "../types"
import { getAllPayables } from "../services/payable"
import Title from "../components/ui/title"
import { FiTrash } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom";
import { UUID } from "crypto";
import Table from "../components/table";
import Pagination from "../components/pagination";

export default function Payables() {
  const [payables, setPayables] = useState<PayableType[]>([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  const handleOpenPayable = (id: UUID) => {
    navigate(`/payable/view/${id}`, {state: {title: 'Detalhes do Pagável:'}});
  }

  const handleGetAllPayables = async (skip: number) => {
    const data = await getAllPayables(skip, rowsPerPage)
    if(data.length === 0 && page !== 0) {
      setPage(page)
    }
    else {
      setPayables(data)
    }
  }

  const nextPage = () => {
    if (!(payables.length < rowsPerPage)) {
      handleGetAllPayables(rowsPerPage *(page + 1))
      setPage(page + 1)
    }
  }

  const previousPage = () => {
    if (page !== 0) {
      handleGetAllPayables(rowsPerPage * (page - 1))
      setPage(page - 1)
    }
  }

  useEffect(() => {
    handleGetAllPayables(0)
  }, [])

  useEffect(() => {
    handleGetAllPayables(0)
    setPage(0)

  }, [rowsPerPage])

  return (
    <div className="flex flex-col items-center w-full gap-6 text-textColor">
      <Title>Lista de pagáveis:</Title>

      <div className="flex max-w-2xl p-4 border border-borderColor rounded-2xl flex-col gap-3">
        <Table payables={payables} handleOpenPayable={handleOpenPayable} />
        <Pagination
          value={rowsPerPage}
          setValue={setRowsPerPage}
          page={page}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>

    </div>
  )
}