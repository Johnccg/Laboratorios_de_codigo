/*
-- DDL -- Lenguaje de definición de datos

CREATE, DROP, ALTER

Tablas, Vistas. Usuarios, Procedures, Funcion, Transacciones ....

-- DML -- Lenguaje de manipulación de datos

INSERT, UPDATE, DELETE

INSERT INTO Materiales VALUES 10000, "Martillo-Acme", 100

UPDATE materiales SET Descripción = "Martillo" Where Clave  1000

DELETE
*/

-- Muestra la clave, descripción y precio de todos los materiales agragados
SELECT Clave, descripcion, precio
FROM Materiales as M
JOIN Entregan as E ON M.Clave = E.clave;

-- Muestra el dato de veces entregados cada producto
SELECT Descripcion, precio, COUNT(*) as "Numero de entregas"
FROM Materiales as M
JOIN Entregan as E ON M.Clave = E.clave
GROUP BY Descripcion
ORDER BY Descripcion ASC;

-- Muestra la cantidad de unidades entregadas
SELECT Descripcion, precio, SUM(Cantidad) as "total de unidades entregadas"
FROM Materiales as M
JOIN Entregan as E ON M.Clave = E.clave
GROUP BY Descripcion
ORDER BY SUM(Cantidad) DESC;

-- Muestra la cantidad de unidades entregadas que sean mayores a 500
SELECT Descripcion, precio, SUM(Cantidad) as "total de unidades entregadas"
FROM Materiales as M
JOIN Entregan as E ON M.Clave = E.clave
GROUP BY Descripcion
HAVING SUM(Cantidad) > 500
ORDER BY SUM(Cantidad) DESC;

create schema armas;
use armas;

create table Arma(
	IDArma int not null auto_increment,
    Nombre varchar(50),
    Clase varchar(30),
    Rango int,
    Daño int,
    Manejo int,
    URL varchar(255),
    created_at timestamp not null default current_timestamp,
    primary key (IDArma)
);

create table Usuario(
	Nombre varchar(50),
    Username varchar(100) not null,
    Contraseña varchar(400),
    created_at timestamp not null default current_timestamp,
    primary key (Username)
);

create table Arma_Usuario(
	IDArma int,
    Username varchar(100),
    created_at timestamp not null default current_timestamp,
    primary key (IDArma,Username),
    foreign key (IDArma) references Arma(IDArma),
    foreign key (Username) references Usuario(Username)
);

insert into Arma(Nombre,Clase,Rango,Daño,Manejo,URL)
values("Splattershot", "Shooter", 50, 47, 60, "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/bf/S3_Weapon_Main_Splattershot.png/384px-S3_Weapon_Main_Splattershot.png");

insert into Usuario(Nombre, Username, Contraseña)
values("Juan Carlos","Johnccg","Hola1234");

insert into Arma_Usuario(IDArma, Username)
values(1,"Johnccg");

select *
from Arma_Usuario