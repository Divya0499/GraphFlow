import { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import GraphForm from "./GraphForm";
import Login from "./Login";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const authenticated = localStorage.getItem("auth");

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  return (
    <Routes>
      {authenticated ? (
        <Route path="/graphs" element={<GraphForm />} />
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
};

export default ProtectedRoutes;
