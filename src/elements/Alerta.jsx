import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '../theme';

const slideDown = keyframes`
    0%{
        transform: translateY(10px);
        opacity: 0;
    }
    10%{
        transform: translateY(10px);
        opacity: 1;
    }
    90%{
        transform: translateY(10px);
        opacity: 1;
    }
    100%{
        transform: translateY(10px);
        opacity: 0;
    }
`;

const ContenedorAlerta = styled.div`
    width: 700px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10px;
    position: fixed;
    animation: ${slideDown} 4s ease forwards;
    padding: 5px 4px;
    border-radius: 5px;

    p{
        background: ${(props) =>{
            if(props.tipo === 'error'){
                return theme.rojo;
            }else if(props.tipo === 'exito'){
                return theme.verde;
            }
        }};
        color: ${theme.blanco};
        padding: 20px 40px;
        border-radius: 5px;
        box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
        text-align: center;
    }
`;

const Alerta = ({tipo, mensaje, estadoAlerta, setEstadoAlerta}) => {

    useEffect(() => {
        let tiempo;
        if(estadoAlerta === true){
                tiempo = setTimeout(() =>{
                    setEstadoAlerta(false)
                },4000);
        }

        return (() => clearTimeout(tiempo));
    }, [estadoAlerta, setEstadoAlerta])

    return (
        <>
        {
            estadoAlerta && 
                <ContenedorAlerta tipo={tipo}>
                    <p>{mensaje}</p>
                </ContenedorAlerta>
        } 
        </>
     );
}
 
export default Alerta;