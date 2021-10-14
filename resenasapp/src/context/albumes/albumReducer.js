import { OBTENER_ALBUMES,
    SIGUIENTE_ALBUM,
    ANTERIOR_ALBUM,
    COMENTARIOS_ALBUM_CARGADOS } from '../../types/index';

const albumReducer = (state, action) => {
    switch(action.type){
        case ANTERIOR_ALBUM: 
            return {
                ...state,
                indexAlbumActual: state.indexAlbumActual - 1,
                idAlbumActual: state.albumes[state.indexAlbumActual-1]._id,
                albumActual: state.albumes[state.indexAlbumActual-1],
                cargandoComentarios: true
            }
        case SIGUIENTE_ALBUM:
            return {
                ...state,
                indexAlbumActual: state.indexAlbumActual + 1,
                idAlbumActual: state.albumes[state.indexAlbumActual+1]._id,
                albumActual: state.albumes[state.indexAlbumActual+1],
                cargandoComentarios: true
            }

        case OBTENER_ALBUMES:
            return {
                ...state,
                albumes: [...action.payload],
                idAlbumActual: action.payload[0]._id,
                indexAlbumActual: 0,
                albumActual: action.payload[0],
                cargandoComentarios: true
            }
        case COMENTARIOS_ALBUM_CARGADOS:
            return {
                ...state,
                cargandoComentarios: false
            }
        default: 
            return state;
    }
}

export default albumReducer;