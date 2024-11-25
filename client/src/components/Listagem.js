import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Listagem.css';
import logo from '../img/logo.png';

const Listagem = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3001/listar");
        if (!response.ok) {
          throw new Error(`Erro ao buscar clientes: ${response.status}`);
        }
        const data = await response.json();
        console.log("JSON Recebido:", data);
        setClientes(data); 
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      {/* Navbar fixa */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo-marca" />
            </Link>
            <Link to="/">
              <h3 className="logo-text">EQUIDÉ AV</h3>
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <a href="#contato">CONTATO</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Título e conteúdo da listagem */}
      <main className="register-section">
        <section className="register-container">
          <h1>Lista de Clientes e Cavalos</h1>
          {loading ? (
            <p>Carregando dados...</p>
          ) : clientes.length > 0 ? (
            <div>
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Cavalo</th>
                    <th>Idade do Cavalo</th>
                    <th>Raça</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente, index) => (
                    <tr key={index}>
                      <td>{cliente.cliente_nome}</td>
                      <td>{cliente.cavalo_nome}</td>
                      <td>{cliente.idade}</td>
                      <td>{cliente.raca}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </section>
      </main>

      {/* Rodapé */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src={logo} alt="Logo Equidé" />
            <h3>
              <span className="highlight">EQUIDÉ </span>
            </h3>
          </div>
          <div className="footer-column">
            <h3>ASSISTÊNCIA VETERINÁRIA</h3>
          </div>
          <div className="footer-column">
            <div className="contact-info" id="contato">
              <h4>CONTATO</h4>
              <a href="tel:+5561982858292">(61) 98296-7643</a>
              <h5>M.V Mariana Sousa</h5>
              <div className="footer-socials">
                <div className="icons">
                  <a
                    href="https://www.instagram.com/equide_av/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Equidé AV. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Listagem;
