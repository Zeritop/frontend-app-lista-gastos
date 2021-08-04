import React, { createContext, useContext, useReducer, useState } from 'react';
import reducerGastos from './GastosCategoriasReducer';
import axios from 'axios';
import { getUnixTime, startOfMonth, endOfMonth, subMonths, addMonths } from 'date-fns';
import validarUsuario from '../../funciones/validarUsuario';
import { GET_GASTOS, PREVIOUS_MONTH, NEXT_MONTH } from './types';
import jwt_decode from 'jwt-decode';

const GastosMesCategoria = createContext();

// acceder al contexto
const useGastosMesCategoria = () => {
    return useContext(GastosMesCategoria);
}

const GastosCategoriasProvider = ({children}) => {

    const initialState = {
        fechaActual: new Date(),
        gastosPorCategoria: []
    }

    const [state, dispatch] = useReducer(reducerGastos, initialState);
    const [cambioFecha, setCambioFecha] = useState(false);

    const getGastos = async () => {
        if(localStorage.getItem('token')){
            const fechaInicial = startOfMonth(state.fechaActual);
            const fechaFinal= endOfMonth(state.fechaActual);
            const token = localStorage.getItem('token');
            const tokenD = jwt_decode(token);
    
            const res = await axios.post('https://app-gastos-mern.herokuapp.com/api/gastos/getGastosMes',{
                author: tokenD.id,
                fechaInicial: getUnixTime(fechaInicial),
                fechaFinal: getUnixTime(fechaFinal)
            }, {headers: validarUsuario()})
    
            dispatch({
                type: GET_GASTOS,
                payload: res.data.gastos 
            })
            
        }
    }

    const previousMonth = () => {
        dispatch({
            type: PREVIOUS_MONTH,
            payload: subMonths(state.fechaActual ,1)
        })
        setCambioFecha(true);
    }

    const nextMonth = () => {
        dispatch({
            type: NEXT_MONTH,
            payload: addMonths(state.fechaActual, 1)
        })
        setCambioFecha(true);
    }

    return ( 
        <GastosMesCategoria.Provider value={{
            fechaActual: state.fechaActual,
            gastosPorCategoria: state.gastosPorCategoria,
            getGastos,
            previousMonth,
            cambioFecha,
            setCambioFecha,
            nextMonth
        }}>
            { children }
        </GastosMesCategoria.Provider>
     );
}
 
export { GastosCategoriasProvider, useGastosMesCategoria, GastosMesCategoria };