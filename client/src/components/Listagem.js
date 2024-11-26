import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Listagem.css';
import logo from '../img/logo.png';

const Listagem = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingClienteId, setEditingClienteId] = useState(null); // ID do cliente que está sendo editado

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

    const handleDelete = async (clienteId, cavaloId) => {
        try {
            const response = await fetch(`http://localhost:3001/excluir/${clienteId}/${cavaloId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Erro ao excluir cliente: ${response.status}`);
            }

            // Atualize a lista de clientes após a exclusão
            setClientes((prevClientes) =>
                prevClientes.filter(
                    (cliente) => cliente.cliente_id !== clienteId || cliente.cavalo_id !== cavaloId
                )
            );

            alert('Cliente e cavalo excluídos com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            alert('Ocorreu um erro ao excluir.');
        }
    };

    const handleEditClick = (clienteId) => {
        setEditingClienteId(clienteId); // Define o cliente que está sendo editado
    };

    const handleInputChange = (e, clienteId) => {
        const { name, value } = e.target;
        setClientes((prevClientes) =>
            prevClientes.map((cliente) =>
                cliente.cliente_id === clienteId ? { ...cliente, [name]: value } : cliente
            )
        );
    };

    const handleSaveClick = async (clienteId, cavaloId) => {
        const clienteToUpdate = clientes.find(cliente => cliente.cliente_id === clienteId);

        try {
            // Atualiza os dados do cliente
            const clienteResponse = await fetch(`http://localhost:3001/editar/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: clienteToUpdate.cliente_nome,
                    cpf: clienteToUpdate.cliente_cpf,
                    endereco: clienteToUpdate.cliente_endereco,
                    email: clienteToUpdate.cliente_email,
                    assunto: clienteToUpdate.cliente_assunto,
                }),
            });

            if (!clienteResponse.ok) {
                throw new Error(`Erro ao atualizar cliente: ${clienteResponse.status}`);
            }

            // Atualiza os dados do cavalo
            const cavaloResponse = await fetch(`http://localhost:3001/editar-cavalo/${cavaloId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: clienteToUpdate.cavalo_nome,
                    idade: clienteToUpdate.idade,
                    raca: clienteToUpdate.raca,
                    condicoes_saude: clienteToUpdate.condicoes_saude,
                }),
            });

            if (!cavaloResponse.ok) {
                throw new Error(`Erro ao atualizar cavalo: ${cavaloResponse.status}`);
            }

            alert('Cliente e cavalo atualizados com sucesso!');
            setEditingClienteId(null); // Sai do modo de edição
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert('Ocorreu um erro ao atualizar cliente ou cavalo.');
        }
    };


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
                                        <th>CPF</th>
                                        <th>Email</th>
                                        <th>Assunto</th>
                                        <th>Cavalo</th>
                                        <th>Idade do Cavalo</th>
                                        <th>Raça</th>
                                        <th>Condições de Saúde</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cliente) => (
                                        <tr key={cliente.cliente_id}>
                                            <td>
                                                {editingClienteId === cliente.cliente_id ? (
                                                    <input
                                                        type="text"
                                                        name="cliente_nome"
                                                        value={cliente.cliente_nome}
                                                        onChange={(e) => handleInputChange(e, cliente.cliente_id)}
                                                    />
                                                ) : (
                                                    cliente.cliente_nome
                                                )}
                                            </td>
                                            <td>
                                                {editingClienteId === cliente.cliente_id ? (
                                                    <input
                                                        type="text"
                                                        name="cliente_cpf"
                                                        value={cliente.cliente_cpf}
                                                        onChange={(e) => handleInputChange(e, cliente.cliente_id)}
                                                    />
                                                ) : (
                                                    cliente.cliente_cpf
                                                )}
                                            </td>
                                            <td>
                                                {editingClienteId === cliente.cliente_id ? (
                                                    <input
                                                        type="text"
                                                        name="cliente_email"
                                                        value={cliente.cliente_email}
                                                        onChange={(e) => handleInputChange(e, cliente.cliente_id)}
                                                    />
                                                ) : (
                                                    cliente.cliente_email
                                                )}
                                            </td>
                                            <td>
                                                {editingClienteId === cliente.cliente_id ? (
                                                    <input
                                                        type="text"
                                                        name="cliente_assunto"
                                                        value={cliente.cliente_assunto}
                                                        onChange={(e) => handleInputChange(e, cliente.cliente_id)}
                                                    />
                                                ) : (
                                                    cliente.cliente_assunto
                                                )}
                                            </td>
                                            <td>
                                                {editingClienteId === cliente.cliente_id ? (
                                                    <input
                                                        type="text"
                                                        name="cavalo_nome"
                                                        value={cliente.cavalo_nome}
                                                        onChange={(e) => handleInputChange(e, cliente.cliente_id)}
                                                    />
                                                ) : (
                                                    cliente.cavalo_nome
                                                )}
                                            </td>
                                            <td>
                                                {editingClienteId === cliente.cliente_id ? (
                                                    <input
                                                        type="number"
                                                        name="idade"
                                                        value={cliente.idade}
                                                        onChange={(e) => handleInputChange(e, cliente.cliente_id)}
                                                    />
                                                ) : (
                                                    cliente.idade
                                                )}
                                            </td>
                                            <td>
                                                {editingClienteId === cliente.cliente_id ? (
                                                    <input
                                                        type="text"
                                                        name="raca"
                                                        value={cliente.raca}
                                                        onChange={(e) => handleInputChange(e, cliente.cliente_id)}
                                                    />
                                                ) : (
                                                    cliente.raca
                                                )}
                                            </td>
                                            <td>
                                                {editingClienteId === cliente.cliente_id
                                                    ? (
                                                        <input
                                                            type="text"
                                                            name="condicoes_saude"
                                                            value={cliente.condicoes_saude}
                                                            onChange={(e) => handleInputChange(e, cliente.cliente_id)}
                                                        />
                                                    ) : (
                                                        cliente.condicoes_saude
                                                    )}
                                            </td>
                                            <td>
                                                {editingClienteId === cliente.cliente_id ? (
                                                    <button
                                                        className="save-button"
                                                        onClick={() => handleSaveClick(cliente.cliente_id, cliente.cavalo_id)}
                                                    >
                                                        Salvar
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="edit-button"
                                                        onClick={() => handleEditClick(cliente.cliente_id)}
                                                    >
                                                        Editar
                                                    </button>
                                                )}

                                                <button className="delete-button" onClick={() => handleDelete(cliente.cliente_id, cliente.cavalo_id)}>
                                                    Excluir
                                                </button>
                                            </td>
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