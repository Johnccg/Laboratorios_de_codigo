const db = require("../Util/database");


module.exports = class Arma {

    constructor(mi_nombre, mi_clase, mi_rango, mi_dano, mi_manejo, mi_url) {
        this.nombre = mi_nombre
        this.clase = mi_clase
        this.rango = mi_rango
        this.dano = mi_dano
        this.manejo = mi_manejo
        this.url = mi_url
    }

    save() {
        return db.execute(
            `CALL registrarArma(?, ?, ?, ?, ?, ?)`,
            [this.nombre, this.clase, this.rango, this.dano, this.manejo, this.url]
        )
    }

    static fetchAll() {
        return db.execute("Select * from Arma")
    }

    static fetch(id){
        if (id){
            return this.fetchOne(id)
        }else{
            return this.fetchAll()
        }
    }

    static fetchOne(id){
        return db.execute("SELECT * FROM Arma WHERE IDArma=?",[id])
    }
    
    static assign(index, mi_nombre, mi_clase, mi_rango, mi_dano, mi_manejo, mi_url){
        return db.execute(`
        CALL modificarArma(?, ?, ?, ?, ?, ?, ?)`,
        [index, mi_nombre, mi_clase, mi_rango, mi_dano, mi_manejo, mi_url])
    }

    static assignSin(index, mi_nombre, mi_clase, mi_rango, mi_dano, mi_manejo){
        return db.execute(`
        CALL modificarArmaSinImg(?, ?, ?, ?, ?, ?)`,
        [index, mi_nombre, mi_clase, mi_rango, mi_dano, mi_manejo])
    }

    static delete(index){
        return db.execute(`CALL eliminarArma(?)`, [index])
    }

    static search(busqueda){
        return db.execute("SELECT * FROM Arma WHERE Nombre LIKE ? OR Clase LIKE ? OR Rango = ? OR Daño = ? OR Manejo = ?",['%' + busqueda + '%','%' + busqueda + '%', busqueda, busqueda, busqueda])
    }
}