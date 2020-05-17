import React from 'react';
import { CATALOGO_PRESTAMOS } from '../../../catalogos/es';

function Home () {
    return (
      <div className="jumbotron">
        <div className="container" >
          <h1 className="display-4"> {CATALOGO_PRESTAMOS.TITULO} </h1>
          <p className="lead"> {CATALOGO_PRESTAMOS.SUB_TITULO} </p>
            <a className="btn btn-primary btn-lg" 
                href="/solicitud" 
                role="button">
                    {CATALOGO_PRESTAMOS.BOTON_SOLICITAR}
            </a>
        </div>
    </div>
  )
}

export default Home