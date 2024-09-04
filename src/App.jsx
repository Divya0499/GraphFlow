import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GraphForm from './components/GraphForm';
import Login from './components/Login';
import './App.scss';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/graphs" element={<GraphForm/> } />
      </Routes>
    </Router>
  );
};

export default App;
