import React from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import logo from "../img/logo.png";
import clinica from "../img/clinica.png";
import ortopedia from "../img/ortopedia.png";
import cruzVermelha from "../img/cruz-vermelha.png";
import resultados from "../img/resultados.png";
import informacoes from "../img/informacoes.png";
import exameMedico from "../img/exame-medico.png";
import vacina from "../img/vacina.png";
import fisioterapia from "../img/fisioterapia.png";
import apresentacao1 from "../img/apresentacao1.jpg";
import apresentacao2 from "../img/apresentacao2.jpg";
import apresentacao4 from "../img/apresentacao4.jpg";
import mariana from "../img/mariana.png";
import luisa from "../img/luisa.png";
import MySwiper from "./Carousel";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/"> {/* Usando Link para redirecionar para a Home */}
              <img src={logo} alt="logo-marca" />
            </Link>
            <Link to="/"> {/* Usando Link para redirecionar para a Home */}
              <h3 className="logo-text">EQUIDÉ AV</h3>
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#home">HOME</a>
            </li>
            <li>
              <a href="#detalhes">DETALHES</a>
            </li>
            <li>
              <a href="#servicos">SERVIÇOS</a>
            </li>
            <li>
              <a href="#sobre-nos">SOBRE NÓS</a>
            </li>
            <li>
              <a href="#contato">CONTATO</a>
            </li>
          </ul>
          <button className="contact-btn">
            <Link to="/cadastro" style={{ textDecoration: 'none', color: 'inherit' }}>
              FAÇA SEU AGENDAMENTO
            </Link>
          </button>
        </div>
      </nav>

      {/* Home */}
      <main id="home">
        <section className="home-section">
          <div className="home-introduction">
            <h1>
              <span className="highlight">EQUIDÉ </span>- ASSISTÊNCIA VETERINÁRIA
            </h1>
            <p>
              Bem-vindo ao mundo Equidé AV, onde o cuidado com cavalos é nossa
              paixão e especialidade. Somos uma comunidade dedicada a compartilhar
              conhecimento sobre a saúde, o bem-estar e o manejo correto dos equinos.
            </p>
            <button className="join-btn">
              <Link to="/cadastro" style={{ textDecoration: 'none', color: 'inherit' }}>
                AGENDE UMA CONSULTORIA
              </Link>
            </button>
          </div>
        </section>
      </main>

      {/* Detalhes */}
      <section id="detalhes">
        <h1 className="title">DETALHES DE UM CAVALO</h1>
        <div className="horse-details"></div>
        <div className="grass-details"></div>
      </section>

      {/* Serviços */}
      <section className="logos-section" id="servicos">
        <h3 className="logos-title">NOSSOS SERVIÇOS</h3>
        <div className="cards">
          {[
            { src: clinica, text: "CLÍNICO" },
            { src: ortopedia, text: "ORTOPEDIA" },
            { src: cruzVermelha, text: "EMERGENCIAL" },
            { src: resultados, text: "PLANEJAMENTO PARA ALTA PERFORMANCE" },
            { src: informacoes, text: "CHIPAGEM" },
            { src: exameMedico, text: "EXAMES DE AIE E MORMO" },
            { src: vacina, text: "CONTROLE DE VACINAS E VERMIFUGAÇÃO" },
            { src: fisioterapia, text: "FISIOTERAPIA E TERAPIA MANUAL" },
          ].map((service, index) => (
            <div className="logo-card" key={index}>
              <img src={service.src} alt={service.text} />
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre-nos" className="sobre-nos-section">
        <div className="section-header">
          <h2>SOBRE A EQUIDÉ AV</h2>
          <p className="subtitle">
            Transformando a vida dos cavalos com cuidado e conhecimento!
          </p>
        </div>
        <div className="about-content">
          <div className="about-images">
            <img src={apresentacao1} alt="Sobre 1" />
            <img src={apresentacao2} alt="Sobre 2" />
            <img src={apresentacao4} alt="Sobre 3" />
          </div>
          <div className="about-text">
            <p>
              Na <strong>Equidé AV</strong>, acreditamos que o cuidado com cavalos vai além do atendimento
              veterinário. Nossa missão é oferecer um atendimento especializado, pautado em conhecimento técnico
              e paixão pela vida animal.
              <br />
              Trabalhamos para que cada cavalo receba o cuidado que merece, ajudando nossos clientes a compreender
              melhor as necessidades dos seus animais e promovendo o bem-estar em todas as etapas.
            </p>
          </div>
        </div>
      </section>

      {/* Fundadores */}
      <section className="founders-section">
        <div className="section-header">
          <h2>QUEM SÃO OS FUNDADORES</h2>
          <p className="subtitle">
            Conheça as profissionais que lideram nossa missão de cuidado e inovação
          </p>
        </div>
        <div className="founders-container">
          {[
            {
              src: mariana,
              name: "M.V. Mariana Souza",
              title: "Sócia",
              desc:
                "Especialista em clínica e cirurgia de equinos, atuando atualmente como médica veterinária no 1° RCG.",
              instagram: "link_instagram1",
            },
            {
              src: luisa,
              name: "M.V. Luiza Gomes",
              title: "Sócia",
              desc: "Quiropraxista veterinária, atuando na área de clínica e terapias manuais para equinos.",
              instagram: "link_instagram2",
            },
          ].map((founder, index) => (
            <div className="founder-card" key={index}>
              <div className="image-wrapper">
                <img src={founder.src} alt={founder.name} />
              </div>
              <h3>{founder.name}</h3>
              <p>{founder.title}</p>
              <p>{founder.desc}</p>
              <div className="social-links">
                <a href={founder.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carrossel */}
      <MySwiper /> {/* Integrando o componente Carousel aqui */}

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
          {/* Botão do WhatsApp */}
          <div className="contact-whats">
            <a
              href="https://wa.me/554184648989"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            ></a>
          </div>
        </div>
      </footer>
    </div>
  )
};

export default Home;