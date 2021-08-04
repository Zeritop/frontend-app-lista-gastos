import React from 'react';
import { Boton } from '../elements/Boton';
import { ReactComponent as LogOutIcono } from '../image/log-out.svg';
import { useHistory } from 'react-router-dom';

const BotonCerrarSesion = () => {

    const history = useHistory();
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        history.push('/iniciar-sesion');
    }

    return ( 
        <Boton as="button" onClick={cerrarSesion}>
            Salir
            <LogOutIcono />
        </Boton>
     );
}
 
export default BotonCerrarSesion;