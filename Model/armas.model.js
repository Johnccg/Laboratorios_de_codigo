const lista_armas =[
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
]

module.exports = class Arma {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre, mi_clase, mi_rango, mi_dano, mi_manejo, mi_url) {
        this.nombre = mi_nombre
        this.clase = mi_clase
        this.rango = mi_rango
        this.dano = mi_dano
        this.manejo = mi_manejo
        this.url = mi_url
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        lista_armas.push(this)
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return lista_armas
    }

    static get(index){
        console.log(lista_armas[index])
    }
    
    static assign(index,mi_nombre, mi_clase, mi_rango, mi_dano, mi_manejo, mi_url){
        lista_armas[index].nombre = mi_nombre
        lista_armas[index].clase = mi_clase
        lista_armas[index].rango = mi_rango
        lista_armas[index].dano = mi_dano
        lista_armas[index].manejo = mi_manejo
        lista_armas[index].url = mi_url
    }
}