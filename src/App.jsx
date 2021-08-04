import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import validarUsuario from './funciones/validarUsuario';
import './App.css';
import jwt_decode from 'jwt-decode';
import { ContenedorHeader, Header, Titulo } from './elements/Header';
import BotonCerrarSesion from './components/BotonCerrarSesion';
import { ContainerForm } from './elements/ContainerBody';
import { Input } from './elements/Input';
import { Boton } from './elements/Boton';
import { ReactComponent as PlusIcono } from './image/plus.svg';
import { ReactComponent as EditarIcono } from './image/editar.svg';
import SelectCategorias from './components/ContainerSelect';
import { useAlerta } from './context/AlertaContext';
import Alerta from './elements/Alerta';
import axios from 'axios';
import { ContainerButton } from './elements/ContenedorBotones';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import formatearCantidad from './funciones/formatearCantidad';
import TotalGastoMes from './components/TotalGastoMes';


function App({gasto}) {

  const history = useHistory();
  const [cargando, setCargando] = useState(true);
  const [fecha, setFecha] = useState('');
  const [select, setSelect] = useState('hogar');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const { alerta, setAlerta, estadoAlerta, setEstadoAlerta } = useAlerta();
  const [tokenDecoded, setTokenDecoded] = useState('');
  
  useEffect(() => {
    try{
      if(localStorage.getItem('token')){
        const tokenJWT = localStorage.getItem('token');
        setTokenDecoded(jwt_decode(tokenJWT));
        setCargando(false);
      }else {
        history.push('/iniciar-sesion');
      }

    }catch(error){
      console.log(error);
    }

      if(gasto){
        if(tokenDecoded.id === gasto.author){
          setSelect(gasto.categoria);
          setFecha(fromUnixTime(gasto.fecha));
          setCantidad(gasto.cantidad);
          setDescripcion(gasto.descripcion);  
        }
      } 

  }, [history, gasto, tokenDecoded.id]);

  const handleChange = (e) => {
    if(e.target.name === 'descripcion'){
      setDescripcion(e.target.value);

    }else if(e.target.name === 'cantidad'){
      setCantidad(e.target.value.replace(/[^0-9]/g, ''));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!gasto){
      try{
        const res = await axios.post('https://app-gastos-mern.herokuapp.com/api/gastos/create-gasto',{
          descripcion,
          cantidad: Number(cantidad),
          fecha: getUnixTime(fecha),
          categoria: select,
          author: tokenDecoded.id
        }, {headers: validarUsuario()});
        setAlerta({
          tipo: 'exito',
          mensaje: res.data.message
        });
        setEstadoAlerta(true);
        setSelect('hogar');
        setCantidad('');
        setDescripcion('');
        setFecha('');
      }catch(error){
        setAlerta({
          tipo: 'error',
          mensaje: error.response.data.message
        });
        setEstadoAlerta(true);
      }
    }else {
      try{
        const res = await axios.put(`https://app-gastos-mern.herokuapp.com/api/gastos/${gasto._id}`,{
          descripcion,
          cantidad: Number(cantidad),
          fecha: getUnixTime(fecha),
          categoria: select,
          author: gasto.author
        },{headers: validarUsuario()})
        setAlerta({
          tipo: 'exito',
          mensaje: res.data.message
        });
        setEstadoAlerta(true);
        setSelect('hogar');
        setCantidad('');
        setDescripcion('');
        setFecha('');
        history.push('/lista-gastos')
      }catch(error){
        setAlerta({
          tipo: 'error',
          mensaje: error.response.data.message
        });
        setEstadoAlerta(true);
        console.log(error);
      }
    }
  }


  return (
      <>
      {
        !cargando && 
        <>
          <ContenedorHeader>
            <Header>
              <Titulo>
                {
                  gasto ? 'Editar Gasto' : 'Gastos'
                }
              </Titulo>
              <ContainerButton>
                <Boton to="/categorias">Categorias</Boton>  
                <Boton to="/lista-gastos">Lista Gastos</Boton>
                <BotonCerrarSesion />
              </ContainerButton>
            </Header>
          </ContenedorHeader> 

            <ContainerForm onSubmit={handleSubmit}>
          <SelectCategorias 
            select={select}
            setSelect={setSelect}
            fecha={fecha}
            setFecha={setFecha}
          />
              <Input
                type="text" 
                placeholder="Descripcion"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
              />
              <Input
                type="text" 
                placeholder="$0"
                name="cantidad"
                value={formatearCantidad(cantidad)}
                onChange={handleChange}
              />
              {
                gasto ? (<Boton as="button" secundario conIcono>
                  Editar
                  <EditarIcono />
                </Boton>)
                : (<Boton as="button" primario conIcono>
                  Agregar
                <PlusIcono />
              </Boton>)
              }
              
            </ContainerForm>
    
          <Alerta 
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            estadoAlerta={estadoAlerta}
            setEstadoAlerta={setEstadoAlerta}
          />
          <TotalGastoMes />
        </>
      }
      </>
  );
}

export default App;
