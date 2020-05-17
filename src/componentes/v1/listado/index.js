import React, { useEffect, useState } from 'react';
import { obtenerListados } from '../../../servicios/v1/solicitudes';
import { editarMontoBanco } from '../../../servicios/v1/montoBanco';
import { connect } from 'react-redux';
import { editarMonto } from '../../../acciones/montoBaseBanco';
import { editarSolicitud } from '../../../servicios/v1/solicitudes'
import { PAGO_CREDITO, ESTADO_CREDITO } from '../../../catalogos/es';

const filtrosIniciales = {
    pago:  PAGO_CREDITO.TODOS,
    estado: ESTADO_CREDITO.TODOS
}

function Listado ( props ) {

    const [listados, setListados ] = useState([])

    const [ filtros, setFiltros ] = useState( filtrosIniciales )
    useEffect( ()=> {
        obtener()
    }, [filtros])

    const obtener = async ( ) => {
        
        const respuesta = await obtenerListados( filtros )
        if( respuesta && respuesta.estatus ) {
            setListados( respuesta.solicitudes )
            console.log('ejecutando')
        }

    }

    const pagarDeuda = async ( solicitud ) => {
        const variacion = parseInt(solicitud.valorSolicitado)
        
        const respuesta = await editarMontoBanco( variacion )
        solicitud.pagoCredito = PAGO_CREDITO.SI
        const respuestaSolicitud = await editarSolicitud( solicitud )
        console.log( respuestaSolicitud)
        props.editar( respuesta.nuevoValor )
        obtener()
    }



    const renderListado = ( ) => {
        if( listados.length === 0 ) return <tr>
            <td className="text-center" colSpan='8'>Aun no hay solicitudes</td>
        </tr>

        return listados.map( i => {
            return <tr key={i.id}>
                <td>{i.nombre}</td>
                <td>{i.correo}</td>
                <td>{i.identificacion.numero}</td>
                <td>{i.valorSolicitado}</td>
                <td>{i.fechaPagar}</td>
                <td>{i.estadoCredito}</td>
                <td>{i.pagoCredito}</td>
                <td>
                    {i.pagoCredito === PAGO_CREDITO.NO ? 
                        <button  onClick={()=> pagarDeuda( i )} className="btn btn-primary">Pagar</button>
                        : <a className="btn btn-success" href="/solicitud" >Solicitar</a>
                    }
                </td>
            </tr>
        } )
    }

    const filtrarListado = ( nombre, valor) => {

        setFiltros({
            ...filtros,
            [nombre]: valor
        })

        
    }

    const renderSelect = () => {
        return <div className="d-flex justify-content-start my-5">
            <div>
                <p>Estado del credito</p>
                <div  className="btn-group mr-3">
                    <button onClick={()=> filtrarListado('estado', ESTADO_CREDITO.APROBADO) } className="btn btn-outline-primary">{ESTADO_CREDITO.APROBADO}</button>
                    <button onClick={()=> filtrarListado('estado', ESTADO_CREDITO.RECHAZADO) } className="btn btn-outline-primary">{ESTADO_CREDITO.RECHAZADO}</button>
                    <button onClick={()=> filtrarListado('estado', ESTADO_CREDITO.TODOS) } className="btn btn-outline-primary">{ESTADO_CREDITO.TODOS}</button>
                </div>
            </div>
            <div>
                <p>Credito Pagado</p>
                <div  className="btn-group mr-3">
                    <button onClick={()=> filtrarListado('pago', PAGO_CREDITO.SI) } className="btn btn-outline-primary">Pago: {PAGO_CREDITO.SI}</button>
                    <button onClick={()=> filtrarListado('pago', PAGO_CREDITO.NO) } className="btn btn-outline-primary">Pago: {PAGO_CREDITO.NO}</button>
                    <button onClick={()=> filtrarListado('pago', PAGO_CREDITO.TODOS) } className="btn btn-outline-primary">{PAGO_CREDITO.TODOS}</button>
                </div>
            </div>
            
            
        </div>
    }

    return <div className="container mt-5">
        {renderSelect()}
        <p>Estado del Credito: {filtros.estado} - Pagado: {filtros.pago} </p>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Identificacion</th>
                    <th>Valor Solicitado</th>
                    <th>Fecha a Pagar</th>
                    <th>Estado Credito</th>
                    <th>Pago Credito</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {renderListado()}
            </tbody>
        </table>
    </div>
}

const mapDispatchToProps = dispatch => {
    return {
        editar: ( monto ) => dispatch( editarMonto( monto ) )
    }
}

export default connect( null, mapDispatchToProps ) (Listado)


// {
//     "nombre": "German Angarita",
//     "correo": "german@mail.com",
//     "identificacion": {
//       "tipo": "Cedula de ciudadania",
//       "numero": "1"
//     },
//     "valorSolicitado": 22500,
//     "fechaPagar": "2020-05-14",
//     "estadoCredito": "Rechazado",
//     "pagoCredito": "",
//     "id": 1
//   },