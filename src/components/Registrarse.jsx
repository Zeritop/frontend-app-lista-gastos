import React, { useState } from 'react';
import { Boton } from '../elements/Boton';
import { ContainerForm } from '../elements/ContainerBody';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import { Input } from '../elements/Input';
import { ReactComponent as VolverIcono } from '../image/flecha.svg';
import axios from 'axios';
import Alerta from '../elements/Alerta';
import { useAlerta } from '../context/AlertaContext';
import { useHistory } from 'react-router-dom';

const Registrarse = () => {

    const history = useHistory();
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confPass, setConfPass] = useState('');
    const { estadoAlerta, setEstadoAlerta, alerta, setAlerta } = useAlerta();

    const handleChange = (e) => {
        if(e.target.name === 'nombre') {
            return setNombre(e.target.value);
    
        }else if(e.target.name === 'password'){
            return setPassword(e.target.value);

        }else if(e.target.name === 'email') {
            return setEmail(e.target.value);

        }else if(e.target.name === 'confPass') {
            return setConfPass(e.target.value);
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        if(nombre === '' || email === '' || password === '' || confPass === ''){
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor llenar todos los campos'
            });
            setEstadoAlerta(true);
            return;
        }

        const expresionRCorreo = /[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRCorreo.test(email)){
            setAlerta({
                tipo: 'error',
                mensaje: 'Ingresar un correo valido'
            });
            setEstadoAlerta(true);
            return;
        }

        if(password === confPass){
            try{
                const res = await axios.post('https://app-gastos-mern.herokuapp.com/api/users/register',{
                        username: nombre,
                        password,
                        email
                    });
                    setAlerta({
                        tipo: 'exito',
                        mensaje: res.data.message
                    });
                    setEstadoAlerta(true);
                    setNombre('');
                    setPassword('');
                    setEmail('')
                    setConfPass('');
                    history.push('/iniciar-sesion');
                } catch (error) {
                    setAlerta({
                        tipo: 'error',
                        mensaje: error.response.data.message
                    });
                    setEstadoAlerta(true);
                } 
        }else{
            setAlerta({
                tipo: 'error',
                mensaje: 'Las contraseñas no coinciden'
            });
            setEstadoAlerta(true);
        }
    }

    return (
        <> 
            <ContenedorHeader>
                <Header>
                    <Boton to="/iniciar-sesion">
                        <VolverIcono />
                    </Boton>
                    <Titulo>Registrarse</Titulo>
                </Header>
            </ContenedorHeader>
            <ContainerForm onSubmit={handleSubmit}>
                <Input 
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                />
                <Input 
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <Input 
                    placeholder="Contraseña"
                    type="password"
                    name='password'
                    value={password}
                    onChange={handleChange}
                />
                <Input 
                    placeholder="Confirmar Contraseña"
                    type="password"
                    name="confPass"
                    value={confPass}
                    onChange={handleChange}
                />
                <Boton as="button" primario >Aceptar</Boton>
            </ContainerForm>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
            />
        </>
     );
}
 
export default Registrarse;