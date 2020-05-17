import {
    EDITAR_VALOR
} from '../../tipos'

const initialState = {
    valor: 0
}

export default function( state = initialState, action ) {

    switch (action.type) {

        case EDITAR_VALOR:
            return {
                valor: action.payload
            }
        default:
            return state;
    }
}