import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import AlbumContext from './albumContext';
import albumReducer from './albumReducer';

import {
    OBTENER_ALBUMES,
    SIGUIENTE_ALBUM,
    ANTERIOR_ALBUM,
    COMENTARIOS_ALBUM_CARGADOS } from '../../types/index';


const AlbumState = (props) => {

    const initialState = {
        albumes: [],
        idAlbumActual: null,
        indexAlbumActual: null,
        albumActual: {},
        cargandoComentarios: true
    }

    const [state, dispatch] = useReducer(albumReducer, initialState);

    const { indexAlbumActual, albumes } = state;

    const siguienteAlbum = () => {
        if(indexAlbumActual + 1 >= albumes.length){
            return;
        }
        dispatch({
            type: SIGUIENTE_ALBUM
        })
    }

    const anteriorAlbum = () => {
        if(indexAlbumActual - 1 < 0){
            return;
        }
        dispatch({
            type: ANTERIOR_ALBUM
        })
    }

    const obtenerAlbumes = async () => {
        const { data } = await clienteAxios.get(`/api/albumes`);
        dispatch({
            type: OBTENER_ALBUMES,
            payload: data.resultado
        })
    }

    const comentariosCargados = () => {
        dispatch({
            type: COMENTARIOS_ALBUM_CARGADOS
        });
    }   
    return (
        <AlbumContext.Provider
            value={{
                albumActual: state.albumActual,
                idAlbumActual: state.idAlbumActual,
                cargandoComentarios: state.cargandoComentarios,
                obtenerAlbumes,
                siguienteAlbum,
                anteriorAlbum, 
                comentariosCargados
            }}
        >
             {props.children}
        </AlbumContext.Provider>
    );
}

export default AlbumState;

