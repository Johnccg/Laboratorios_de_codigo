
const pruebas_inverso = [true, "34", 3487, -6259, -67, 42, -10, 184, 3355749, -342339470]

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

function contador(){

}

function promedio(){

}

function inverso(num){
    let text = "<p>Prueba de función Inverso:<br>Recibió: " + num + "<br>Regreso: "

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

    document.getElementById("Placeholder").innerHTML += text;
}

function problema(){

}