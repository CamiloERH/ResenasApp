import React, { useEffect, useContext } from 'react';

import { Alert, Button, Fade, Grid, Stack, TextField, Typography } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { Link } from 'react-router-dom';

import AuthContext from '../../context/autenticacion/authContext';

import useForm from '../hooks/useForm';
import alertaContext from '../../context/alertas/alertaContext';


const NuevaCuenta = (props) => {

    const { alerta, mostrarAlerta } = useContext(alertaContext);
    const authContext = useContext(AuthContext)
    const { autenticado, registrarUsuario } = authContext;

    useEffect(()=> {
        if(autenticado){
            props.history.push('/albumes');
        }
        //eslint-disable-next-line
    }, [autenticado, props.history]);

    const initialValues = {
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        passwordConfirmar: ''
    }

    const { values, handleInputChange } = useForm(initialValues);

    const { nombre, apellido, email, password, passwordConfirmar } = values;

    const onSubmit = (e) => {
        e.preventDefault();
        if(email.trim() === '' || password.trim() === '' || passwordConfirmar.trim() === ''
            || nombre.trim() === '' || apellido.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        if(password !== passwordConfirmar){
            mostrarAlerta('Password no coinciden', 'alerta-error');
            return;
        }

        registrarUsuario({
            nombre, 
            apellido,
            email,
            password
        });
    }

    return (  
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{p: 0, m: 0, height: '98vh'}}
        >

            <Fade in={Boolean(alerta)} timeout={250}
                sx={{width: {xs: '90%', sm: '80', md: '25%', }}}
            >
                <Alert variant="outlined" severity="error">
                {alerta?.msg}
                </Alert>
            </Fade>
            <Stack
                component="form"
                spacing={2}
                sx={{width: { xs: '90%', sm: '80%', md: '25%' }}}
                onSubmit={onSubmit}
            >
                <PersonAddAlt1Icon 
                    color="primary"
                    sx={{marginX: 'auto', fontSize: '14em'}} 
                />
                <TextField
                    variant="outlined"
                    label="Nombre"
                    name="nombre"
                    type="text"
                    value={values.nombre}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    label="Apellido"
                    name="apellido"
                    type="text"
                    value={values.apellido}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    label="Confirmar password"
                    name="passwordConfirmar"
                    type="password"
                    value={values.passwordConfirmar}
                    onChange={handleInputChange}
                />    
                <Button 
                    variant="outlined"
                    type="submit" 
                >
                    Registrarse
                </Button>
                
                <Stack mt={2} direction="row" spacing={2}>
                    <Typography sx={{my: 'auto'}} variant="overline" gutterBottom>
                        ¿Estás registrado?
                    </Typography>
                    <Button
                        component={Link}
                        to={'/'}
                    >
                        Iniciar Sesión
                    </Button>   
                </Stack>
            </Stack>      
        </Grid>
    );
}
 
export default NuevaCuenta;
