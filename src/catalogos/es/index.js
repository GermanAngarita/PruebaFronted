export const ENTIDAD = {
    NOMBRE: 'BANCO AMIGO'
}

export const CATALOGO_PRESTAMOS = {
    TITULO: 'Bienvenido a Presta Ya!',
    SUB_TITULO: 'Nuestra herramienta en linea para solicitar prestamos rapidamente',
    BOTON_SOLICITAR: 'Solicita tu prestamos ya!'
}

export const IDENTIFICACION = {
    CEDULA_CIUDADANIA: 'Cedula de ciudadania',
    PASAPORTE: 'Pasaoporte',
    NIT: 'NIT',
    CEDULA_EXTRANJERIA: 'Cedula de Extranjeria',
}

export const MONTOS_CREDITO = {
    VALOR_MINIMO: 10000,
    VALOR_MAXIMO: 100000,
    VALOR_INTERVALO: 2500
}

export const ESTADO_CREDITO = {
    APROBADO: 'Aprobado',
    RECHAZADO: 'Rechazado',
    TODOS: 'Todos',
}

export const PAGO_CREDITO = {
    SI: 'Si',
    NO: 'No',
    TODOS: 'Todos'
}

export const FORMULARIO = {
    SELECCIONE: "Seleccione",
    SOLICITUD: "Solicitud de credito",
    INDICACION: "Por favor complete los siguientes campos",
    NOMBRE: "Nombre",
    EMAIL: "Correo electronico",
    VALOR_SOLICITADO: "ValorSolicitado",
    FECHA_PAGO: "Fecha de Pago",
    ESTADO_CREDITO: "Estado del credito",
    PAGO_CREDITO: "Pago del credito",
    TIPO_IDENTIFICACION: "Tipo de identificacion",
    NUMERO: "Numero",
    MONTO_DESEADO: "Monto deseado",
    USTED_ELIGIO: "Monto elegido: ",
    ENVIAR_SOLICITUD: "Enviar solicitud",
    INFORMACION_ADICIONAL: `Declaro que autorizo ${ENTIDAD.NOMBRE}  para  la recolección y tratamiento de mis datos personales, conforme a la política de datos personales disponible aquí, entiendo que los datos serán objeto de recolección, almacenamiento, uso, circulación, supresión, transferencia, transmisión, cesión y todo el tratamiento, con la finalidad de obtener información sobre los servicios y eventos realizados por la firma.`
}

export const RESULTADO_SOLICITUD = {
    TITULO: 'Resultado de la solicitud',
    EXITOSA: 'La solicitud de credito ha sido aprobada',
    RECHAZADA: 'Lo sentimos, la solictud fue rechazada',
    CONTINUAR:'Continuar'
}

// Nombre
// - Correo
// - Cédula
// - Valor Solicitado
// - Fecha pagar (opcional)
// - Estado de credito (aprobado - rechazado)
// - Pago Credito (si - no)