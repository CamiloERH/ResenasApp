const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crea comentarios
//api/comentarios
router.post('/', 
    auth,
    [
        check('puntuacion', 'La puntuación es obligatorio').not().isEmpty(),
        check('comentario', 'El comentario es obligatorio').not().isEmpty(),
    ],
    comentarioController.crearComentario
);

router.get('/:id',
    comentarioController.obtenerComentarios
);


router.put('/:id', 
    auth,   
    comentarioController.actualizarComentario
);

router.delete('/:id', 
    auth,   
    comentarioController.eliminarComentario
);

module.exports = router;