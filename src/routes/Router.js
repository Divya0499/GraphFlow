// routes/Router.js
import { Navigate } from "react-router-dom";
import Login from "../components/Login";
import Graph from "../components/GraphForm";

const Router = [
  {
    path: "/",
    element: <Navigate to="/graph" />,
  },
  {
    path: "/graph",
    element: <Graph />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default Router;
