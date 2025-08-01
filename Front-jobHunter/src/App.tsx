import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./Pages/MainPage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import Contact from "./Pages/ContactPage/Contact";
import Registration from "./Pages/Registrarion/Registration";
import Login from "./Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/employer/register",
    element: <Registration />,
  },
  {
    path: "/employer/login",
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
