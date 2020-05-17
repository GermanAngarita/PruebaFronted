import React from 'react';
import MontoBaseBannco from './componentes/v1/monto_base_banco';
import Prestamos from './componentes/v1/prestamos';
import Inicio from './componentes/v1/home';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './dataStore';
import Listado from './componentes/v1/listado';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <MontoBaseBannco />
        <Router>
          <Switch>
            <Route path="/solicitud">
              <SolicitudRuta />
            </Route>
            <Route path="/listado">
              <ListadosRuta />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

function Home() {
  return <Inicio />;
}

function SolicitudRuta() {
  return <Prestamos />;
}

function ListadosRuta() {
  return <Listado />
}

export default App;
