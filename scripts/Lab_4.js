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

//Ponerle un estilo a placeholder para que sea un cuadro de color
//Añadir más líneas cada cierto número

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

//Usar span para dar formato a correcto e incorrecto

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

    text += "<br>Te tomó " + end - start + " milisegundos responder la pregunta</p>"

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

function problema(){
    
}