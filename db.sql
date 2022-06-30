DROP DATABASE IF EXISTS Ebytr;

CREATE DATABASE Ebytr;

USE Ebytr;

CREATE TABLE Tasks (
    id INT NOT NULL auto_increment,
    name VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL,
    status VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;

INSERT INTO Ebytr.Tasks (name, createdAt, status) VALUES
    ("Algo", NOW(), 'Ativo');
