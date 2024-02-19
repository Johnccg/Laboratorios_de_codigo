//log, info, warn, error
//assert si la condición es verdadera npo hace nada si es falsa manda un error
//let para declarar variables

//alert prompt confirm

function saludar()
{
    const nombre = prompt("¿Cómo te llamas?");
    alert("hola " + nombre);
}

saludar();

let propmt = () => {
    console.prompt("¿Verdad?");
}

//arreglos

const arreglo = [1];
arreglo.push(2);
arreglo.push("3");

arreglo["dos"] = 2;

for (let valor of arreglo)
{
    console.log(valor);
}

for (let pos in arreglo)
{
    console.log(arreglo[pos]);
}

//objetos

const pokemon = {tipo1: "Agua", tipo2: "Hada"};
pokemon.nombre = "Primarina";
console.log(pokemon);

//Modificar html

document.write("Esto es nuevo y proviene de Js");