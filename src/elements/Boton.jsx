import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../theme';

const Boton = styled(Link)`
    background: ${ (props) => {
        if(props.primario){
            return theme.primario
        }else if (props.secundario){
            return theme.secundario
        }else{
            return theme.negro
        }

        }
    };
    width: ${(props) => {
        if(props.conIcono){
            return '150px';
        } else if(!props.conIcono){
            return 'auto';
        }
    }
    };
    height: ${(props) => {
        if(props.conIcono){
            return '45px';
        } else{
            return 'auto';
        }
    }};
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    border: none;
    color: ${theme.blanco};
    padding: 15px;
    display: inline-flex;
    justify-content: ${(props) => props.conIcono ? 'space-around' : 'center'};
    align-items: center;
    font-size: 15px;
    font-weight: 500px;
    letter-spacing: 1px;
    text-decoration: none;
    margin: 0 3px;

    &:hover{
        background: ${(props) => {
            if(props.primario){
                return theme.primarioHover
            }else if(props.secundario){
                return theme.secundarioHover
            }else{
                return theme.negro
            }
        }
        };
    }

    svg{
      height: ${(props) => props.conIcono ? '100%' : '15px'};
      fill : ${theme.blanco};
    }
`;

export {
    Boton
}