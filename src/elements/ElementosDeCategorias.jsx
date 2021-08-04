import styled from 'styled-components';

const ListaGastos = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid black;
    height: 35px;
    text-transform: uppercase;
    padding: 1px 0;

    p,svg{
        height: 100%;
        width: auto;
        margin-right: 5px;
        display: flex;
        align-items: center;
    }
    
`;

const TotalGastado = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 35px;
    text-transform: uppercase;
    padding: 5px;
`;

const TituloMes = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const ContenedorListaGastos = styled.div`
    width: 60%;

    @media(max-width: 767px){
        width: 100%;
    } 
`;

const ContainerBtnLeft = styled.div`
    @media(max-width: 360px){
        position: absolute;
        top: 78.5%;
        left: 30%;
    } 

    @media(min-width: 375px) and (max-width: 400px){
        position: absolute;
        top: 81.5%;
        left: 30%;
    } 

    @media(min-width: 375px) and (max-width: 400px) and (min-height: 812px) and (max-height: 1023px){
        position: absolute;
        top: 76%;
        left: 30%;
    } 
 
`;

const ContainerBtnRigth = styled.div`
    @media(max-width: 360px){
        position: absolute;
        top: 78.5%;
        left: 50%;
    } 

    @media(min-width: 375px) and (max-width: 400px){
        position: absolute;
        top: 81.5%;
        left: 50%;
    } 

    @media(min-width: 375px) and (max-width: 400px) and (min-height: 812px) and (max-height: 1023px){
        position: absolute;
        top: 76%;
        left: 50%;
    } 
`;

export {
    ListaGastos,
    TituloMes,
    TotalGastado,
    ContenedorListaGastos,
    ContainerBtnLeft,
    ContainerBtnRigth
}