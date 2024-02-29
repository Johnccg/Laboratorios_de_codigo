const filesystem = require("fs")

const http = require("http")

const html_header = `<!DOCTYPE html>
<html class = "no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laboratorios</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css" crossorigin="anonymous">
    </head>
    <body class="grid-container">
            <header>
                <p id = "intro">Juan Carlos calderón García | A01625694 | a01625696@tec.mx</p>
                <strong><a href="./Lab.html">Preguntas</a></strong> <strong><a href="./Laboratorio 6/index.html">Validador de contraseñas</a></strong>
            </header>
`

const html_footer = `<footer>
            <br><br>
            <p>Editado en: <a href="https://code.visualstudio.com/">Visual Studio Code</a></p>
        </footer>

        <script src="./scripts/POE.js"></script>
        <script src="./scripts/Lab_4.js"></script>
    </body>
</html>
`

//filesystem.writeFileSync("Hola.txt", "Hola desde node")
console.log("Promedio de [15, 42, 78, 23, 56, 91, 11, 37]:" + promedio([15, 42, 78, 23, 56, 91, 11, 37]))
console.log("Promedio de [67, 29, 84, 5, 50, 16, 73, 98]: " + promedio([67, 29, 84, 5, 50, 16, 73, 98]))
console.log("Promedio de [3, 61, 28, 92, 49, 7, 34, 80]: " + promedio([3, 61, 28, 92, 49, 7, 34, 80]))
console.log("Promedio de [17, 45, 88, 13, 70, 25, 56, 99]:" + promedio([17, 45, 88, 13, 70, 25, 56, 99]))
console.log("Promedio de [41, 82, 36, 60, 19, 75, 24, 55]: " + promedio([41, 82, 36, 60, 19, 75, 24, 55]))

crear_doc("Esto lo creó una función")

console.log("Con las galletas [1,1] y los niños [1,2,3] se alimentan " + asignar_galletas([1,2,3],[1,1]) + " niños")
console.log("Con las galletas [1,3,4,4,5] y los niños [1,2,3,7,4] se alimentan " + asignar_galletas([1,2,3],[1,1]) + " niños")

const servidor = http.createServer((request,response) => {
    console.log(request.url)
    response.setHeader("Content-Type","text/html")
    
    response.write(html_header)
    response.write(`
                <p id = "intro">Juan Carlos calderón García | A01625694 | a01625696@tec.mx</p>
                <strong><a href="./Lab.html">Preguntas</a></strong> <strong><a href="./Laboratorio 6/index.html">Validador de contraseñas</a></strong>
                <h1>Mis personajes favoritos</h1>
                <p>Esta es una lista de mis personajes favoritos, a continuación voy a explicar por qué  son de mis personajes favoritos.</p>
                
        
            <main>
                <h2>Kirby</h2>  
                <div class = "grid-x grid-padding-x">
                    <div class = "medium-8 large-4 cell">
                        <a href="https://es.wikipedia.org/wiki/Kirby_(personaje)"><img src="https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/9/95/latest/20220817125116/Kirby_en_Kirby_y_la_tierra_olvidada.png/1200px-Kirby_en_Kirby_y_la_tierra_olvidada.png" alt=""></a>
                    </div>
                    <div class = "medium-4 large-8 cell">
                        <p>
                            Hay 2 razones principales por las cuales Kirby es de mis personajes favoritos, la primera es simplemente porque Kirby me parece uno de los personajes más adorables que he visto.
                            <br>
                            La segunda es que cuando indagas un poco en la historia de los juegos descubir una historia sorprendentemente profunda y oscura que lleva a la conclusión de que Kirby es un asesino de dioses con poder iliminado
                            y me parece interesante y gracioso cómo todo ese poder está en una esfera rosa que lo único que hace en su tiempo libre es dormir y comer.
                        </p>
                    </div>
                </div>

                <h2>Inkling</h2>
                <div class = "grid-x grid-padding-x">
                    <div class = "medium-8 large-4 cell">
                    <a href="https://es.splatoonwiki.org/wiki/Inkling"><img src="https://images.wikidexcdn.net/mwuploads/esamiibo/thumb/8/8e/latest/20220811053230/Inkling.png/1200px-Inkling.png" alt=""></a>
                    </div>
                    <div class = "medium-4 large-8 cell">
                        <p>
                            Los Inkling no son un personaje en sí sino que son el personaje que usa el jugador en Splatoon y lo que hace que me guste es cada jugador puede darle un estilo único a su Inkling,
                            esto es debido a la gran cantidad de opciones que hay a la hora de personalizar la vestimenta del personaje en total hay 186 piezas de equipo divididas en 3 categorías accesorio, ropa y calzado, además de esto es posible cambiar el aspecto del mismo personaje.
                            En mi opinión esta libertad hace que me sea más fácil invisionarme como el personaje.
                            <br>
                            Además el mundo del juego avanca al mismo tiempo que el tiempo real eso hace que siento que estoy creciendo al mismo tiempo que el juego todo esto es ayudado por el hecho de que puedes ver cómo tu personaje
                            crece a través de los distintos juegos ya que protagonistas anteriores se vuelven su propio personaje en entregas futuras.
                        </p>
                    </div>
                </div>
        
                <h2>Luigi</h2>
                <div class = "grid-x grid-padding-x">
                    <div class = "medium-8 large-4 cell">
                        <a href="https://es.wikipedia.org/wiki/Luigi"><img src="https://www.pngall.com/wp-content/uploads/2/Mario-Transparent.png" alt=""></a>
                    </div>
                    <div class = "medium-4 large-8 cell">
                        <p>
                            Luigi fué uno de los primeros personaes de videojuegos que conocí y en un principio me gustaba simplemente porque se vestía de verde y mi color favorito es el verde,
                            fué hasta que jugué la saga de Luigi's mansion que vi una representación con más personalidad de Luigi que empecé a considerarlo como uno de mis favoritos.
                            <br>
                            Luigi tiene una personalidad que no parecería la de un heroe, el es algo cobarde, miedoso y no le gusta tomar riesgos, pero a pesar de eso se lanza a la acción cuando se necesita
                            y es esta valentía y fuerza de voluntad que tiene para seguir adelante a pesar de que obviamente está aterrado y fuera de su zona de confort que me hace disfrutar cuando se muestra este lado de Luigi.
                        </p>
                    </div>
                </div>
                
                <br>
                <a href="#0" id="boton_q" class="button">Cambio</a>
    
                <h2>Qiqi</h2>
                <div class = "grid-x grid-padding-x">
                    <div class = "medium-8 large-4 cell">
                        <a href="https://genshin-impact.fandom.com/es/wiki/Qiqi"><img src="https://genshin.global/wp-content/uploads/2022/05/qiqi-cryo-character-genshin-impact.webp" alt=""></a>
                    </div>
                    <div class = "medium-4 large-8 cell">
                        <p>
                            Qiqi empezó de forma similar a Luigi, me gusta la temática de fantásmas y no muertos en los videojuegos y tengo un gran interés en todo tipo de mitología y folclore,
                            por lo que cuando vi que Qiqi era un jiangshi (Algo similar a un zombie en la cultura China) me enamoré con su diseño y una vez apareció en la historia amé como habla,
                            Qiqi habla en un tono monótono lo que siento que es muy apropiada para el concepto y así ha pasado cada vez que he aprendido más sobre Qiqi más me he interesado en su personaje.
                        </p>
                    </div>
                </div>
    
                <br>
                <a href="javascript:contar()" class="button">Contador</a>
                <a href="javascript:suma_aleatoria()" class="button">Suma aleatoria</a>
                    
                <div id = "Placeholder">
                    Esto se va a reemplazar
                </div>
                    
                <div id = "funciones">
                    <h1>Pruebas de las funciones:</h1>
                </div>
            </main>
    `)
    response.write(html_footer)

    response.end()
})

