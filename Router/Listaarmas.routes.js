const express = require("express")
const router = express.Router()

const multer =require("multer")

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, '/public/uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, Number(new Date()).toString() + '-' + file.originalname);
    },
});

router.use(multer({ storage: fileStorage }).single('imagen')); 


const Autenticado = require("../Util/autenticar")
const canView = require('../Util/canView')
const canEdit = require('../Util/canEdit')

const controller_A = require("../Controllers/Listaarmas.controller")

router.get("/crear", Autenticado, canEdit, controller_A.get_crear)
router.post("/crear", Autenticado, canEdit, controller_A.post_crear)
router.get("/modificar", Autenticado, canEdit, controller_A.get_modificar)
router.post("/modificar", Autenticado, canEdit, controller_A.post_modificar)
router.get("/:arma_id", Autenticado, canView, controller_A.get_raiz)
router.get("/", Autenticado, canView, controller_A.get_raiz)

module.exports = router