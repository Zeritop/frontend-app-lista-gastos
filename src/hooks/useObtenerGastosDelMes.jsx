import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import validarUsuario from '../funciones/validarUsuario';
import { getUnixTime, startOfMonth, endOfMonth } from 'date-fns/';
import { useAlerta } from '../context/AlertaContext';

const ObtenerGastosDelMes = () => {

    const [gastos, setGastos] = useState([]);
    const fechaActual = new Date();
    const fechaInicial = startOfMonth(fechaActual);
    const fechaFinal = endOfMonth(fechaActual);
    const { alerta } = useAlerta();

    useEffect(() => {        
        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token');
            const tokenD = jwt_decode(token);

            axios.post('http://localhost:3001/api/gastos/getGastosMes',{
                author: tokenD.id,
                fechaInicial: getUnixTime(fechaInicial),
                fechaFinal: getUnixTime(fechaFinal)
            }, {headers: validarUsuario()})
            .then(gasto => setGastos(gasto.data.gastos))
            .catch(err => console.log(err))
        }

    }, [alerta])
    
    return gastos;
}
 
export default ObtenerGastosDelMes;