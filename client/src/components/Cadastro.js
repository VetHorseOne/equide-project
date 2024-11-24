import React, { useState } from 'react'; // Importa useState para gerenciar o estado
import { Link } from 'react-router-dom'; // Importa Link para navegação
import './Cadastro.css';
import logo from '../img/logo.png';

const Cadastro = () => {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        address: '',
        email: '',
        subject: '',
        horseName: '',
        horseAge: '',
        horseBreed: '',
        horseHealth: ''
    });

    // Função para lidar com as mudanças nos campos do formulário
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, // Atualiza o estado do formulário
        });
    };

    // Função para lidar com o envio do formulário
    const handleCadastro = (event) => {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        console.log('Dados do cadastro:', formData);
        // Aqui você pode adicionar lógica para enviar os dados a um servidor, por exemplo
    };

    return (
        <div>
            {/* Navbar fixa */}
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
                            <Link to="/">HOME</Link> {/* Usando Link para redirecionar para a Home */}
                        </li>
                        <li>
                            <a href="#contato">CONTATO</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Seção de Registro */}
            <main className="register-section">
                <section className="register-container">
                    <h1>Cadastro de Cliente e Cavalo</h1>
                    <form className="register-form" onSubmit={handleCadastro}>
                        {/* Dados do Cliente */}
                        <fieldset>
                            <legend>Dados do Cliente</legend>
                            <label htmlFor="name">Nome Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Seu nome completo"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="cpf">CPF</label>
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="Seu CPF"
                                value={formData.cpf}
                                onChange={handleChange}
                                required
                                pattern="\d{11}"
                                maxLength="11"
                            />

                            <label htmlFor="address">Endereço</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Seu endereço"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Seu e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="subject">Assunto</label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Selecione o assunto
                                </option>
                                <option value="consulta">Consulta</option>
                                <option value="emergencia">Emergência</option>
                                <option value="fisioterapia">Fisioterapia</option>
                                <option value="chipagem">Chipagem</option>
                            </select>
                        </fieldset>

                        {/* Dados do Cavalo */}
                        <fieldset>
                            <legend>Dados do Cavalo</legend>
                            <label htmlFor="horse-name">Nome do Cavalo</label>
                            <input
                                type="text"
                                id="horse-name"
                                name="horseName"
                                placeholder="Nome do cavalo"
                                value={formData.horseName}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="horse-age">Idade</label>
                            <input
                                type="number"
                                id="horse-age"
                                name="horseAge"
                                placeholder="Idade em anos"
                                value={formData.horseAge}
                                onChange={handleChange}
                                required
                                min="0"
                            />

                            <label htmlFor="horse-breed">Raça</label>
                            <input
                                type="text"
                                id="horse-breed"
                                name="horseBreed"
                                placeholder="Raça do cavalo"
                                value={formData.horseBreed}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="horse-health">Condições de Saúde</label>
                            <textarea
                                id="horse-health"
                                name="horseHealth"
                                placeholder="Descreva condições especiais ou problemas de saúde"
                                rows="4"
                                value={formData.horseHealth}
                                onChange={handleChange}
                            ></textarea>
                        </fieldset>

                        {/* Botão de Envio */}
                        <button type="submit" className="submit-btn">
                            Concluir Cadastro
                        </button>
                    </form>
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
    );
};

export default Cadastro;