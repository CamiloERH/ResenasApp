import React, { useEffect, useContext } from 'react';

import MusicCard from './MusicCard';
import ContainerComentario from '../comentarios/ContainerComentario';

import albumContext from '../../context/albumes/albumContext';
import authContext from '../../context/autenticacion/authContext';

import { Grid, IconButton } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { Box } from '@mui/system';

import Header from '../layout/Header';

const Albumes = () => {

  const { cargando }  = useContext(authContext);

  const { cargandoComentarios, 
    siguienteAlbum, 
    anteriorAlbum, 
    albumActual, 
    idAlbumActual, 
    obtenerAlbumes } = useContext(albumContext);

  useEffect(() => {
    if(!cargando){
      obtenerAlbumes();
    }
    //eslint-disable-next-line
  }, [cargando]);  

  return (
    <>
      <Header/>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        > 
          <IconButton
            disabled={cargandoComentarios}
            onClick={anteriorAlbum}
            // color="primary"
            sx={{height: {md: '5em', xs: '1.2em'}, mr: {md: 1, xs: 0}, my: 'auto', "&:hover": {backgroundColor: 'transparent'}}}
          >
            <NavigateBeforeIcon sx={{fontSize: {md: '5em', xs: '1.2em'}}}/>
          </IconButton>
      
          <MusicCard 
            artista={albumActual.artista}
            album={albumActual.nombre}
            puntuacion={albumActual.puntuacion}
            imagen={albumActual.imagen}
          />
        
          <IconButton 
            disabled={cargandoComentarios}
            onClick={siguienteAlbum}
            // color="primary"
            sx={{height: {md: '5em', xs: '1.2em'}, ml: {md: 1, xs: 0}, my: 'auto', "&:hover": {backgroundColor: 'transparent'}}}
          >
            <NavigateNextIcon sx={{fontSize: {md: '5em', xs: '1.2em'}}}/>
          </IconButton>
        </Box>        
        
        <ContainerComentario 
          idAlbumActual={idAlbumActual}
          cargando={cargando}
        />
      </Grid>
    </>
  );
}

export default Albumes;
