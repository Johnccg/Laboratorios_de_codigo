/*const lista_armas =[
    {
        nombre: "Splattershot",
        clase: "Shooter",
        rango: 50,
        dano: 47,
        manejo: 60,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/bf/S3_Weapon_Main_Splattershot.png/384px-S3_Weapon_Main_Splattershot.png"
    },
    {
        nombre: "Splat roller",
        clase: "Roller",
        rango: 48,
        dano: 45,
        manejo: 55,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/c7/S3_Weapon_Main_Splat_Roller.png/384px-S3_Weapon_Main_Splat_Roller.png"
    },
    {
        nombre: "Splat charger",
        clase: "Charger",
        rango: 88,
        dano: 50,
        manejo: 40,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/41/S3_Weapon_Main_Splat_Charger.png/384px-S3_Weapon_Main_Splat_Charger.png"
    },
    {
        nombre: "Slosher",
        clase: "Slosher",
        rango: 58,
        dano: 85,
        manejo: 50,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/42/S3_Weapon_Main_Slosher.png/384px-S3_Weapon_Main_Slosher.png"
    },
    {
        nombre: "Heavy Splatling",
        clase: "Splatling",
        rango: 78,
        dano: 38,
        manejo: 55,
        url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/5e/S3_Weapon_Main_Heavy_Splatling.png/384px-S3_Weapon_Main_Heavy_Splatling.png"
    }
]*/
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

    static delete(index){
        return db.execute(`CALL eliminarArma(?)`, [index])
    }

    static search(busqueda){
        return db.execute("SELECT * FROM Arma WHERE Nombre LIKE ? OR Clase LIKE ? OR Rango = ? OR Daño = ? OR Manejo = ?",['%' + busqueda + '%','%' + busqueda + '%', busqueda, busqueda, busqueda])
    }
}