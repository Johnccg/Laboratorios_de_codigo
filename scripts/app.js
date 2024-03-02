const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
const path = require("path")

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname,"..", 'public')))

const rutasClases = require("../Router/clases.routes.js")

app.use("/", rutasClases)

app.use((request,response,next)=>{
    response.status(404)
    response.sendFile(path.join(__dirname, "..", "views", "404.html")) //Enviar una página como un archivo
})

app.listen(3000)