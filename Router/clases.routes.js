const html_header = `<!DOCTYPE html>
<html class = "no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laboratorios</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css" crossorigin="anonymous">
    </head>
    <body>
            <header>
                <div class="top-bar" id="responsive-menu">
                    <li><img src="" alt="Imágen aquí"></li>
                    <div class="top-bar-left">
                        <ul class="dropdown menu" data-dropdown-menu>
                            <li><a href="/">Home</a></li>
                            <li><a href="/preguntas">Preguntas</a></li>
                            <li><a href="/validar">Validador de contraseñas</a></li>
                            <li><a href="/armas_lista">Lista de armas</a></li>
                            <li><a href="/armas_lista/crear">Crear arma</a></li>
                        </ul>
                    </div>
                </div>
                <p id = "intro">Juan Carlos calderón García | A01625694 | a01625696@tec.mx</p>
            </header>
            <main class="grid-container">
`

const html_footer = `
        </main>
        <footer>
            <br><br>
            <p>Editado en: <a href="https://code.visualstudio.com/">Visual Studio Code</a></p>
        </footer>
    </body>
</html>
`

const express = require("express")
const router = express.Router()
const filesystem = require("fs")

router.get("/validar", (request, response, next) => {
    let html = html_header
    html +=`
    <div class="primary callout">
        <h1>Valida tu contraseña</h1>

        <p>
            Tu contraseña debe tener el menos:
            <ul>
                <li>10 carascteres</li>
                <li>Letras en mayúscula y minuscula</li>
                <li>Números</li>
                <li>caracteres especiales ($, @, %, &, etc.)</li>
            </ul>
        </p>

        <div class = "grid-x grid-padding-x">
            <div class="medium-4 large-4 small-4 cell">
                Ingresa tu contraseña<br>
                Vuelve a ingresar tu contraseña
            </div>
            <div class="medium-4 large-4 small-4 cell">
                <form action="/validar" method="POST">
                    <input id="pswrd" name="pswrd" type="password">
                    <input id="pswrd_confirm" name="pswrd_confirm" type="password">
                    <span id="similitud">                            
                        <br>La contraseña no concuerda
                    </span><br>
                    <input id="hidden" name="hidden" type="hidden">
                    <button type="submit" class="success button" id="submit" value="Contraseña">Confirmar</button>
                </form>
            </div>
            <div class="medium-4 large-4 small-4 cell">
                <span id="fortaleza"></span>
            </div>
        </div>
    </div>
    <script>
        const button = document.getElementById("submit")
        const hidden = document.getElementById("hidden")
        const input_1 = document.getElementById("pswrd")
        const input_2 = document.getElementById("pswrd_confirm")
        const verify = document.getElementById("similitud")
        const fuerte = document.getElementById("fortaleza")
        verify.style.visibility = "hidden"

        setInterval(function() {
            
                if (input_1.value){
                
                    let caracteres = revisar(input_1.value)

                    if (input_1.value.length < 10){
                        fuerte.innerHTML = "Débil"
                        fuerte.style.color = "red"
                    }else if (input_1.value.length >= 13 && caracteres.letras_may > 1 && caracteres.letras_min > 1 && caracteres.num > 1 && caracteres.special > 1) {
                        fuerte.innerHTML = "Fuerte"
                        fuerte.style.color = "green"
                    }else{
                        fuerte.innerHTML = "Suficiente"
                        fuerte.style.color = "rgb(125, 166, 41)"
                    }
                }
            },1000)


        button.onclick = () => {
            let password = input_1.value
            let p_confirm = input_2.value

            let caracteres = revisar(input_1.value)

            if (input_1.value != input_2.value){
                verify.style.visibility = "visible"
                hidden.value = "La contrasena no concuerda"
                return
            }else{
                verify.style.visibility = "hidden"
            }

            if (input_1.value.length < 10 || caracteres.letras_may < 1 || caracteres.letras_min < 1 || caracteres.num < 1 || caracteres.special < 1){
                hidden.value = "Contrasena no valida"
            }else{
                hidden.value = "Contrasena valida"
            }
        }

        function revisar(pswrd)
        {
            let temp
            const resp = {letras_min:0, letras_may:0, num:0, special:0}

            for (let i = 0; i < pswrd.length; i++){
                temp = pswrd.charCodeAt(i)

                if (temp >= 48 && temp <= 57){
                    resp.num++
                }else if (temp >= 65 && temp <= 90) {
                    resp.letras_may++
                }else if (temp >= 97 && temp <= 122) {
                    resp.letras_min++
                }else{
                    resp.special++
                }
            }

            return resp
        }
    </script>
    `
    html += html_footer
    response.send(html)
})

