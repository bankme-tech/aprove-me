import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <div>
        <Header></Header>
      </div>
    </AuthProvider>
  );
}
