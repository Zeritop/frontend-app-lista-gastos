import styled from 'styled-components';
import theme from '../theme';

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;

    @media(max-width: 767px){
        flex-direction: column;
    }  
`;

const ContenedorHeader = styled.div`
    width: 60%;
    height: 90px;
    background: ${theme.blanco};
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    display: flex;
    align-items: center;

    @media(max-width: 767px){
        width: 100%;
    } 

    @media(min-width: 768px) and (max-width: 900px){
        width: 80%;
    } 

`;

const Titulo = styled.h3`
    text-transform: uppercase;
    font-size: 35px;
    font-weight: 500;
    letter-spacing: 1px;

    @media(max-width: 767px){
        display: none;
    } 
`;

export {
    Header,
    ContenedorHeader,
    Titulo
}