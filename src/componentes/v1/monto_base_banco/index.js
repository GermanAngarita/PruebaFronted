import React, { useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { editarMonto } from '../../../acciones/montoBaseBanco';
import { cargarMongoInicialBanco } from '../../../servicios/v1/montoBanco';

function MontoBaseBanco ( props ) {
    
    // const [ montoBanco, setMontoBanco ] = useState( props.monto.valor )

    useEffect( ()=> {
        
        cargarMontoBanco()
        // setMontoBanco( props.monto.valor )
    },[])

    const cargarMontoBanco = async () => {
      try {
          const monto = await cargarMongoInicialBanco()

          console.log( 'Monto del servicio: ', monto)
          if ( monto.estatus ) {

              props.editar ( monto.monto.valor )
          }

      } catch ( error ) {
          console.log( error )
      }
    }

    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/solicitud">Solicitar Credito</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/listado" >Listado</a>
            </li>
        </ul>
        <span className="navbar-text navbar-right">
            Monto Diponible:
            <CurrencyFormat 
                value={props.monto.valor} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$'} />
        </span>
    </div>
  </nav>
}

const mapStateToProps = state => {
    return {
        monto: state.monto
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editar: ( monto ) => dispatch( editarMonto( monto ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) (MontoBaseBanco)