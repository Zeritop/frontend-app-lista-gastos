import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import validarUsuario from '../funciones/validarUsuario';
import { getUnixTime, startOfMonth, endOfMonth } from 'date-fns/';
import { useAlerta } from '../context/AlertaContext';

const ObtenerGastosDelMes = () => {

    const [gastos, setGastos] = useState([]);
    const fechaActual = new Date();
    const { estadoAlerta } = useAlerta();
    const fechaInicial = startOfMonth(fechaActual);
    const fechaFinal = endOfMonth(fechaActual);
    const [cargarApi, setCargarApi] = useState(true);
  
    useEffect(() => {        
        let tiempo;
        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token');
            const tokenD = jwt_decode(token);

            if(cargarApi){
                axios.post('https://app-gastos-mern.herokuapp.com/api/gastos/getGastosMes',{
                    author: tokenD.id,
                    fechaInicial: getUnixTime(fechaInicial),
                    fechaFinal: getUnixTime(fechaFinal)
                }, {headers: validarUsuario()})
                .then(gasto => setGastos(gasto.data.gastos))
                .catch(err => console.log(err))
                setCargarApi(false);        
            }

            if(estadoAlerta){
                tiempo = setTimeout(() => {
                    setCargarApi(true);
                }, 3900);
            }
        }   
       return (() => clearTimeout(tiempo));
    },[fechaInicial, fechaFinal, cargarApi, estadoAlerta])
    
    return gastos;
}
 
export default ObtenerGastosDelMes;