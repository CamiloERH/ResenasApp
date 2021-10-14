import React, { useContext } from 'react';

import { Alert, Button, Fade, Rating, Stack, TextField, Typography } from '@mui/material';

import useForm from '../hooks/useForm';

import comentariosContext from '../../context/comentarios/comentariosContext';
import alertaContext from '../../context/alertas/alertaContext';


const FormComentario = ({idAlbumActual}) => {

    const { crearComentarioEnAlbum } = useContext(comentariosContext);
    //extraer los valores del context
    const { alerta, mostrarAlerta } = useContext(alertaContext);

    const initialValues = {
        puntuacion: null,
        comentario: ''
    }

    const { values, handleInputChange } = useForm(initialValues);

    const { puntuacion, comentario } = values;

    const onSubmit = (e) => {
        
        if(comentario.trim() === '' || puntuacion === null){
            mostrarAlerta('Todos los campos son obligatorios', 'error');
            return;
        }
        crearComentarioEnAlbum(idAlbumActual, puntuacion, comentario);
    }

    return ( 
        <Stack
            component="form"
            spacing={2}
            sx={{width: {md: '35%', xs: '100%'}}}
        >
        
            <Fade in={Boolean(alerta)} timeout={200}
               
            >
                <Alert variant="outlined" severity="error">
                {alerta?.msg}
                </Alert>
            </Fade>
            <TextField
                variant="outlined"
                label="Comentario"
                name="comentario"
                type="comentario"
                multiline
                value={values.comentario}
                onChange={handleInputChange}
            />
            <Stack
                direction="row"
                spacing={3}
            >   
                <Typography variant="h6" color="text.secondary" component="div">
                    Puntuar:
                </Typography>
                <Rating
                    size="large"
                    name="puntuacion"
                    value={parseInt(values.puntuacion)}
                    onChange={handleInputChange}
                />
                <Button
                    onClick={onSubmit}
                >
                    Publicar
                </Button>
            </Stack>
        </Stack>
    );
}
 
export default FormComentario;