import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from "./components/Cadastro";
import Home from "./components/Home";
import Listagem from './components/Listagem';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/listagem" element={<Listagem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;