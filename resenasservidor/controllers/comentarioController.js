const Comentario = require('../models/Comentario');
const Album  = require('../models/Album');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');


exports.crearComentario = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const { idAlbum, puntuacion } = req.body;

        const existeAlbum = await Album.findById(idAlbum);
        
        if(!existeAlbum){
            return res.status(404).json({msg: 'Album no encontrado'});
        }

        const existeComentario = await Comentario.findOne({idAlbum, idUsuario: req.usuario.id});
        if(existeComentario){
            return res.status(409).json({msg: 'Usuario ya comentó el Album'});
        }

        const comentario = new Comentario(req.body);
        comentario.idUsuario = req.usuario.id;
        await comentario.save();

        const resultado = await Comentario.aggregate([
            {$match: { idAlbum: mongoose.Types.ObjectId(idAlbum)}},
            {   
                $group: {
                    _id: "$idAlbum",
                    avgPuntuacion: {
                        $avg: "$puntuacion"
                    }   
                }
            }
        ]);

        const [puntuacionPromedio] = resultado; 
        const { avgPuntuacion } = puntuacionPromedio;

        await existeAlbum.updateOne({puntuacion: avgPuntuacion});

        await comentario.populate('idUsuario', {nombre: 1, apellido: 1});
        res.status(200).json({comentario});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerComentarios = async (req, res) => {
    try {

        const idAlbum = mongoose.Types.ObjectId(req.params.id);

        const existeAlbum = await Album.findById({_id: idAlbum });
        
        if(!existeAlbum){
            return res.status(404).json({msg: 'Album no encontrado'})
        }

        const comentarios = await Comentario.find({idAlbum})
        .populate('idUsuario', {nombre: 1, apellido: 1}).sort({createdAt: 'desc'});
        
        return res.json({comentarios});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarComentario = async (req, res) => {
    try {
        const { idAlbum, puntuacion, comentario } = req.body;

        const existeAlbum = await Album.findById({_id: idAlbum });
        
        if(!existeAlbum){
            return res.status(404).json({msg: 'Album no encontrado'})
        }

        let existeComentario = await Comentario.findById(req.params.id);
        
        if(!existeComentario){
            return res.status(404).json({msg: 'No existe ese comentario'});
        }

        //Revisar si pertenece al usuario
        if(existeComentario.idUsuario.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        const comentarioActualizado = {};
 
        comentarioActualizado.puntuacion = puntuacion;
        comentarioActualizado.comentario = comentario
      
        //Guardar el nuevo comentario
        existeComentario = await Comentario.findOneAndUpdate({_id: req.params.id}, {$set: comentarioActualizado}, {new: true})
        .populate('idUsuario', {nombre: 1, apellido: 1});

        res.json({comentario: existeComentario});

        actualizarPuntuacionPromedio(idAlbum);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarComentario = async (req, res) => {
    try {
        const { idAlbum } = req.body;

        const existeAlbum = await Album.findById({_id: idAlbum });
        
        if(!existeAlbum){
            return res.status(404).json({msg: 'Album no encontrado'})
        }

        let existeComentario = await Comentario.findById(req.params.id);

        if(!existeComentario){
            return res.status(404).json({msg: 'No existe ese comentario'});
        }

        //Revisar si pertenece al usuario
        if(existeComentario.idUsuario.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Eliminar  
        await Comentario.findOneAndRemove({ _id: req.params.id});
        res.status(200).json({msg: 'Comentario eliminado'});

        actualizarPuntuacionPromedio(idAlbum);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


const actualizarPuntuacionPromedio = async (idAlbum) => {

    const resultado = await Comentario.aggregate([
        {$match: { idAlbum: mongoose.Types.ObjectId(idAlbum)}},
        {   
            $group: {
                _id: "$idAlbum",
                avgPuntuacion: {
                    $avg: "$puntuacion"
                }   
            }
        }
    ]);

    if(resultado.length === 0){
        await Album.findOneAndUpdate(
            {_id: idAlbum},
            {$set: {puntuacion: 0}});
    } else {
        const [puntuacionPromedio] = resultado; 
        const { avgPuntuacion } = puntuacionPromedio;
        await Album.findOneAndUpdate(
            {_id: idAlbum},
            {$set: {puntuacion: avgPuntuacion}});    
    }    
}