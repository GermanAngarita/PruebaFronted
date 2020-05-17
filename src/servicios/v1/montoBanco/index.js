import { API, MONTO_INICIAL_BANCO } from '../../../config';

const montoInicialBanco = {
    valor: MONTO_INICIAL_BANCO,
    fecha: new Date( Date.now() )
}

export const cargarMongoInicialBanco = async () => {
    try {
        const existeMonto = await fetch(API + '/montoBanco', {
            method: 'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .catch(error => {return error} )
        .then(response => { return response })
        
        if ( existeMonto && existeMonto.length === 0 ) {
            await fetch(API + '/montoBanco', {
                method: 'post',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify( montoInicialBanco )
            }).then(res => res.json())
            .catch(error => {return error} )
            .then(response => { return response })

        }
        
        const montoAux = await fetch(API + '/montoBanco/1', {
            method: 'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .catch(error => {return error} )
        .then(response => { return response })
        
        return {
            estatus: true,
            resultadoOperacion: 'Monto obtenido con exito',
            monto: montoAux
        }

    } catch ( error ) {
        return {
            estatus: false,
            resultadoOperacion: 'Ocurrio un error al obtener el monto disponible',
            error: error 
        }
    }
}

export const editarMontoBanco = async ( variacion ) => {
    try {
        const montoObtenido = await fetch(API + '/montoBanco/1', {
            method: 'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .catch(error => {return error} )
        .then(response => { return response })

        const valorActual = parseInt(montoObtenido.valor) + parseInt(variacion)

        if ( valorActual < 0 ) {
            
            return {
                estatus: false,
                resultadoOperacion: 'No contamos con los fondos suficientes',
                error: new Error('No hay fondos suficientes')
            } 
        }

        await fetch(API + '/montoBanco/1', {
            method: 'put',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                valor: valorActual,
                fecha: new Date( Date.now() )
            })
        }).then(res => res.json())
        .catch(error => {return error} )
        .then(response => { return response })
        

        return {
            estatus: true,
            resultadoOperacion: 'Debito exitoso',
            nuevoValor: valorActual
        } 


    } catch ( error ) {
        return {
            estatus: false,
            resultadoOperacion: 'Ocurrio un error al debitar el dinero',
            error: error 
        } 
    }
}