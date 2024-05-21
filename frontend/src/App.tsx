import "@/globals.css";
import { RouterProvider } from "react-router-dom";
import { ThemesProvider } from "./context/theme";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";

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
        <Toaster />
        <RouterProvider router={router} />
      </ThemesProvider>
    </div>
  );
}

export default App;
