import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import "./App.scss";
import ProtectedRoutes from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