router.post("/validar", (request, response, next) => {
    console.log(request.body)
    let pass = "Contraseña " + request.body.pswrd + " ";
  
    pass += "Validar contraseña " + request.body.pswrd_confirm + " ";
  
    pass += "Estado de la contraseña " + request.body.hidden;
  
    filesystem.writeFileSync("Contraseña.txt", pass)
    
    response.redirect("/validar")
})

router.get("/preguntas",(request, response, next) => {
    let html = html_header
    html += `
    <section>
        <ul>
            <li> <a href="#lab1">Lab1</a> 
            <li> <a href="#lab3">Lab3</a> 
            <li> <a href="#lab4">Lab4</a> 
            <li> <a href="#lab5">Lab5</a> 
            <li> <a href="#lab6">Lab6</a> 
            <li> <a href="#referencias">Referencias</a> 
        </ul>
        <h1>Preguntas</h1>
    </section>

    <section>
        <div id="lab1">
            <h2>Laboratorio 1: Introducción a las aplicaciones web, HTML5 y ciclo de vida de los sistemas de información</h2>

            <h4>¿Cuál es la diferencia entre Internet y la World Wide Web?</h4>
            <p>
                El internet es la red de dispositivos físicos como computadoras, routers y servidores, en cambio la World Wide Web es todo el contenido al que se puede acceder con dichos dispositivos.
            </p>
            
            <h4>¿Cuáles son las partes de un URL?</h4>
            <p>
                Una URL se divide en 4 partes ek esquema, el host, la dirección y la búsqueda
                <ol>
                    <li>El esquema es el protocolo que se va a usar para acceder al recurso en el Internet y puede ser HTTP o HTTPS.
                    <li>El host es quén tiene el recurso al que se está accediendo, también se le llama el dominio.
                    <li>La dirección identifica el elemento específico al que se quiere acceder.
                    <li>La búsqueda manda información al recurso que se está accediendo.
                </ol>
            </p>
            
            <h4>¿Cuál es el propósito de los métodos HTTP: GET, HEAD, POST, PUT, PATCH, DELETE?</h4>
            <p>
                <ul>
                    <li>GET: Se utiliza para obtener información de un servidor utilizando una URI.
                    <li>HEAD: Al igual que Get se utiliza para obtener información, pero en este caso solo regresa la linea de estatus y el header
                    <li>POST: Manda información al servidor.
                    <li>PUT: Reemplaza todas las representaciones del recurso elegido con el contenido subido.
                    <li>PATCH: Aplica modificaciones parciales a un recurso.
                    <li>DELETE: Elimina todas las representaciones del recurso correspondiente a una URI.
                </ul>
            </p>
            
            <h4>¿Qué método HTTP se debe utilizar al enviar un formulario HTML, por ejemplo cuando ingresas tu usuario y contraseña en algún sitio? ¿Por qué?</h4>
            <p>
                Se debería utilizar POST ya que se tiene que enviar la información del fromulario al servidor de forma cifrada.
            </p>
            
            <h4>¿Qué método HTTP se utiliza cuando a través de un navegador web se accede a una página a través de un URL?</h4>
            <p>
                Se utiliza GET para obtener el recurso ligado a la URL.
            </p>
            
            <h4>Un servidor web devuelve una respuesta HTTP con código 200. ¿Qué significa esto? ¿Ocurrió algún error?</h4>
            <p>
                Mo ocurrió ningún error el código 200 significa que la solicitud fué exitosa.
            </p>
            
            <h4>¿Es responsabilidad del desarrollador corregir un sitio web si un usuario reporta que intentó acceder al sitio y se encontró con un error 404? ¿Por qué?</h4>
            <p>
                No, ya que los errores 4xx son errores del lado del cliente
            </p>
            
            <h4>¿Es responsabilidad del desarrollador corregir un sitio web si un usuario reporta que intentó acceder al sitio y se encontró con un error 500? ¿Por qué?</h4>
            <p>
                Si, ya que los errores 5xx son errores del lado del servidor, en este caso es porque hubo un caso que el desarrollador no consideró y llevó a que no hubiera forma de completar la operación.
            </p>
            
            <h4>¿Qué significa que un atributo HTML5 esté depreciado o desaprobado (deprecated)? Menciona algunos elementos de HTML 4 que en HTML5 estén desaprobados.</h4>
            <p>
                Significa que el atributo no se debería utilizar ya que se introdujo un elemento más novedoso que cumple la misma fucnión y es mejor o más claro. Por ejemplo varios atributos de estilo como background, bgcolor, align, color y border fueron depreciados en favor del uso de CSS para el estilo de la página.
            </p>
            
            <h4>¿Cuáles son las diferencias principales entre HTML 4 y HTML5?</h4>
            <p>
                HTML5 hizo cambios que hacer más fácil leer el código de una página al crear etiquetas que son más semánticas, además de incluir el uso de CSS y JavaScript.
            </p>
            
            <h4>¿Qué componentes de estructura y estilo tiene una tabla?</h4>
            <p>
                &lttable&gt es la tag para iniciar una tabla dentro de esta &ltthead&gt, &lttbody&gt y &lttfoot&gt son etiquetas semánticas que ayudan a dividir las partes de la tabla y para crear la tabla en sí se usa: &ltcaption&gt pata añadir un título o descripción &lttr&gt para las líneas, &ltth&gt para las celdas de encabezado y &lttd&gt  para una celda normal.
                <br>Para el estilo puedes modificar los siguientes elementos:
                <ul>
                    <li>El espaciado de las celdas con width y si se necesita untamaño para cada columna en lugar de usar una id o clase para cada columa se puede usar thead th:nth-child(x) para seleccionar la columna que se quiera
                    <li>El texto de la tabla con elementos como font-family text-align y letter-spacing.
                    <li>El borde de la tabla con los varios atributos que empiezan con border.
                    <li>La ubicación del caption.
                    <li>El fondo de cada celda y la tabla en sí.
                </ul>
            </p>

            <h4>¿Cuáles son los principales controles de una forma HTML5?</h4>
            <p>
                <ul>
                    <li>Campos de texto de una línea &ltinput tpype = "text"&gt
                    <li>Campos de contraseña &ltinput tpype = "password"&gt, igual que un campo de texto, pero oculta lo que se está escribiendo
                    <li>Contenido oculto &ltinput tpype = "hidden"&gt, no aparece en el form, sino que se usa para mandar información al servidor junto con el resto de los datos
                    <li>Casillas de verificación &ltinput tpype = "checkbox"&gt, permite seleccionar varias opciones y cada input es una opción
                    <li>Botón de opción &ltinput tpype = "radio"&gt, solo permite seleccionar una opción y cada input es una opción
                    <li>Botón de envío &ltinput tpype = "submit"&gt, Envía los datos ingresados al servidor
                    <li>Botón de reinicio &ltinput tpype = "reset"&gt, restablece todos los controles a su valor por defecto
                    <li>Botón &ltinput tpype = "butto"&gt, botón cuya función se puede definir con JavaScript
                    <li>Botón imagen &ltinput tpype = "image"&gt, se comporta igual que un botón de envío, pero aparece como una imágen
                    <li>Selector de archivos &ltinput tpype = "file"&gt, Permite subir archivos al servidor
                </ul>
            </p>
            
            <h4>¿Qué tanto soporte HTML5 tiene el navegador que utilizas?</h4>
            <p>
                Utilizo firefox con mi navegador y de acuerdo a html5test.com mi navegador soporta 522/571 funciones evaluadas.
            </p>
            
            <h4>¿Cuál es el ciclo de vida de los sistemas de información?</h4>
            <p>
                El ciclo de vida de los sistemas de información sigue las siguientes fases:
                <ol>
                    <li>Fase de planificación: Se establecen los objetivos del proyecto, se identifican los recursos necesarios y se elabora un plan detallado
                    <li>Fase de análisis: Se recopilan y evalúan los requisitos del sistema. 
                    <li>Fase de diseño: La creación de la arquitectura del sistema basada en los requisitos establecidos en la fase de análisis
                    <li>Fase de desarrollo: Se escribe el código del sistema según las especificaciones del diseño
                    <li>Fase de pruebas: Se realizan pruebas de unidad, integración y sistema para identificar y corregir posibles errores y garantizar la estabilidad del sistema.
                    <li>Fase de implementación: Se realiza la instalación y la formación del personal para que pueda utilizar el nuevo sistema de manera efectiva.
                    <li>Fase de mantenimiento: Se centra en corregir errores, realizar mejoras y adaptarse a cambios en los requisitos del usuario, la duración de esta fase debe ser significativo para asegurarse que el sistema funciona de forma correcta
                </ol>
                (KeepCoding, 2023)
            </p>

            <h4>¿Cuál es el ciclo de desarrollo de sistemas de información?</h4>
            <p>
                El ciclo de desarrollo de un sistema es el mismo que el ciclo de vida, pero este se detiene despues de la etapa de pruebas.
            </p>
        </div>

        <div id="lab3">
            <h2>Laboratorio 3: CSS</h2>
            <h4>Como ingeniero de software ¿cuál es tu recomendación sobre el uso de !important en un CSS? </h4>
            <p>
                !important casi no debería usarse porque como tiene preferecnia sobre <strong> CUALQUIER</strong> selector es fácil sobreescribir reglas que no querías y que necesites utilizar muchos !important y que tu CSS quede hecho un desastre,
                esto no significa que no se pueda usar nunca hay casos específicos donde puede ser útil si se usa concuidado, por ejemplo si tienes un elemento de una clase dentro de un div con una ID lo puedes usar para forzar a que use el formato de la clase.
            </p>
            
            <h4>Si se pone una imagen de fondo en una página HTML, ¿por qué debe escogerse con cuidado?</h4>
            <p>
                Las imágenes pueden ser muy pesadas, así que usar una para el fondo puede realentizar la página, además dependiendo de la imágen puede no adaptarse bien a cambios en el tamaño de la pantalla y no vesre bien en dispositivos móviles,
                además si la imágen es de un color similar al texto o si tiene musho ruido puede hacer difícil leer texto que pueda tener encima.
            </p>

            <h4>Como ingeniero de software, ¿cuál es tu recomendación al elegir las unidades de un propiedad de estilo entre %, px y pt?</h4>
            <p>
                Considero que las mejores unidades son % y px, px te permite ser preciso respecto al tamaño, por lo que para elementos que raramente cambian de tamaño según la pantalla como bordes en elementos es útil,
                en cambio % permite que los elementos se adapten al tamaño del contenedor, esto permite que si se cambia el tamaño de la pantalla los emementos pueden ajustar su tamaño para permanecer a la misma proporción
                y mantener el diseño de la página.
            </p>
            
            <h4>¿Por qué el uso de una versión minimizada del CSS mejora el rendimiento del sitio?</h4>
            <p>
                Porque mientras hacemos el css le damos un cierto formato con espacios en blanco como nuevas líneas y tabuladores, estos espacios hacen que el navegador tenga que descargar y procesar menos infroamción, agilizando el rendimiento de la página.
            </p>
        </div>

        <div id="lab4">
            <h2>Laboratorio 4: Fundamentos de JavaScript</h2>

            <h4>¿Qué diferencias y semejanzas hay entre Java y JavaScript?</h4>
            <p>
                Ambos se relacionan en el sentido de que ambos son lenguajes orientados a objetos, pero en el resto se diferencían mucho. Java es un programa que debe compilarse, mientras que JavaScript solo es interpretado,
                las variables de Java solo pueden almacenar un solo tipo de datos, mientras que en JavaScript este no es el caso y la misma variable puede tener varios tipos de dato, Java se ejecuta en su propia máquina virtual y JavaScript se ejecuta en navegadores
            </p>

            <h4>¿Qué métodos tiene el objeto Date? (Menciona al menos 5*)</h4>
            <p>
                <ul>
                    <li>getDate() Regresa el número del día de la fecha indicada de actuerdo al tiempo actual
                    <li>getDay() Regresa el día de la semana de la fecha indicada, el resultado es un número del 1-7 representando uno de los días de la semana
                    <li>getTimezoneOffset()Toma una fecha, la evalúa en UTC y regresa la diferencia entre la fecha indicada y el horario actual
                    <li>now() Regresa los milisegundos que han pasado desde el 1° de enero de 1970
                    <li>parse() Toma un string con una fecha y regresa el número de milisagundos al igual que now()
                </ul>
            </p>

            <h4>¿Qué métodos tienen los arreglos? (Menciona al menos 5*)</h4>
            <p>
                <ul>
                    <li>push() Añade el elemento indicado al final del arreglo
                    <li>pop() Elimina el último elemento del arreglo y lo regresa
                    <li>slice() Regresa una copia del intervalo indicado del arreglo, esto no modifica el arreglo
                    <li>fill() Cambia los valores de un arreglo por el valor indicado a partir del índice indicado
                    <li>filter() Crea un nuevo arreglo con los valores que cumplan la condición
                </ul>
            </p>

            <h4>¿Cómo se declara una variable con alcance local dentro de una función?</h4>
            <p>
                Par declarar una variable se puede utilizar tanto var como let, para declarar una variable local se debe usar let.
            </p>

            <h4>¿Qué implicaciones tiene utilizar variables globales dentro de funciones?</h4>
            <p>
                Que una variable que solo debería existir dentro de la ejecución de una variable va a existir en todo el programa, esto puede causar problemas con redefinir la misma variable y ocupa más espacio ya que las variables nunca desaparecen.
            </p>
        </div>

        <div id="lab5">
            <h2>Lab 5: Frameworks de estilo</h2>

            <h4>Describe Material design</h4>
            <p>
                Es un sistema de lienamientos, componentes y herramientas desarrollado pod Google para ayudar con el desarrollo para Android, iOS, Flutter y la web
            </p>
        </div>

        <div id="lab6">
            <h2>Lab 6: Programación orientada a eventos</h2>
            
            <h4>¿Por qué es una buena práctica usar JavaScript para checar que sean válidos los inputs de las formas antes de enviar los datos al servidor?</h4>
            <p>
                Porque es posible añadir el atributo novalidate al form o al botón de submit y saltarse enviar datos válidos y para facilitar que el usuario pueda corregir errores en su submisión.
            </p>

            <h4>¿Cómo puedes saltarte la seguridad de validaciones hechas con JavaScript?</h4>
            <p>
                Puedes desactivar el JavaScript del navegador desde las opciones del navegador para que cuando subas datos no ejecute el script.
            </p>

            <h4>Si te puedes saltar la seguridad de las validaciones de JavaScript, entonces ¿por qué la primera pregunta dice que es una buena práctica?</h4>
            <p>
                Porque a pesar de no ser tan segura ayuda a mejorar la experiencia del usuario y evitar el retraso de que la información tenga que viajar desde el usuario hasta el servidor y de regreso.
            </p>
        </div>

        <div id="referencias">
            <br>
            <h2>Referencias: </h2>
            <ol>
                <li>testdevelocidad.es. (2020). <em>Internet vs WWW: en qué se diferencian.</em> Recuperado de: <a href="https://www.testdevelocidad.es/2020/09/25/diferencias-internet-www/">https://www.testdevelocidad.es/2020/09/25/diferencias-internet-www/.</a> 
                <li>IBM. (2024). <em>The components of a URL.</em> Recuperado de: <a href="https://www.ibm.com/docs/en/cics-ts/6.1?topic=concepts-components-url">https://www.ibm.com/docs/en/cics-ts/6.1?topic=concepts-components-url.</a>
                <li>Tutorialspoint. (s.f.). <em>HTTP - Methods.</em> Recuperado de: <a href="https://www.tutorialspoint.com/http/http_methods.htm">https://www.tutorialspoint.com/http/http_methods.htm.</a>
                <li>Mozilla (s.f.). <em>Métodos de petición HTTP.</em> Recuperado de: <a href="https://developer.mozilla.org/es/docs/Web/HTTP/Methods">https://developer.mozilla.org/es/docs/Web/HTTP/Methods.</a>
                <li>Tutorialspoint. (s.f.). <em>HTTP - Status Codes.</em> Recuperado de: <a href="https://www.tutorialspoint.com/http/http_status_codes.htm">https://www.tutorialspoint.com/http/http_status_codes.htm.</a>
                <li>Barrena A. (2016). <em>Lista de elementos y atributos obsoletos en HTML5.</em> Recuperado de: <a href="https://www.anerbarrena.com/elementos-atributos-obsoletos-html5-5165/">https://www.anerbarrena.com/elementos-atributos-obsoletos-html5-5165/.</a>
                <li>Sooluciona. (s.f.). <em>Diferencias entre HTML4 y HTML5</em> Recuperado de: <a href="https://sooluciona.com/diferencias-entre-html4-y-html5/">https://sooluciona.com/diferencias-entre-html4-y-html5/.</a>
                <li>Mozilla. (s.f.). <em>Estilizando tablas</em> Recuperado de: <a href="https://developer.mozilla.org/es/docs/Learn/CSS/Building_blocks/Styling_tables">https://developer.mozilla.org/es/docs/Learn/CSS/Building_blocks/Styling_tables.</a>
                <li>Mozilla. (s.f.). <em>Controles de formulario originales</em> Recuperado de: <a href="https://developer.mozilla.org/es/docs/Learn/Forms/Basic_native_form_controls">https://developer.mozilla.org/es/docs/Learn/Forms/Basic_native_form_controls.</a>
                <li>KeepCoding. (2023). <em>¿Qué es el ciclo de vida del desarrollo del sistema?</em> Recuperado de: <a href="https://keepcoding.io/blog/ciclo-de-vida-del-desarrollo-del-sistema/">https://keepcoding.io/blog/ciclo-de-vida-del-desarrollo-del-sistema/.</a>
                <li>w3schools. (s.f.). <em>CSS The !important Rule</em> Recuperado de: <a href="https://www.w3schools.com/css/css_important.asp">https://www.w3schools.com/css/css_important.asp.</a>
                <li>Mozilla. (s.f.). <em>Valores y unidades CSS</em> Recuperado de: <a href="https://developer.mozilla.org/es/docs/Learn/CSS/Building_blocks/Values_and_units">https://developer.mozilla.org/es/docs/Learn/CSS/Building_blocks/Values_and_units.</a>
                <li>Material Design. (s.f.). <em>Inroduction</em> Recuperado de: <a href="https://m2.material.io/design/introduction">https://m2.material.io/design/introduction.</a>
                <li>Universidad Europea. (2022). <em>Diferencias entre Java y JavaScript</em> Recuperado de: <a href="https://universidadeuropea.com/blog/diferencias-entre-java-y-javascript/">https://universidadeuropea.com/blog/diferencias-entre-java-y-javascript./</a>
                <li>Mozilla. (s.f.). <em>Date</em> Recuperado de: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date.</a>
                <li>Mozilla. (s.f.). <em>Array</em> Recuperado de: <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array">https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array.</a>
                <li>Folgado L. (2020). <em>¿Es seguro validar un formulario con Javascript?</em> Recuperado de: <a href="https://didacticode.com/seguro-validar-formulario-javascript/">https://didacticode.com/seguro-validar-formulario-javascript/</a>
            </ol>
        </div>
    </section>
    `
    html += html_footer
    response.send(html);
})

