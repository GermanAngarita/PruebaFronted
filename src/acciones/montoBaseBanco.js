import { EDITAR_VALOR } from '../tipos'

export const editarMonto = ( payload ) => {
    return {
        type: EDITAR_VALOR,
        payload
    }
}