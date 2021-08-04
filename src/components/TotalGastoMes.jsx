import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import formatearCantidad from '../funciones/formatearCantidad';
import { useTotal } from '../context/GastoDelMesContext';

const ContainerOGM = styled.div`
    background: ${theme.verde};
    width: 60%;
    height: auto;
    color: ${theme.negro};
    padding: 2px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 767px){
        width: 100%;
        font-size: larger;
    } 

    @media(min-width: 768px) and (max-width: 900px) {
        width: 80%;
        font-size: larger;
    } 

`;

const ContenedorLetra = styled.p`
    margin-left: 20px;
`;

const ContenedorCantidad = styled.p`
    margin-right: 20px;
`;


const TotalGastoMes = () => {

    const { total } = useTotal();
 
    return ( 
        <ContainerOGM>
            <ContenedorLetra>Total gastado en el Mes: </ContenedorLetra>
            <ContenedorCantidad>{ formatearCantidad(total) }</ContenedorCantidad>
        </ContainerOGM>
     );
}
 
export default TotalGastoMes;