router.get("/",(request, response, next) => {
    let html = html_header
    html += `
    <h1>Mis personajes favoritos</h1>
    <p>Esta es una lista de mis personajes favoritos, a continuación voy a explicar por qué  son de mis personajes favoritos.</p>
    


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
            <a href="https://genshin-impact.fandom.com/es/wiki/Qiqi"><img id="qiqi" src="https://genshin.global/wp-content/uploads/2022/05/qiqi-cryo-character-genshin-impact.webp" alt=""></a>
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

    <script id="Lab_4">
    const pruebas_contador = [
        [-34, 157, -80, 12, 0, 43, -74, 379, 0, 45],
        [-125, 56, 10, -178, -89, -200, -123, -45, -90, -177],
        [190, -32, 55, 88, 12, 67, -199, -99, -45, 150],
        [-57, 38, 145, -82, 103, -176, 64, -99, -21, 79],
        [88, -150, 42, -20, 175, -110, 0, -67, 33, -199],
        [-0, 123, -0, 66, -45, 0, -23, 78, -59, 134]
    ]
    
    const pruebas_promedio =[
        [
            [92, 7, 84, 35, 60],
            [12, 78, 53, 26, 95],
            [39, 99, 50, 66, 43]
        ],
        
        [
            [27, 68, 88, 19, 72],
            [3, 45, 63, 10, 74],
            [17, 86, 22, 94, 8],
            [32, 57, 25, 67, 71]
        ],
        
        [
            [98, 36, 55, 41, 89],
            [4, 83, 76, 97, 65],
            [11, 15, 90, 18, 49],
            [16, 51, 23, 62, 29],
            [38, 33, 96, 80, 6]
        ],
        
        [
            [81, 69, 24, 87, 20],
            [61, 77, 93, 2, 46],
            [75, 13, 28, 59, 85],
            [31, 34, 91, 44, 70],
            [14, 9, 58, 5, 47],
            [1, 37, 82, 64, 30]
        ],
        
        [
            [56, 21, 52, 100, 40],
            [79, 54, 42, 73, 48],
            [-82, 72, -25, -93, -35],
            [100, -84, 66, 57, 44],
            [-55, 3, 11, -30, -17],
            [61, 76, -49, -88, 18],
            [28, -37, -91, 79, -16]
        ]
    ]
    
    const pruebas_inverso = [true, "34", 3487, -6259, -67, 42, -10, 184, 9345749, -342739470]
    
    const respuestas_contador = [
        [3, 5, 2],
        [8, 2, 0],
        [4, 6, 0],
        [5, 5, 0],
        [5, 4, 1],
        [3, 4, 3]
    ]
    
    const respuestas_promedio = [
        [55.6, 52.8, 59.4],
        [54.8, 39, 45.4, 50.4],
        [63.8, 65, 36.6, 36.2, 50.6],
        [56.2, 55.8, 52, 54, 26.6, 42.8],
        [53.8, 59.2, -32.6, 36.6, -17.6, 3.6, -7.4]
    ]
    
    const  respuestas_inverso = [0, 0, 7843, -9526, -76, 24, -1, 481, 9475439, -74937243]
    
    for (let i in pruebas_contador){
        let x = contador(pruebas_contador[i])
        for (let j in x)
        {
            console.assert(x[j] == respuestas_contador[i][j], x[j] + " " + respuestas_contador[i][j])
        }
    }
    
    for (let i in pruebas_promedio){
        let x = promedio(pruebas_promedio[i])
        for (let j in x)
        {
            console.assert(x[j] == respuestas_promedio[i][j], x[j] + " " + respuestas_promedio[i][j])
        }
    }
    
    for (let i in pruebas_inverso)
    {
        let x = inverso(pruebas_inverso[i])
        console.assert(x == respuestas_inverso[i], x + " " + respuestas_inverso[i])
    }
    
    function contar(){
        const num = prompt("Elige un número");
    
        if(!num < 0){
            document.getElementById("Placeholder").innerHTML = "No se aceptan números negativos";
        }else{
            let text = "<table><tr>"
        
            for (let i = 0; i <= num; i++)
            {
                text += "<td>" + i + "</td>"
            }
            text += "</tr></table>"
        
            document.getElementById("Placeholder").innerHTML = text;
        }
    }
    
    function suma_aleatoria(){
        const num1 = Math.floor(Math.random() * 101)
        const num2 = Math.floor(Math.random() * 101)
    
        let text = "<p>"
        
        const solucion = num1 + num2
        const start = Date.now()
        const resp = prompt("Responde la siguiente suma: " + num1 + " + " + num2)
        const end = Date.now()
    
        if (resp == solucion)
        {
            text += "La respuesta es correcta"
        }else{
            text += "La respuesta es incorrecta"
        }
    
        text += "<br>Te tomó " + (end - start) + " milisegundos responder la pregunta</p>"
    
        document.getElementById("Placeholder").innerHTML = text;
    }
    
    function contador(arreglo){
        let positivo = 0
        let negativo = 0
        let cero = 0
        let text = "<h4>Prueba de función Contador</h4><p>Recibió: ["
    
        for (let i in arreglo){
            text += arreglo[i]
            
            if (i != arreglo.length - 1)
            {
                text += ", "
            }
    
            if (arreglo[i] < 0)
            {
                negativo++
            }else if (arreglo[i] > 0){
                positivo++
            }else{
                cero++
            }
        }
    
        text +="]<br>Regresó: Hay " + negativo + " valores negativos, " + positivo + " valores positivos y " + cero + " ceros"
    
        text +="</p>"
    
        document.getElementById("funciones").innerHTML += text;
        return [negativo, positivo, cero]
    }
    
    function promedio(matriz){
        let text = "<h4>Prueba de función Promedio</h4><p>Recibió:</p><table>"
        let prom =[]
        let suma = 0
    
        for(let i of matriz)
        {
            text += "<tr>"
            for(let j of i)
            {
                suma += j
                text += "<td>" + j + "</td>"
            }
            prom.push(suma/i.length)
            suma = 0
            text += "</tr>"
        }
    
        text +="</table><p>Regresó:</p><table><tr>"
        
        for (let x of prom)
        {
            text += "<td>" + x +"</td>"
        }
    
        text += "</tr></table>"
    
        document.getElementById("funciones").innerHTML += text;
        return prom
    }
    
    function inverso(num){
        let text = "<h4>Prueba de función Inverso</h4><p>Recibió: " + num + "<br>Regresó: "
        let num_str = num.toString()
        let num_secc
        const pila = []
        let resp = 0
        let negativo = false
    
        if (typeof num == "number")
        {
    
            if (num_str.slice(0,1) == "-")
            {
                negativo = true
                num_str = num_str.slice(1)
            }
    
            for (let i = 0 ; i < num_str.length; i++){
                num_secc = num_str.slice(i,i + 1)
                pila.push(num_secc)
            }
    
            while (pila.length != 0){
                resp += pila[pila.length - 1] * Math.pow(10, pila.length - 1)
                pila.pop()
            }
    
            if (negativo == true){
                resp *= -1
            }
            text += resp
    
        }else{
    
            text += "El valor ingresado no es un número es:" + typeof num
            resp = 0
        }
    
        text +="</p>"
    
        document.getElementById("funciones").innerHTML += text;
        return resp
    }
    </script>
    <script id="POE">
        const boton_q = document.getElementById("boton_q")
        const qiqi = document.getElementById("qiqi")
        let counter_q = false

        boton_q.onclick = () => {
            if (counter_q)
            {
                qiqi.src = "https://genshin.global/wp-content/uploads/2022/05/qiqi-cryo-character-genshin-impact.webp"
                counter_q = false
            }else{
                qiqi.src = "https://thicc-af.mywaifulist.moe/pending/waifus/X73JJH1wOIkQ4gICheN3gHKYuHJobhQOU1Glg9Z5.jpg"
                counter_q = true
            }
        }
    </script>
`
    html += html_footer
    response.send(html);
    //response.render("clases",{tropas: tropas}) //Envía variable a la página tropas
})

module.exports = router