import React, { useReducer, useContext } from 'react';

import ComentariosContext from './comentariosContext';
import comentariosReducer from './comentariosReducer';

import albumContext from '../albumes/albumContext';

import  { OBTENER_COMENTARIOS,
    CREAR_COMENTARIO,
    ACTUALIZAR_COMENTARIO,
    ELIMINAR_COMENTARIO } from '../../types/index';

import clienteAxios from '../../config/axios';
import alertaContext from '../alertas/alertaContext';

const ComentariosState = (props)  => {

    const { mostrarAlerta } = useContext(alertaContext);

    const { comentariosCargados } = useContext(albumContext);
    const initialState = {
        comentarios: [],
        cargandoComentarios: true
    }

    const [state, dispatch] = useReducer(comentariosReducer, initialState);

    const obtenerComentariosPorAlbum = async (idAlbum) => {
        const { data } = await clienteAxios.get(`/api/comentarios/${idAlbum}`);
        dispatch({
            type: OBTENER_COMENTARIOS,
            payload: data.comentarios
        });
        comentariosCargados();  
    }

    const crearComentarioEnAlbum = async (idAlbum, puntuacion, comentario) => {
        try {
            const { data } = await clienteAxios.post('/api/comentarios', {idAlbum, puntuacion, comentario});
            dispatch({
                type: CREAR_COMENTARIO,
                payload: data.comentario
            });
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'error'
            }
            dispatch({
                type: 'ERROR_COMENTARIO',
                payload: alerta
            });
            mostrarAlerta(error.response.data.msg, 'error')
        }
        
    }

    const actualizarComentarioEnAlbum = async (idComentario, idAlbum, puntuacion, comentario) => {
        const { data } = await clienteAxios.put(`/api/comentarios/${idComentario}`, {idAlbum, puntuacion, comentario});
        
        dispatch({
            type: ACTUALIZAR_COMENTARIO,
            payload: data.comentario
        });
    }

    const eliminarComentarioEnAlbum = async (idAlbum, idComentario) => {
        try {
            await clienteAxios.delete(`/api/comentarios/${idComentario}`, {data: {idAlbum}});
            dispatch({
                type: ELIMINAR_COMENTARIO,
                payload: idComentario
            });
        } catch (error) {
            console.log(error);  
        }
        
    }

    return (
        <ComentariosContext.Provider
            value={{
                comentarios: state.comentarios,
                mensaje: state.mensaje,
                obtenerComentariosPorAlbum,
                crearComentarioEnAlbum,
                actualizarComentarioEnAlbum,
                eliminarComentarioEnAlbum
            }}
        >
            {props.children}
        </ComentariosContext.Provider>
    );

}

export default ComentariosState;