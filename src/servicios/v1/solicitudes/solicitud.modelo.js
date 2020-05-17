import joi from '@hapi/joi';

export const SolicitudSchema = joi
.object().keys({
    nombre: joi.string().required(),
    correo: joi.string().required(),
    identificacion: joi.object().keys({
        tipo: joi.string().required(),
        numero: joi.string().required()
    }).required(),
    valorSolicitado: joi.number().required(),
    fechaPagar: joi.string().optional().allow(''),
    estadoCredito: joi.string().allow(''),
    pagoCredito: joi.string().allow(''),
}).required()
