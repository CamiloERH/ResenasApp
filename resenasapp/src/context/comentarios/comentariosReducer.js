import { OBTENER_COMENTARIOS,
    CREAR_COMENTARIO,
    ACTUALIZAR_COMENTARIO,
    ELIMINAR_COMENTARIO } from '../../types/index';

const comentariosReducer = (state, action) => {
    switch(action.type){

        case 'LIMPIAR_COMENTARIOS':
            return {
                ...state,
                comentarios: []
            }

        case CREAR_COMENTARIO: 
            return {
                ...state,
                comentarios: [action.payload, ...state.comentarios]
            }
        case OBTENER_COMENTARIOS:
            return {
                ...state,
                comentarios: [...action.payload]
            } 
        case ACTUALIZAR_COMENTARIO:
            return {
                ...state,
                comentarios: state.comentarios.map(comentario => comentario._id === action.payload._id ? action.payload : comentario)
            }
        case ELIMINAR_COMENTARIO:
            return {
                ...state,
                comentarios: state.comentarios.filter(comentario => comentario._id !== action.payload)
            }
        case 'ERROR_COMENTARIO':
            return{
                ...state,
                mensaje: action.payload
            }
        default: 
            return state;
    }
}

export default comentariosReducer;