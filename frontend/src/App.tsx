import "@/globals.css";
import { RouterProvider } from "react-router-dom";
import { ThemesProvider } from "./context/theme";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

function App() {
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
