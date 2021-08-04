import { GET_GASTOS, PREVIOUS_MONTH, NEXT_MONTH } from './types';

 const reducerGastos = (state, action) => {
    const { payload, type } = action;

    switch(type){
        case GET_GASTOS:
            return {
                ...state,
                gastosPorCategoria: payload
            }
        case PREVIOUS_MONTH:
            return {
                ...state,
                fechaActual: payload
            }
        case NEXT_MONTH:
            return {
                ...state,
                fechaActual: payload
            }    
        default:
            return state;        
    }
}

export default reducerGastos;