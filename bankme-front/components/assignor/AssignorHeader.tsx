export default function AssignorHeader({onSelect}: any) {
  return(
    <div>
      <ul className="flex bg-blue-600">
        <li className="flex-1 mr-2">
          <div onClick={() => onSelect('list')} className="text-center block border border-blue-600 rounded py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">Listar Cedentes</div>
        </li>
        <li className="flex-1 mr-2">
          <div onClick={() => onSelect('add')} className="text-center block border border-blue-600 rounded py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">Adicionar Cedente</div>
        </li>
        <li onClick={() => onSelect('edit')} className="text-center flex-1">
          <div className="text-center block border border-blue-600 rounded py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">Editar Cedente</div>
        </li>
        <li onClick={() => onSelect('del')} className="text-center flex-1">
          <div className="text-center block border border-blue-600 rounded py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">Remover Cedente</div>
        </li>
      </ul>
    </div>
  )
}
