const express =  require('express');
const router = express.Router();
const albumesController = require('../controllers/albumesController');
const { check } = require('express-validator');

router.get('/', 
    albumesController.obtenerAlbumes
);

module.exports = router;