import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Users from './pages/users';
import AddUser from './pages/addUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />}></Route>
      </Routes>
    </Router>
  );
}

export default App;