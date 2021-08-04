import styled from 'styled-components';
import theme from '../theme';

const Input = styled.input`
    width: 80%;
    border: none;
    outline: none;
    text-align: center;
    height: 40px;
    /* background: ${theme.gris}; */
    border-bottom: 1px solid ${theme.negro};
    /* border-radius: 25px; */
    margin-bottom: 40px;
    font-size: large;

    &::placeholder{
        color: ${theme.negro};
        font-size: large;
        text-align: center;
    }
`;

export {
    Input
}