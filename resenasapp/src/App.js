import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Albumes from './components/albumes/Albumes';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import RutaPrivada from './components/rutas/RutaPrivada';

import AuthState from './context/autenticacion/authState';
import AlbumState from './context/albumes/albumState';
import ComentariosState from './context/comentarios/comentariosState';

import tokenAuth from './config/tokenAuth';
import AlertaState from './context/alertas/alertaState';

const token = localStorage.getItem('token');

if( token ){
  tokenAuth(token);
}

const App = () => {
  return (
    <AlertaState>
      <AuthState>
        <AlbumState>
          <ComentariosState>
            
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/albumes" component={Albumes} />
              </Switch>
            </Router>
          
          </ComentariosState>
        </AlbumState>
      </AuthState>
    </AlertaState>
  );
}

export default App;
