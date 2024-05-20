import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/login/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
