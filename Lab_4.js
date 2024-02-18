const pruebas_contador = [
    [-34, 157, -80, 12, 0, 43, -74, 379, 0, 45],
    [-125, 56, 10, -178, 89, -200, 123, 45, -90, 177],
    [190, -32, 55, -88, 12, 67, -199, 99, -45, 150],
    [-57, 38, 145, -82, 103, -176, 64, -99, 21, 79],
    [88, -150, 42, -20, 175, -110, 90, -67, 33, -199],
    [-100, 123, -87, 66, -45, 189, -23, 78, -59, 134]
]
contador(pruebas_contador[0])

for (let i of pruebas_contador){
    contador(i)
}

const pruebas_inverso = [true, "34", 3487, -6259, -67, 42, -10, 184, 9345749, -342739470]

for (let i of pruebas_inverso)
{
    inverso(i)
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
    let text = "<p>Prueba de función Inverso:<br>Recibió: ["



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
}

function promedio(){

}

function inverso(num){
    let text = "<p>Prueba de función Inverso:<br>Recibió: " + num + "<br>Regresó: "

    if (typeof num == "number")
    {
        let num_str = num.toString()
        let num_secc
        const pila = []
        let resp = 0
        let negativo = false

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
    }

    text +="</p>"

    document.getElementById("funciones").innerHTML += text;
}

function problema(){

}