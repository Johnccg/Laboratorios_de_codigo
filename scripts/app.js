const filesystem = require("fs")

console.log("Hola")

filesystem.writeFileSync("Hola.txt", "Hola desde node")

const http = require("http")

const servidor = http.createServer((request,response) => {
    console.log(request.url)
    response.setHeader("Content-Type","text/html")
    response.write("Hola mundo desnde node")
    response.end()
})

servidor.listen(3000)