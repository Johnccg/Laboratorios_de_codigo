/*
Tablas:
Materiales(Clave, Descripción, Costo)
Proveedores(RFC, RazonSocial)
Proyectos(Numero,Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad) 
*/

SELECT *
FROM materiales;

SELECT descripcion, fecha
FROM materiales as M
JOIN entregan as E ON M.clave = E.clave
WHERE fecha between '2000-01-01' and '2000-12-31'

