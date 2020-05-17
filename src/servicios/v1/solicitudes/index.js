import { API } from '../../../config';
import { ESTADO_CREDITO, PAGO_CREDITO } from '../../../catalogos/es'
import { editarMontoBanco } from '../montoBanco';
import { SolicitudSchema } from './solicitud.modelo';

export const solicitarCredito = async ( solicitud ) => {

    try {

        const validarSchema =  SolicitudSchema.validate( solicitud )
        
        if ( validarSchema.error ) {
            return {
                estatus: false,
                resultadoOperacion: 'Por favor complete los campos requeridos'
            }
        }

        // Validar solicitudes anteriores

        const CreditoNegado = await fetch( API + `/solicitudes?identificacion.tipo=${
            solicitud.identificacion.tipo
        }&identificacion.numero=${
            solicitud.identificacion.numero
        }&estadoCredito=${ESTADO_CREDITO.RECHAZADO}`, {
            method: 'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .catch(error => {return error} )
        .then(response => { return response })

        if( CreditoNegado && CreditoNegado.length > 0 ) {
            return {
                estatus: false,
                resultadoOperacion: 'Lo sentimos, ya ha sido negada una solicitud de credito a su nombre'
            }
        }
        
        // Validacion del credito

        const validacionCredito = Math.round( Math.random() * (1 - 0) + 0 )
        
        let estatusAux = false;
        let nuevoValorDisponible = 0
        if( validacionCredito ) {
            solicitud.estadoCredito = ESTADO_CREDITO.APROBADO
            solicitud.pagoCredito = PAGO_CREDITO.NO
            estatusAux = true;

            const resultaMontoBanco = await editarMontoBanco( solicitud.valorSolicitado * -1 )

            if( resultaMontoBanco && resultaMontoBanco.estatus ) {
                nuevoValorDisponible = resultaMontoBanco.nuevoValor
            }

            if( !resultaMontoBanco.estatus ) {
                return {
                    estatus: false,
                    resultadoOperacion: 'La solicitud de credito fue rechazada, no contamos con los fondos suficientes',
                    nuevoValorDisponible
                }
            }
            
        } else {
            solicitud.estadoCredito = ESTADO_CREDITO.RECHAZADO
        }

        // Generar solicitud de credito

        await fetch( API + '/solicitudes', {
            method: 'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify( solicitud )
        }).then(res => res.json())
        .catch(error => {return error} )
        .then(response => { return response })

        return {
            estatus: estatusAux,
            resultadoOperacion: 'La solicitud de credito fue ' + solicitud.estadoCredito,
            nuevoValorDisponible
        }
    } catch ( error ) {
        console.log( error )
        return {
            estatus: false,
            resultadoOperacion: 'Error',
            error: error
        }
    }
}

export const obtenerListados = async ( filtros ) => {
    try {
        console.log( 'Filtros que llegan al servicio: ', filtros)
        const pago = filtros.pago === PAGO_CREDITO.TODOS ? '' : `pagoCredito=${filtros.pago}`;
        const estado = filtros.estado === ESTADO_CREDITO.TODOS ? '' : `estadoCredito=${filtros.estado}`;
        
        let parametros = ''

        if( pago !== '' || estado !== '' ) {
            parametros += '?'
        }
        if( pago &&  !estado ) {
            parametros += pago
        }

        if( pago && estado ) {
            parametros += pago
            parametros += '&'
            parametros += estado
        }

        if( estado &&  !pago ) {
            parametros += estado
        }

        console.log('URL generada: ', API + '/solicitudes' + parametros)

        const solicitudes = await fetch ( API + '/solicitudes' + parametros, {
            method: 'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .catch(error => {return error} )
        .then(response => { return response })

        parametros = ''

        return {
            estatus: true,
            solicitudes
        }

    } catch ( error ) {

        return {
            estatus: false,
            resultadoOperacion: 'Error',
            error: error
        }
    }
}

export const editarSolicitud = async ( solicitud ) => {
    try {
        await fetch ( API + `/solicitudes/${solicitud.id}`, {
            method: 'put',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify( solicitud )
        }).then(res => res.json())
        .catch(error => {return error} )
        .then(response => { return response })

        return {
            estatus: true,
            resultadoOperacion: 'Actualizado con exito'
        }

    } catch ( error ) {
        return {
            estatus: false,
            resultadoOperacion: 'Error',
            error: error
        }
    }
}