import styled from 'styled-components';
import theme from '../theme';

const ContainerForm = styled.form`
    width: 60%;
    height: 70vh;
    background: ${theme.blanco};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media(max-width: 767px) {
        width: 100%;
    }

    @media(min-width: 768px) and (max-width: 900px){
        width: 80%
    }
`;

const Contenedor = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;


export {
    ContainerForm,
    Contenedor
}