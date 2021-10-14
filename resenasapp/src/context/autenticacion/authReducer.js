import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION 
} from "../../types";

import clienteAxios from '../../config/axios';

const authReducer = (state, action) => {

    switch(action.type){
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload, 
                cargando: false
            }

        case CERRAR_SESION:    
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            delete clienteAxios.defaults.headers.common['x-auth-token'];
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                cargando: false
            }

        default:
            return state;
    }
}

export default authReducer;