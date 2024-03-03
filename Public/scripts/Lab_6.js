//>10 débil
//10 - 12 suficiente
//13 + debe haber más de 1 de cada elemento fuerte

const button = document.getElementById("submit")
const input_1 = document.getElementById("pswrd")
const input_2 = document.getElementById("pswrd_confirm")
const verify = document.getElementById("similitud")
const fuerte = document.getElementById("fortaleza")

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
        return
    }else{
        verify.style.visibility = "hidden"
    }

    if (input_1.value.length < 10 || caracteres.letras_may < 1 || caracteres.letras_min < 1 || caracteres.num < 1 || caracteres.special < 1){
        alert("Contraseña inválida")
    }else{
        alert("Contraseña aceptada")
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