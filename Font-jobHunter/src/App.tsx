import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