servidor.listen(3000)

function promedio(arr_num){
    let prom = 0
    
    for(let i of arr_num)
    {
        prom += i
    }

    prom = prom/arr_num.length

    return prom
}

function crear_doc(string){
    filesystem.writeFileSync("Node.txt", string)
}

//greed es cuanta habre tiene los niños y galleta cuanta habre satisface la galleta
function asignar_galletas(greed, galleta){

    let resp = 0

    greed.sort(function(a,b){return a - b})
    galleta.sort(function(a,b){return a - b})

    for(let i = 0; i < galleta.length; i++)
    {
        if(greed.length == 0)
        {
            break
        }

        if (greed[0] <= galleta[i])
        {
            resp++
            greed.shift()
        }
    }

    return resp;
}

/*
const armas = [
    {
        arma: "Splattershot",
        alcance: "medio",
        vel_disparo: "Rápida"
    },
    {
        arma: "Inkbrusk",
        alcance: "Corto",
        vel_disparo: "Rápida"
    }
]

const servidor = http.createServer((request,response) => {
    if (request.url == "/"){
        console.log(request.url)
        response.setHeader("Content-Type","text/html")
        response.write(html_header)
        response.write(`<h2>Lista de armas</h2>`)
        response.write(html_footer)
        response.end()
        
    }else if(request.url == "/crear"){
            response.setHeader("Content-Type","text/html")
            response.write(html_header)
            response.write(`<h2>Crear una nueva arma</h2>
            <form acion = "/crear" method = "POST">
            <label>Nombre del arma
            <input type = "text" id = "Arma" name = "Arma">
            </label>
            
            <label>Rango del arma
            <input type = "text" id = "Alcance" name = "Alcance"> 
            </label>
            
            <label>Velocidad de disparo
            <input type = "text" id = "Vel_disp" name = "Vel_disp">
            </label>
                    
            <input type="submit" class="button" value="Submit">
            </form>
            `)
            response.write(html_footer)  
            response.end()
    }else{
            response.statusCode = 404
            response.setHeader("Content-Type","text/html")
            response.write("404 La página no existe")
            response.end()
    }
})

servidor.listen(3000)
*/