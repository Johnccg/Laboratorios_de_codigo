const db = require('../Util/database')
const bcrypt = require("bcryptjs")

module.exports = class Usuario{
    constructor(mi_username, mi_nombre, mi_password){
        this.username = mi_username
        this.nombre = mi_nombre
        this.password = mi_password
    }

    save(){
        return bcrypt.hash(this.password,12).then((password_cifrado) => {
            return db.execute(
                `INSERT INTO Usuario(Nombre, Username, Contraseña)
                VALUES (?, ?, ?)`, 
                [this.nombre, this.username, password_cifrado]);
        })
        .catch((error) => {console.log(error)})
    }

    static fetch(username){
        return db.execute('Select * from Usuario WHERE Username = ?', [username]);
    }
}