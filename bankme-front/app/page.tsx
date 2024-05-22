import Header from "@/components/header/Header";
import HomeCard from "@/components/home/HomeCard";

export default function Home() {
  return (
    <div className="bg-gray-800 w-full h-screen">
      <Header />
      <div className="flex flex-nowrap items-center justify-center justify-around mt-36">
        <HomeCard href="/payable" title="Recebíveis" text="Acesso ao controle de Recebíveis (Listar, Adicionar, Editar e Excluir)"/>
        <HomeCard href="/assignor" title="Cedentes" text="Acesso ao controle de Cedentes (Listar, Adicionar e Editar)"/>
      </div>
    </div>
  );
}
