import NavBar from "@/components/navBar";

const Dashboard = ({ session }) => {
  return (
    <div className="min-h-full">
      <NavBar />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Seja bem vindo, {session?.user?.name}!
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"></div>
      </main>
    </div>
  );
};

export default Dashboard;
