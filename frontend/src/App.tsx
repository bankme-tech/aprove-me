import { Header } from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";
import { ThemesProvider } from "@/context/theme";
import "@/globals.css";
import { router } from "@/routes";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

function App() {
  const user = useAuthStore();

  useEffect(() => {
    const timer = setInterval(() => user.checkUser(), 6000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen w-full bg-background">
      <ThemesProvider>
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </ThemesProvider>
    </div>
  );
}

export default App;
