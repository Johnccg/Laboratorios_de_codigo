create database armas;
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

insert into Arma(Nombre,Clase,Rango,Daño,Manejo,URL)
values
("Splat roller", "Roller", 48, 45, 55, "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/c7/S3_Weapon_Main_Splat_Roller.png/384px-S3_Weapon_Main_Splat_Roller.png"),
("Splat charger", "Charger", 88, 50, 40, "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/41/S3_Weapon_Main_Splat_Charger.png/384px-S3_Weapon_Main_Splat_Charger.png"),
("Slosher", "Slosher", 58, 85, 50, "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/42/S3_Weapon_Main_Slosher.png/384px-S3_Weapon_Main_Slosher.png"),
("Heavy Splatling", "Splatling", 78, 38, 55, "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/5e/S3_Weapon_Main_Heavy_Splatling.png/384px-S3_Weapon_Main_Heavy_Splatling.png");

insert into Usuario(Nombre, Username, Contraseña)
values("John Doe","JohnDDD","Hola1234");

insert into Arma_Usuario(IDArma, Username)
values(1,"JohnDDD");

create table Rol(
	IDRol int auto_increment,
    Nombre varchar(40),
    created_at timestamp not null default current_timestamp,
    primary key (IDRol)
);

create table Privilegio(
	IDPrivilegio int auto_increment,
    Nombre varchar(40),
    created_at timestamp not null default current_timestamp,
    primary key (IDPrivilegio)
);

create table Usuario_Rol(
	IDRol int,
    Username varchar(100),
    created_at timestamp not null default current_timestamp,
    primary key (IDRol,Username),
    foreign key (IDRol) references Rol(IDRol),
    foreign key (Username) references Usuario(Username)
);

create table Rol_Privilegio(
	IDRol int,
    IDPrivilegio int,
    created_at timestamp not null default current_timestamp,
    primary key (IDRol,IDPrivilegio),
    foreign key (IDRol) references Rol(IDRol),
    foreign key (IDPrivilegio) references Privilegio(IDPrivilegio)
);

insert into Rol(Nombre)
values
("Editor"),#1
("Lector");#2

insert into Privilegio(Nombre)
values
("Editar Lista"),#1
("Ver Sitio");#2

insert into rol_privilegio(IDRol, IDPrivilegio)
values
(1,1),
(1,2),
(2,2);

insert into usuario_rol(IDRol, Username)
values
(1,"Johnccg"),
(2,"Unikv");

select *
from arma;


create procedure registrarArma(uNombre varchar(50), uClase varchar(30), uRango int, uDaño int, uManejo int, uURL varchar(255))
insert into arma(Nombre, Clase, Rango, Daño, Manejo, URL) values (uNombre, uClase, uRango, uDaño, uManejo, uURL);

create procedure eliminarArma(uID int)
delete from arma where IDArma = uID;

create procedure modificarArma(uID int, uNombre varchar(50), uClase varchar(30), uRango int, uDaño int, uManejo int, uURL varchar(255))
UPDATE Arma
SET Nombre = uNombre,
Clase = uClase,
Rango = uRango,
Daño = uDaño,
Manejo = uManejo,
URL = uURL
WHERE IDArma = uID;

create procedure modificarArmaSinImg(uID int, uNombre varchar(50), uClase varchar(30), uRango int, uDaño int, uManejo int)
UPDATE Arma
SET Nombre = uNombre,
Clase = uClase,
Rango = uRango,
Daño = uDaño,
Manejo = uManejo
WHERE IDArma = uID;

call registrarArma('Splatana Wiper', 'wiper', 58, 29, 75, 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/e5/S3_Weapon_Main_Splatana_Wiper.png/384px-S3_Weapon_Main_Splatana_Wiper.png');

call modificarArma(8, 'Joe', 'Mama', 0, 0, 0, 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/e5/S3_Weapon_Main_Splatana_Wiper.png/384px-S3_Weapon_Main_Splatana_Wiper.png');

call modificarArmaSinImg(1, 'Joe', 'Mama', 0, 0, 0);

call eliminarArma(9);