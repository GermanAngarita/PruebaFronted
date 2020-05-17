import React, { useState } from 'react';
import {  
    FORMULARIO, 
    IDENTIFICACION, 
    MONTOS_CREDITO,
    RESULTADO_SOLICITUD } from '../../../catalogos/es';
import Slider from '@material-ui/core/Slider';
import CurrencyFormat from 'react-currency-format';
import { solicitarCredito } from '../../../servicios/v1/solicitudes';
import { connect } from 'react-redux';
import { editarMonto } from '../../../acciones/montoBaseBanco'
import Swal from 'sweetalert2';

const solicitudInicial = {
    nombre: '',
    correo: '',
    identificacion: {
        tipo: FORMULARIO.SELECCIONE,
        numero: ''
    },
    valorSolicitado: 0,
    fechaPagar: '',
    estadoCredito: '',
    pagoCredito: '',
};

function Prestamos ( props ) {

    const [ solicitud, setSolicitud ] = useState( solicitudInicial )

    const formatoParaMostrar = ( value ) => {
        return <CurrencyFormat 
        value={value} 
        displayType={'text'} 
        thousandSeparator={true} 
        prefix={'$'} />
    }


    const manejadorCambioMonto = (event, newValue) => {
        setSolicitud({
            ...solicitud,
            valorSolicitado: newValue
        })
    };

    const handledChage = e => {
        setSolicitud({
            ...solicitud,
            [e.target.name]: e.target.value
        })
    }

    const manejadorIdentificacion = e => {
        setSolicitud({
            ...solicitud,
            identificacion: {
                ...solicitud.identificacion,
                [e.target.name]: e.target.value
            }
        })
    }

    const enviarSolicitud = async e => {
        e.preventDefault()
        console.log('Enviar solicitud')

        try {
            const respuesta = await solicitarCredito(solicitud)

            if ( respuesta.estatus ) {
                props.editar( respuesta.nuevoValorDisponible )
                console.log('respuesta.nuevoValorDisponible: ', respuesta.nuevoValorDisponible)

                return Swal.fire({
                    title: RESULTADO_SOLICITUD.TITULO,
                    text: RESULTADO_SOLICITUD.EXITOSA,
                    icon: 'success',
                    confirmButtonText: RESULTADO_SOLICITUD.CONTINUAR
                })
            }

            return Swal.fire({
                title: RESULTADO_SOLICITUD.TITULO,
                text: `${respuesta.resultadoOperacion}`,
                icon: 'error',
                confirmButtonText: RESULTADO_SOLICITUD.CONTINUAR
            })


        } catch ( error ) {
            console.log(error)
        }
    }

    console.log( props )
      
    const formulario = () => {
        return <form onSubmit={enviarSolicitud}>
            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-sm-12 col-md-6 offset-md-3 col-sm-6 offset-sm-3">
                    <div className="form-group">
                        <label>{FORMULARIO.NOMBRE}</label>
                        <input name="nombre" onChange={handledChage} className="form-control" type="text" placeholder={FORMULARIO.NOMBRE} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
                    <div className="form-group">
                        <label>{FORMULARIO.EMAIL}</label>
                        <input name="correo" onChange={handledChage} className="form-control" type="text" placeholder={FORMULARIO.EMAIL} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
                    <div className="form-group">
                        <label>{FORMULARIO.TIPO_IDENTIFICACION}</label>
                        <select name="tipo" onChange={manejadorIdentificacion} className="form-control" >
                            <option value={FORMULARIO.SELECCIONE}>{FORMULARIO.SELECCIONE}</option>
                            <option value={IDENTIFICACION.CEDULA_CIUDADANIA}>{IDENTIFICACION.CEDULA_CIUDADANIA}</option>
                            <option value={IDENTIFICACION.CEDULA_EXTRANJERIA}>{IDENTIFICACION.CEDULA_EXTRANJERIA}</option>
                            <option value={IDENTIFICACION.NIT}>{IDENTIFICACION.NIT}</option>
                            <option value={IDENTIFICACION.PASAPORTE}>{IDENTIFICACION.PASAPORTE}</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
                    <div className="form-group">
                        <label>{FORMULARIO.NUMERO}</label>
                        <input name="numero" onChange={manejadorIdentificacion} className="form-control" type="text" placeholder={FORMULARIO.NUMERO} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
                    <div className="form-group" >
                        <label>{FORMULARIO.MONTO_DESEADO} </label>
                        <div className="container">
                            <Slider
                                className="mt-5"
                                defaultValue={30}
                                onChange={manejadorCambioMonto}
                                getAriaValueText={formatoParaMostrar}
                                valueLabelFormat={formatoParaMostrar}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                valueLabelDisplay="on"
                                step={MONTOS_CREDITO.VALOR_INTERVALO}
                                min={MONTOS_CREDITO.VALOR_MINIMO}
                                max={MONTOS_CREDITO.VALOR_MAXIMO}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                        {FORMULARIO.USTED_ELIGIO}
                        <span className="text-right">
                            <strong >
                                <CurrencyFormat 
                                    value={solicitud.valorSolicitado} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'$'} />
                            </strong>
                        </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
                    <div className="form-group">
                        <label>{FORMULARIO.PAGO_CREDITO}</label>
                        <input name="fechaPagar" onChange={handledChage} className="form-control" type="date" placeholder={FORMULARIO.EMAIL} />
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
                    <p className="text-justify"> 
                        <small >
                                {FORMULARIO.INFORMACION_ADICIONAL}
                        </small>
                    </p>
                    <div className="form-group">
                        <input className="form-control btn-primary" type="submit" value={FORMULARIO.ENVIAR_SOLICITUD} />
                    </div>
                </div>
            </div>
        
    </form>
    }

    return <div className="d-flex justify-content-center">
        <div>
            <div className="row mt-3">
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-xs-10">
                    <h3>
                        {FORMULARIO.SOLICITUD}
                    </h3>
                    <hr className="my-4"></hr>
                    <p>{FORMULARIO.INDICACION}</p>
                </div>
            </div>
            {formulario()}
        </div>
    </div>
}

const mapDispatchToProps = dispatch => {
    return {
        editar: ( monto ) => dispatch( editarMonto( monto ) )
    }
}

export default connect(null, mapDispatchToProps)(Prestamos)