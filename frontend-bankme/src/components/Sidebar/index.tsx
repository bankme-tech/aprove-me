import Image from "next/image";

export default function Sidebar() {
  return (
    <nav className="fixed left-0  top-0 z-50 flex flex-col justify-around px-8 h-full  bg-blue-200 shadow-gray-400 shadow-md selection:text-blue-80">
      {/* Logo */}
      <div className="mb-6 flex  justify-center ">
        <Image src="/logo-bankme.png" alt="b logo" width={50} height={50}  />
      </div>      
        <button className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md">
          <Image alt="icon" src="/file-lines-solid.svg" width={20} height={20} />
          <span className="ml-2">Pagáveis</span>
        </button>
        <button className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md">
          <Image alt="icon" src="/pen-to-square-solid.svg" width={20} height={20} />
          <span className="ml-2">Editar</span>
        </button>
        <button className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md">
          <Image alt="icon" src="/gears-solid.svg" width={20} height={20} />
          <span className="ml-2">Configurações</span>
        </button>
        <button className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md">
          <Image alt="icon" src="/arrow-right-from-bracket-solid.svg" width={20} height={20} />
          <span className="ml-2">Logout</span>
        </button>
     
    </nav>
  );
}
