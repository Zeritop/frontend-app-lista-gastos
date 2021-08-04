import styled from 'styled-components';
import theme from '../theme';
import { Link } from 'react-router-dom';

const ContainerListaGastos = styled.div`
    height: 460px;
    width: 60%;
    background: ${theme.blanco};
    overflow-y: auto;

    @media(max-width: 414px){
        width: 100%;
    }


    @media(min-width: 768px) and (max-width: 900px){
        width: 80%;
        height: 800px;
    } 
    
`;

const ItemGasto = styled.div`
    background: ${theme.blanco};
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    text-transform: uppercase;
    margin: 1px 5px;

    div,svg{
        height: 100%;
        width: auto;
        margin-right: 5px;
    }
    
    &:hover{
        a, button{
            opacity: 1;
        }

        background: ${theme.gris};
    }

    @media(max-width: 900px){
        a, button{
            opacity: 1;
        background: ${theme.gris};
        }
    } 

`;

const GastoFecha = styled.div`
    background: ${theme.azul};
    height: auto;
    display: inline-flex;   
    margin-top: 3px;
    margin-bottom: 3px;
    border-radius: 5px;
    padding: 10px;
    margin-left: 10px;
`;

const Cargando = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-transform: uppercase;
    font-size: 30px;
    font-weight: 500;
`;

const ContainerBotones = styled.div`
    display: inline-flex;
    align-items: center;
`;

const ContainerCategoria = styled.div`
    display: flex;
    align-items: center;
    svg{
        height: 100%;
        width: auto;
        margin-right: 5px;
    }
`;

const BtnCrud = styled(Link)`
    background: ${theme.blanco};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-left: 5px;
    width: 35px;
    outline: none;
    border: none;
    cursor: pointer;
    opacity: 0;

    &:hover{
        background: ${theme.grisOscuro};
    }

    svg{
        fill: ${theme.negro};
        width: auto;
    }
`;

const CargarMas = styled.div`
    display: inline-flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
`;


export {
    ContainerListaGastos,
    ItemGasto,
    GastoFecha,
    Cargando,
    ContainerBotones,
    ContainerCategoria,
    BtnCrud,
    CargarMas,
};