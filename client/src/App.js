import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from "./components/Cadastro";
import Home from "./components/Home";
import Listagem from "./components/Listagem"; // Importa o componente Listagem

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/listagem" element={<Listagem />} /> {/* Adiciona a rota para Listagem */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;