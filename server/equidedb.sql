CREATE DATABASE equidedb;

USE equidedb;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    endereco VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    assunto ENUM('Consulta', 'Emergencia', 'Fisioterapia', 'Chipagem') NOT NULL
);

CREATE TABLE cavalo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    raca VARCHAR(100) NOT NULL,
    condicoes_saude TEXT
);

CREATE TABLE cliente_cavalo (
    cliente_id INT,
    cavalo_id INT,
    PRIMARY KEY (cliente_id, cavalo_id),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (cavalo_id) REFERENCES cavalo(id) ON DELETE CASCADE
);