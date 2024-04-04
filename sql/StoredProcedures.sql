/*
Tablas:
Materiales(Clave, Descripción, Precio, Impuesto)
Proveedores(RFC, RazonSocial)
Proyectos(Numero,Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad) 
*/
SELECT *
FROM materiales;

CREATE PROCEDURE registrarMaterial(uClave int, uDescripcion varchar(40), uPrecio float, uImpuesto float)
INSERT INTO materiales(clave, descripcion, precio, impuesto) VALUES (uClave, uDescripcion, uPrecio, uImpuesto);

CREATE PROCEDURE eliminarMaterial(uClave int)
DELETE FROM materiales WHERE clave = uClave;

CALL registrarMaterial(10000, 'granito', '100', '10');

CALL eliminarMaterial(10000);

DELIMITER $$
CREATE FUNCTION consultarTotalDeArmas ()
RETURNS int
BEGIN
	DECLARE total int;
    SET total = (SELECT count(*) FROM materiales);
RETURN total;
END$$

DELIMITER ;

DELIMITER $$
CREATE FUNCTION consultarTotalDeArmas ()
RETURNS INTEGER
	deterministic
BEGIN
	Declare total INT;
    Set total = (SELECT count(*) FROM materiales);
RETURN total;
END$$

DELIMITER ;

SELECT consultarTotalDeArmas();