import React from 'react';
import { useAlerta } from '../context/AlertaContext';
import Alerta from '../elements/Alerta';
import { Boton } from '../elements/Boton';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import LoginForm from './LoginForm';

const Login = () => {

    const { estadoAlerta, setEstadoAlerta, alerta } = useAlerta();

    return ( 
        <>
            <ContenedorHeader>
                <Header>
                    <Titulo>Iniciar Sesion</Titulo>
                    <Boton to="/registrarse">Registrarse</Boton>
                </Header>
            </ContenedorHeader>
            <LoginForm />
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje} 
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
            />
        </>
     );
}
 
export default Login;