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
values("Juan Carlos","Johnccg","Hola1234");

insert into Arma_Usuario(IDArma, Username)
values(1,"Johnccg");

select *
from Arma