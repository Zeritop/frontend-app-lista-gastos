import React, { useState } from 'react';
import { Boton } from '../elements/Boton';
import { ContainerForm } from '../elements/ContainerBody';
import { Input } from '../elements/Input';
import axios from 'axios';
import { useAlerta } from '../context/AlertaContext';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAlerta, setEstadoAlerta } = useAlerta();

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            return setEmail(e.target.value);

        }else if(e.target.name === 'password'){
            return setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('https://app-gastos-mern.herokuapp.com/api/users/login', {
                email,
                password
            });
            localStorage.setItem('token', res.data.data);
            history.push('/');
        }catch(error){
            setAlerta({
                tipo: 'error',
                mensaje: error.response.data.message
            });
            setEstadoAlerta(true);
        }

    }

    return ( 
        <ContainerForm onSubmit={handleSubmit}>
            <Input 
                placeholder="Email"
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
            />
            <Input 
                placeholder="Contraseña"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            <Boton as="button" primario type="submit">
                Ingresar
            </Boton>
        </ContainerForm>
     );
}
 
export default LoginForm;