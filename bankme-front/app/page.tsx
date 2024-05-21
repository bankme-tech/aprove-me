import Header from "@/components/header/Header";
import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <div className="bg-gray-800 w-full h-screen">
        <Header />
      </div>
    </AuthProvider>
  );
}
