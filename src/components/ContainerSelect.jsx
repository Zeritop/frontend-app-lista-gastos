import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { ReactComponent as DownIcono } from '../image/down.svg';
import IconoCategoria from '../elements/IconoCategorias';
import DatePicker from './DatePicker';

const ConatinerSelect = styled.div`
    width: 100%;
    height: 15%;
    background:${theme.blanco};
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10%;

    @media(max-width: 414px){
        flex-direction: column;
    } 
`;

const SelectCategoria = styled.div`
    width: 230px;
    height: 50px;
    background: ${theme.grisOscuro};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-transform: uppercase;
    font-size: large;
    font-weight: 500;
    letter-spacing: 1px;

    svg{
        height: 100%;
        fill: ${theme.negro};
    }

    &:hover{
        background: ${theme.gris};
    }

    @media(max-width: 414px){
        min-height: 65%;
        margin: 5px 0;
    } 
`;

const ContenedorCategorias = styled.div`
    /* z-index: 12; */
    width: 230px;
    height: 200px;
    position: absolute;
    background: ${theme.grisOscuro};
    top: 37%;
    /* left: 472px; */
    overflow-y: auto;

    @media(max-width: 360px){
        top: 39%;
    }

    @media (min-width: 376px) and (max-width: 414px){
        top: 40%;
    } 

    @media(min-width: 375px) and (max-width: 400px) and (min-height: 812px) and (max-height: 1023px){
        top: 40%;
    } 

    @media (min-width: 768px) and (max-width: 900px){
        top: 43%;
    } 
`;

const Opcion = styled.div`
    width: 100%;
    height: auto;
    background: ${theme.grisOscuro};
    display: flex;
    align-items: center;

    svg{
        height: auto;
        width: 28px;
        margin-right: 20px;
    }

    &:hover{
        background: ${theme.gris};
    }
`;

const SelectCategorias = ({select, setSelect, fecha, setFecha}) => {

    const [openCategorias, setOpenCategorias] = useState(false);

    const categoria = [
        {id: 'comida', texto: 'Comida'},
        {id: 'cuentas y pagos', texto: 'Cuentas y pagos'},
        {id: 'hogar', texto: 'Hogar'},
        {id: 'transporte', texto: 'Transporte'},
        {id: 'ropa', texto: 'Ropa'},
        {id: 'salud e higiene', texto: 'Salud e Higiene'},
        {id: 'compras', texto: 'Compras'},
        {id: 'diversion', texto: 'Diversion'}
    ];

    const seleccionarCategoria = (e) => {
        setSelect(e.target.dataset.valor);
        setOpenCategorias(false);
    }

    const mostrarCategorias = () =>{
        setOpenCategorias(!openCategorias);
    }


    return ( 
        <ConatinerSelect>
            <SelectCategoria 
                onClick={() => mostrarCategorias()}   
            >
                { select }
                <DownIcono />
            {
                openCategorias &&
                    <ContenedorCategorias>
                        {
                            categoria.map(cat => (
                                <Opcion 
                                    key={cat.id}
                                    data-valor={cat.id}
                                    onClick={(e) => seleccionarCategoria(e)}
                                >
                                    <IconoCategoria id={cat.id} />
                                    { cat.texto }
                                </Opcion>
                            ))
                        }
                    </ContenedorCategorias>
            }
            </SelectCategoria>
            <DatePicker 
                fecha={fecha}
                setFecha={setFecha}
            /> 
          </ConatinerSelect> 
     );
}
 
export default SelectCategorias;
