const db = require('../Util/database')
const bcrypt = require("bcryptjs")

module.exports = class Usuario{
    constructor(mi_username, mi_nombre, mi_password){
        this.username = mi_username
        this.nombre = mi_nombre
        this.password = mi_password
    }

    save(){
        return bcrypt.hash(this.password,12)
        .then(async (password_cifrado) => {
            return db.execute(`CALL registrarUsuario(?, ?, ?)`,
            [this.nombre, this.username, password_cifrado])
        }).catch((error) => {
            console.log(error)
        })
    }

    static fetch(username){
        return db.execute('Select * from Usuario WHERE Username = ?', [username]);
    }

    static getPermisos(username){
        return db.execute(`
        SELECT P.Nombre
        FROM privilegio P
        JOIN rol_privilegio AS RP ON P.IDPrivilegio = RP.IDPrivilegio
        JOIN rol AS R ON R.IDRol = RP.IDRol
        JOIN usuario_rol AS UR ON R.IDRol = UR.IDRol
        JOIN usuario AS U ON U.Username = UR.Username
        WHERE U.username = ?`,
        [username])
    }
}