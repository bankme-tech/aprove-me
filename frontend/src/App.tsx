import "@/globals.css";
import { Login } from "@/pages/login/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemesProvider } from "./context/theme";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return (
    <div className="min-h-screen w-full bg-background">
      <ThemesProvider>
        <RouterProvider router={router} />
      </ThemesProvider>
    </div>
  );
}

export default App;
