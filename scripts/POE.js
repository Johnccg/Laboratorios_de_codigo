const boton_q = document.getElementById("boton_q")
const qiqi = document.getElementById("qiqi")
let counter_q = false

boton_q.onclick = () => {
    if (counter_q)
    {
        qiqi.setAttribute("src","./imágenes/qiqi.png")
        counter_q = false
    }else{
        qiqi.setAttribute("src","./imágenes/qiqi2.png")
        counter_q = true
    }
}