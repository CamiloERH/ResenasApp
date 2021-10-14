const Album = require('../models/Album');
const { validationResult } = require('express-validator');

exports.obtenerAlbumes = async (req, res) => {
    try {

        const match = {};

        if(req.query.artista){
            match.artista = req.query.artista
        }

        if(req.query.album){
            match.album = req.query.album
        }

        const resultado = await Album.find(
            match,
            {}
        );

        res.json({resultado});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}