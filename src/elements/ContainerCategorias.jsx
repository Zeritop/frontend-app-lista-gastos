import styled from 'styled-components';
import theme from '../theme';

const ContainerCategorias = styled.div`
    height: 460px;
    width: 60%;
    background: ${theme.blanco};
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media(max-width: 767px){
        width: 100%;
    } 

    @media(min-width: 768px) and (max-width:900px){
        width: 80%;
        height: 800px;
    } 

`;

export {
    ContainerCategorias
}