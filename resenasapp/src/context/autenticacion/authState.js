import React, { useReducer, useContext } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION 
} from "../../types";

import alertaContext from '../alertas/alertaContext';


const AuthState = (props) => {

    const { mostrarAlerta } = useContext(alertaContext);

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            //Obtener el usuario
            usuarioAutenticado();

        } catch(error) {   
            dispatch({
                type: REGISTRO_ERROR
            }); 
            mostrarAlerta(error.response.data.msg, 'error');
        }
    }

    //Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
           tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
            
        } catch (error){
            dispatch({
                type: LOGIN_ERROR
            });
            // mostrarAlerta(error.response.data.msg, 'error');
        }
    }

    //Cuando el usuario inicia sesión
    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            //Obtener el usuario
            usuarioAutenticado();
        } catch (error){  
            dispatch({
                type: LOGIN_ERROR
            });
            mostrarAlerta(error.response.data.msg, 'error');
        }
    }

    //Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }
  
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;

