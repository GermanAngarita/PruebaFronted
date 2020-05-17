import { combineReducers } from 'redux';
import MontoDisponibleBanco from './montoBanco';

export default combineReducers({
    monto: MontoDisponibleBanco,
})  