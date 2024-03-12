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