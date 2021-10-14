import React, { useContext } from 'react';

import { Toolbar, AppBar, Button, Typography } from '@mui/material'; 
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import authContext from '../../context/autenticacion/authContext';

const Header = () => {

    const { cerrarSesion } = useContext(authContext);

    return (
        <>
            <AppBar sx={{ minHeight: '2em'}} color="primary" position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ReseñasApp
                    </Typography>
                    <Button 
                        onClick={() => cerrarSesion()}
                        endIcon={<LogoutIcon/>}  
                        sx={{ color: 'white'}}
                    >
                        Cerrar Sesión
                    </Button>
                </Toolbar>
            </AppBar>  
            <Box sx={{minHeight: 90}}/> 
        </>
    );
}


export default Header;