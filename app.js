const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require("path")
app.use(express.static(path.join(__dirname, 'public')))

const cookie = require("cookie-parser")
app.use(cookie())

const session = require("express-session")
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}))

const flash = require("connect-flash")
app.use(flash())

const multer =require("multer")

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, 'public/uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, Number(new Date()).toString() + '-' + file.originalname);
    },
});

app.use(multer({ storage: fileStorage }).single('imagen')); 


const csrf = require("csurf")
const csrfProtection = csrf()
app.use(csrfProtection);


const rutasClases = require("./Router/clases.routes")
const listaarmas = require("./Router/Listaarmas.routes")
const usuarios = require("./Router/users.routes")

app.use("/armas_lista", listaarmas)
app.use("/users", usuarios)
app.use("/", rutasClases)

app.use((request,response,next)=>{
    response.status(404)
    response.render("404")
})

app.listen(3000)