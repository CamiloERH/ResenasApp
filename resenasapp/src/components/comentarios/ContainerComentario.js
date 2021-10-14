import { Collapse } from '@mui/material';
import React, { memo, useEffect, useContext } from 'react';
import { TransitionGroup } from 'react-transition-group';


import comentariosContext from '../../context/comentarios/comentariosContext';

import Comentario from './Comentario';
import FormComentario from './FormComentario';

const ContainerComentario = memo(({idAlbumActual, cargando}) => {
   
    const { comentarios, obtenerComentariosPorAlbum } = useContext(comentariosContext);
        
    useEffect(()  => {
        if(!cargando && idAlbumActual !== null){
            obtenerComentariosPorAlbum(idAlbumActual);
        }
        //eslint-disable-next-line
    }, [cargando, idAlbumActual]);

    return ( 
        <>
            <FormComentario idAlbumActual={idAlbumActual}/>
            <TransitionGroup>   
            {comentarios.map((comentario) => (
                <Collapse
                    key={comentario._id}
                    timeout={300}
                >
                    <Comentario 
                        idComentario={comentario._id}
                        idAlbumActual={idAlbumActual}
                        idUsuario={comentario.idUsuario._id}
                        comentario={comentario.comentario}
                        nombre={comentario.idUsuario.nombre}
                        apellido={comentario.idUsuario.apellido}
                        puntuacion={comentario.puntuacion}
                    />
                </Collapse>
            ))}
            </TransitionGroup>           
        </>
    );
})
 
export default ContainerComentario;