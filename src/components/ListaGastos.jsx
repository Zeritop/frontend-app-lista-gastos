import React, { useEffect, useState } from 'react';
import { Boton } from '../elements/Boton';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import { ReactComponent as VolverIcono } from '../image/flecha.svg';
import { 
    BtnCrud,
    Cargando,
    ContainerBotones,
    ContainerCategoria,
    ContainerListaGastos,
    GastoFecha,
    ItemGasto,
    CargarMas} from './ContainerListaGastos';
import axios from 'axios';
import validarUsuario from '../funciones/validarUsuario';
import IconoCategoria from '../elements/IconoCategorias';
import { ReactComponent as EditarIcono } from '../image/editar.svg';
import { ReactComponent as BorrarIcono } from '../image/borrar.svg';
import { format, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';
import Alerta from '../elements/Alerta';
import { useAlerta } from '../context/AlertaContext';
import formatearCantidad from '../funciones/formatearCantidad';
import jwt_decode from 'jwt-decode';
import TotalGastoMes from './TotalGastoMes';

const ListaGastos = () => {

    // Estados Gastos
    const [gastos, setGastos] = useState([]);
    
    //Estados / variables globales
    const [count, setCount] = useState(1);
    const [hayMas, setHayMas] = useState(true);
    const [cargandoG, setCargandoG] = useState(true);
    const { alerta, setAlerta, estadoAlerta, setEstadoAlerta } = useAlerta();
    const token = localStorage.getItem('token');
    const tokenD = jwt_decode(token);

    useEffect(() => {
        let tiempo;

        if(cargandoG){
            tiempo = setTimeout(() =>{
                axios.post('https://app-gastos-mern.herokuapp.com/api/gastos',{author: tokenD.id, count: 0} ,{headers: validarUsuario()})
                .then((gasto => setGastos(gasto.data.gastos)))
                .catch(error => console.log(error))
                setCargandoG(false);
            }, 2000)
        }

        return (() => clearTimeout(tiempo));
    }, [cargandoG, tokenD.id])

    const formatearFecha = (fecha) => {
        return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es});
    }

    const eliminarGasto = async (id) => {
        try{
            const res = await axios.delete(`https://app-gastos-mern.herokuapp.com/api/gastos/${id}`, {headers: validarUsuario()})
            setAlerta({
                tipo: 'exito',
                mensaje: res.data.message
            });
            setEstadoAlerta(true);
            await axios.post('https://app-gastos-mern.herokuapp.com/api/gastos',{author: tokenD.id}, {headers: validarUsuario()})
            .then((gasto => setGastos(gasto.data.gastos) ))
            .catch(error => console.log(error))
        }catch(error){
            setAlerta({
                tipo: 'error',
                mensaje: error.response.data.message
            });
            setEstadoAlerta(true);
        }
    }

    const cargarMas = async () => {
        let contador = 10 * count
        try{
            const gasto = await axios.post('https://app-gastos-mern.herokuapp.com/api/gastos',{author: tokenD.id, count: contador} ,{headers: validarUsuario()})
            setGastos([...gastos.concat(gasto.data.gastos)])
            setCount(count +1)
            if(gasto.data.gastos.length === 0){
                setHayMas(false);
            }
        }catch(error){
            console.log(error);
        }
    }

    return ( 
        <>
            <ContenedorHeader>
                <Header>
                    <Boton to="/">
                        <VolverIcono />
                    </Boton>
                    <Titulo>
                        Lista Gastos
                    </Titulo>
                </Header>
            </ContenedorHeader>
            <ContainerListaGastos>
                {
                    !cargandoG ? (gastos.map( (gasto, index) => (
                        
                        gastos.length !== 0  ? (<div key={gasto._id}>
                                
                                {
                                    index === 0 ? (<GastoFecha >{formatearFecha(gasto.fecha)}</GastoFecha>)
                                    : ( gastos[index -1].fecha !== gasto.fecha 
                                        ? <GastoFecha >{formatearFecha(gasto.fecha)}</GastoFecha> 
                                        : <div></div> )
                                }
                                
                                <ItemGasto >
                                    <ContainerCategoria>
                                     <IconoCategoria id={gasto.categoria}/>
                                     { gasto.descripcion }
                                    </ContainerCategoria>
                                    
                                      <ContainerBotones>
                                          {formatearCantidad(gasto.cantidad)}
                                          <BtnCrud to={`/editar-gasto/${gasto._id}`}>
                                              <EditarIcono />
                                          </BtnCrud>
                                          <BtnCrud 
                                            as="button"
                                            onClick={() => eliminarGasto(gasto._id)}    
                                        >
                                              <BorrarIcono />
                                          </BtnCrud>
                                      </ContainerBotones>
                                </ItemGasto>
                                
                            </div>) : ( <div></div> )
                        
                        
                    )  )) : ( <Cargando>Cargando...</Cargando> )  
                }
                {
                    !cargandoG && (gastos.length === 0 ? <Cargando>No hay gastos... <Boton to="/">Agregar Gasto</Boton></Cargando> : (
                        hayMas && <CargarMas><Boton as="button" onClick={() => cargarMas()} >Cargar Más</Boton></CargarMas>
                    
                        )
                    ) 
                    
                }
            </ContainerListaGastos>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
            />
            <TotalGastoMes />
        </>
     );
}
 
export default ListaGastos;