/*
Tablas:
Materiales(Clave, Descripción, Precio, Impuesto)
Proveedores(RFC, RazonSocial)
Proyectos(Numero,Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad) 
*/

SELECT *
FROM entregan;

# La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.

SELECT sum(cantidad) AS 'Entregas_totales', sum(cantidad*(precio+impuesto)) AS 'Importe_total'
FROM entregan AS E
JOIN materiales AS M ON E.clave = M.clave
WHERE fecha between '1997-01-01' AND '1997-12-31';

# Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas.

SELECT razonsocial, count(*) AS "Numero_entregas", sum(cantidad*(precio+impuesto)) AS 'Importe_total'
FROM proveedores AS P
JOIN entregan AS E ON E.rfc = P.rfc
JOIN materiales AS M ON M.clave = E.clave
GROUP BY razonsocial;

# Por cada material obtener la clave y descripción del material, la cantidad total entregada, la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.

SELECT M.clave, descripcion, sum(cantidad), min(cantidad), max(cantidad), sum(cantidad*(precio+impuesto)) AS 'Importe_total'
FROM materiales AS M
JOIN entregan AS E ON E.clave = M.clave
GROUP BY clave
HAVING avg(cantidad) > 400;

# Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado, detallando la clave y descripción del material, excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500.

SELECT razonsocial, M.clave, descripcion, avg(cantidad)
FROM proveedores AS P
JOIN entregan AS E ON P.rfc = E.rfc
JOIN materiales AS M ON E.clave = M.clave
GROUP BY razonsocial, M.clave
HAVING avg(cantidad) >= 500;

# Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para dos grupos de proveedores: aquellos para los que la cantidad promedio entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450. 

SELECT razonsocial, M.clave, descripcion, avg(cantidad)
FROM proveedores AS P
JOIN entregan AS E ON P.rfc = E.rfc
JOIN materiales AS M ON E.clave = M.clave
GROUP BY razonsocial, M.clave
HAVING avg(cantidad) < 370 OR avg(cantidad) > 450;

INSERT INTO materiales(clave, descripcion, precio, impuesto) Values
(2100, "Tornillo 8x2", 50, 5),
(2101, "Tornillo 5/16x1'60", 88, 8),
(2102, "Tornillo 7/16x2'40", 70, 7),
(2103, "Tornillo 1/46x2'5'", 85, 8),
(2104, "Tornillo 5/8x5'", 116, 11);

# Clave y descripción de los materiales que nunca han sido entregados.

SELECT clave, descripcion
FROM materiales
WHERE clave NOT IN (
					SELECT clave
                    FROM entregan);

# Razón social de los proveedores que han realizado entregas tanto al proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'.

SELECT DISTINCT PR.razonsocial
FROM proveedores AS PR
JOIN entregan AS E ON PR.rfc = E.rfc
JOIN proyectos AS PRO ON E.numero = PRO.numero
WHERE PRO.denominacion = 'Vamos México' AND razonsocial IN (
					SELECT razonsocial
					FROM proveedores AS PRS
					JOIN entregan AS ES ON PRS.rfc = ES.rfc
					JOIN proyectos AS PROS ON ES.numero = PROS.numero
					WHERE PROS.denominacion = 'Querétaro Limpio');

# Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'.

SELECT descripcion
FROM materiales
WHERE descripcion NOT IN (
				SELECT descripcion
                FROM entregan AS E
                JOIN materiales AS M ON M.clave = E.clave
                JOIN proyectos AS PR ON E.numero = PR.numero
                WHERE denominacion = 'CIT Yucatán');

# Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad entregada es mayor al promedio de la cantidad entregada por el proveedor con el RFC 'VAGO780901'.

INSERT INTO proveedores(rfc, razonsocial) VALUES
('VAGO780901', 'Ferreteria el pancho');

INSERT INTO entregan(clave, rfc, numero, fecha, cantidad) VALUES
(2100, 'VAGO780901', 5003, '2024-02-19', 300),
(2101, 'VAGO780901', 5007, '2024-03-29', 278),
(2102, 'VAGO780901', 5013, '2024-05-07', 500);

SELECT razonsocial, avg(cantidad)
FROM proveedores AS PR
JOIN entregan AS E ON PR.rfc = E.rfc
GROUP BY razonsocial
HAVING avg(cantidad) > (
						SELECT avg(cantidad)
                        FROM proveedores AS PR
                        JOIN entregan AS E ON PR.rfc = E.rfc
                        WHERE PR.rfc = 'VAGO780901');

# RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' y cuyas cantidades totales entregadas en el 2000 fueron mayores a las cantidades totales entregadas en el 2001. 

SELECT DISTINCT PR.rfc, razonsocial
FROM proveedores AS PR
JOIN entregan AS E ON PR.rfc = E.rfc
JOIN proyectos AS PRO ON E.numero = PRO.numero
WHERE denominacion = 'Infonavit Durango' AND (SELECT sum(cantidad)
												FROM entregan as EC1
												WHERE fecha between '2000-01-01' AND '2000-12-31' AND EC1.rfc = PR.rfc
												GROUP BY rfc) > (SELECT sum(cantidad)
																FROM entregan AS ec2
																WHERE fecha between '2001-01-01' AND '2001-12-31'  AND EC2.rfc = PR.rfc
																GROUP BY rfc);