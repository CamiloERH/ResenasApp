import React from 'react';

import { Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { Box } from '@mui/system';

const MusicCard = ({artista, album, puntuacion, imagen}) => {

    return (
        <Card elevation={4} sx={{ mb: 8, display: 'flex', width: {md: '450px'}}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', maxWidth: '150px'}}>
                <Typography component="div" variant="h5">
                    {artista}
                </Typography>
                <Typography variant="h6" color="text.secondary" component="div">
                    {album}
                </Typography>
                <Box sx={{m:3}}></Box>
                <Rating
                    sx={{marginY: 1}}
                    name="puntuacion"
                    value={puntuacion ? puntuacion : 0}
                    precision={0.1}
                    readOnly
                />
                <Typography variant="subtitle2" color="text.secondary" component="div">
                {`Puntuación prom: ${puntuacion}`.slice(0, 21)}
                </Typography>
                
            </CardContent>
        </Box>
        <CardMedia
            component="img"
            sx={{ marginLeft: 'auto', width: {md: 200, xs: 120}}}
            image={imagen}
            alt="imagen-artista"
        />
        </Card>
    );
}

export default MusicCard;