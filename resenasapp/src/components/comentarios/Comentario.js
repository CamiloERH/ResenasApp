import React, { useState, useContext } from 'react';

import { Typography, Paper, Grid, Avatar, Rating, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';    
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

import useForm from '../hooks/useForm';
import comentariosContext from '../../context/comentarios/comentariosContext';
import authContext from '../../context/autenticacion/authContext';
import { Box } from '@mui/system';

const Comentario = ({idAlbumActual, idUsuario, idComentario, comentario, nombre, apellido, puntuacion}) => {
    
    const { usuario } = useContext(authContext);
   
    const { actualizarComentarioEnAlbum, eliminarComentarioEnAlbum } = useContext(comentariosContext);

    const initialValues = {
        puntuacion: puntuacion,
        comentario: comentario,
    };

    const { values, handleInputChange } = useForm(initialValues);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitEditar = () => {
        actualizarComentarioEnAlbum(idComentario, idAlbumActual, values.puntuacion, values.comentario)
        setOpen(false);
    }
    
    const onSubmitEliminar = () => {
        eliminarComentarioEnAlbum(idAlbumActual, idComentario);
    }


    return ( 
        <Paper sx={{  m: 1.5,  px: 3, py: 2}} variant="outlined">
            <Grid
                container
                spacing={2}
            >
                <Grid item md={1} xs={2}>
                    <Avatar>{nombre.charAt(0)+apellido.charAt(0)}</Avatar>
                </Grid>
                <Grid item md={3} xs={10}>
                    <Typography variant="h6" component="div">
                        {`${nombre} ${apellido}`}
                    </Typography>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Rating
                        sx={{marginY: 1}}
                        name="puntuacion"
                        value={puntuacion}
                        readOnly
                    />
                </Grid>
                
                {
                (usuario?._id === idUsuario) ? 
                (<>
                    <Grid item md={2} xs={6}>
                        <Button
                            variant="outlined"
                            onClick={handleClickOpen}
                            endIcon={<CreateIcon />}
                        >
                            Editar
                        </Button>
                    </Grid>
                    <Grid item md={2} xs={6}>
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={onSubmitEliminar}
                            endIcon={<DeleteIcon />}
                        >
                            Borrar
                        </Button>  
                    </Grid>
                    
                </>)
                :  <Box sx={{width: 250}}/>
                } 
                <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                        {comentario}
                    </Typography>
                </Grid>   
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar comentario y puntuación</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Comentario"
                        name="comentario"
                        type="comentario"
                        multiline
                        value={values.comentario}
                        onChange={handleInputChange}
                        sx={{mb: 2}}
                    />
                    <Typography component="legend">Puntuación:</Typography>
                    <Rating
                        size="large"
                        name="puntuacion"
                        value={parseInt(values.puntuacion)}
                        onChange={handleInputChange}
                    />
                    
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={onSubmitEditar}>Editar</Button>
                </DialogActions>
            </Dialog>
        </Paper>

        
    );
}
 


export default Comentario;
