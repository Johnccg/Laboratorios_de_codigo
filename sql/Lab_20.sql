/*
Tablas:
Materiales(Clave, Descripción, Precio)
Proveedores(RFC, RazonSocial)
Proyectos(Numero,Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad) 
*/

SELECT M.clave, M.descripcion
FROM materiales AS M
JOIN entregan AS E ON M.clave = E.clave
JOIN proyectos AS P ON P.numero = E.numero
WHERE P.denominacion = "México sin ti no estamos completos";

SELECT M.clave, M.descripcion
FROM materiales AS M
JOIN entregan AS E ON M.clave = E.clave
JOIN proveedores AS P ON P.rfc = E.rfc
WHERE P.razonsocial = "Acme tools";

SELECT P.rfc, avg(cantidad) as "Promedio de entregas"
FROM proveedores AS P
JOIN entregan AS E ON E.rfc = P.rfc
WHERE fecha between "2000-01-01" AND "2000-12-31"
GROUP BY E.rfc
HAVING avg(cantidad) >= 300;

SELECT descripcion, sum(cantidad) as "Total de entregas"
FROM materiales AS M
JOIN entregan AS E ON M.clave = E.clave
WHERE fecha between "2000-01-01" AND "2000-12-31"
GROUP BY descripcion;

CREATE VIEW total_compras_2001 AS
SELECT M.clave, sum(cantidad) as Total_de_entregas
FROM materiales AS M
JOIN entregan AS E ON M.clave = E.clave
WHERE fecha between "2001-01-01" AND "2001-12-31"
GROUP BY M.clave;

SELECT clave, Total_de_entregas
FROM total_compras_2001
WHERE Total_de_entregas = (SELECT max(Total_de_entregas)
							FROM total_compras_2001);

SELECT clave, descripcion
FROM materiales
WHERE descripcion LIKE "%ub%";

SELECT denominacion, sum(cantidad*precio) as "Total de proyecto"
FROM proyectos AS P
JOIN entregan AS E ON P.numero = E.numero
JOIN materiales AS M ON E.clave = M.clave
GROUP BY denominacion
ORDER BY denominacion;

/*Apoyo a Televisa en acción*/
CREATE VIEW Televisa AS
SELECT denominacion, E.rfc, razonsocial
FROM proyectos AS Py
JOIN entregan AS E ON E.numero = Py.numero
JOIN proveedores AS Pr ON Pr.rfc = E.rfc
WHERE denominacion = "Televisa en acción";

/*Apoya a Educando en Coahuila*/
CREATE VIEW Coahuila AS
SELECT denominacion, E.rfc, razonsocial
FROM proyectos AS Py
JOIN entregan AS E ON E.numero = Py.numero
JOIN proveedores AS Pr ON Pr.rfc = E.rfc
WHERE denominacion = "Educando en Coahuila";

SELECT * FROM Televisa AS T
LEFT JOIN Coahuila AS C ON T.rfc = C.rfc
WHERE C.rfc IS NULL;

SELECT denominacion, E.rfc, razonsocial
FROM proyectos AS Py
JOIN entregan AS E ON E.numero = Py.numero
JOIN proveedores AS Pr ON Pr.rfc = E.rfc
WHERE denominacion = "Televisa en acción" AND E.rfc NOT IN (SELECT E.rfc
														FROM proyectos AS Py
														JOIN entregan AS E ON E.numero = Py.numero
														JOIN proveedores AS Pr ON Pr.rfc = E.rfc
														WHERE denominacion = "Educando en Coahuila");

SELECT M.clave, descripcion, precio
FROM proyectos AS Py
JOIN entregan AS E ON E.numero = Py.numero
JOIN proveedores AS Pr ON Pr.rfc = E.rfc
JOIN materiales AS M ON M.clave = E.clave
WHERE denominacion = "Televisa en acción" AND E.rfc IN (SELECT E.rfc
													FROM proyectos AS Py
													JOIN entregan AS E ON E.numero = Py.numero
													JOIN proveedores AS Pr ON Pr.rfc = E.rfc
													WHERE denominacion = "Educando en Coahuila");

SELECT descripcion, count(*) as "# de entregas", sum(precio*cantidad) as "Costo de entregas"
FROM materiales AS M
JOIN entregan AS E ON E.clave = M.clave
GROUP BY descripcion;