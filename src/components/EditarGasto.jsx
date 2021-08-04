import React, { useEffect, useState } from 'react';
import App from '../App';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import validarUsuario from '../funciones/validarUsuario';

const EditarGasto = () => {
    const { id } = useParams();
    const [gasto, setGasto] = useState('');

    useEffect(() => {
            try{
                axios.post('https://app-gastos-mern.herokuapp.com/api/gastos/getGasto', {id}, {headers: validarUsuario()})
                .then(g => setGasto(g.data.gasto))
                .catch(e => console.log(e))

            }catch(error){
                console.log(error);
            }
    },[id]);
    
    return ( 
        <App gasto={gasto} />
     );
}
 
export default EditarGasto;