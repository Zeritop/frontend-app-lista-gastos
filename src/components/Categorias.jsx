import React, { useEffect, useState } from 'react';
import { Boton } from '../elements/Boton';
import { ContainerCategorias } from '../elements/ContainerCategorias';
import { Header, Titulo, ContenedorHeader } from '../elements/Header';
import { ReactComponent as VolverIcono } from '../image/flecha.svg';
import { ReactComponent as ArrowLeft } from '../image/angle-double-left-solid.svg';
import { ReactComponent as ArrowRight } from '../image/angle-double-right-solid.svg';
import { ListaGastos,
    TituloMes,
    TotalGastado,
    ContenedorListaGastos,
    ContainerBtnLeft,
    ContainerBtnRigth } from '../elements/ElementosDeCategorias';
import formatearCantidad from '../funciones/formatearCantidad';
import IconoCategoria from '../elements/IconoCategorias';
import TotalGastoMes from './TotalGastoMes';
import { Cargando } from './ContainerListaGastos';
import { useGastosMesCategoria } from '../context/GastosCategoria/GastosCategoriasContext';

const Categorias = () => {
    // CONTEXTO REDUCER GASTOS
    const { 
        fechaActual,
        getGastos,
        gastosPorCategoria,
        previousMonth,
        cambioFecha,
        setCambioFecha,
        nextMonth } = useGastosMesCategoria();
    
    // ESTADOS DE FECHA
    const [mes, setMes] = useState(fechaActual.getMonth());
    const [year,setYear] = useState(fechaActual.getFullYear());

    // ESTADOS DE LOS GASTOS
    const [gastos, setGastos] = useState([]);
    const [listaGastos, setListaGastos] = useState([]);

    // Variables Globales
    const nombre_meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre'];
    const [cargandoG, setCargandoG] = useState(true);
    const mesActual = fechaActual.getMonth();
    const actualYear = fechaActual.getFullYear(); 

    const totalGastos = () =>{
        return formatearCantidad(gastos.reduce( (acc, gastos) => acc + gastos.cantidad, 0 ));
    }

    useEffect(() => {
        // Obtener los gastos la primera vez que se renderiza
        
        let tiempo;
        if(cargandoG){
            tiempo = setTimeout(async () => {
                await getGastos();
                setCargandoG(false);
            }, 0);
        }
        setGastos(gastosPorCategoria)
        
        return (() => clearTimeout(tiempo));
        
    }, [cargandoG, gastosPorCategoria, getGastos])
    
    useEffect(() => {
        // Sumar los gastos y devolverlos en un objetos cada ez que cambie el estado 'Gastos'
            const sumaGastos = gastos.reduce( (acc, gasto) => {
                acc[gasto.categoria] += gasto.cantidad
    
                return acc;
            },
            {
                'comida': 0,
                'cuentas y pagos': 0,
                'hogar': 0,
                'transporte': 0,
                'ropa': 0,
                'salud e higiene': 0,
                'compras': 0,
                'diversion': 0
            });

            // Guardar, recorrer y mostrar los gastos en forma de objeto
            setListaGastos(Object.keys(sumaGastos).map( elemento => {
                return {
                    categoria: elemento,
                    cantidad: sumaGastos[elemento]
                }
            } ))
            
    }, [gastos])

    useEffect(() => {
        // Se obtiene el mes, la fecha y los gastos dependiendo de la fecha Actual
        let tiempo;
        
        if(cambioFecha){
            tiempo = setTimeout(async () => {
            setMes(mesActual);
            setYear(actualYear);
            await getGastos();
            setCambioFecha(false);
        }, 0)
    }
    setGastos(gastosPorCategoria)
        return (() => clearTimeout(tiempo))
    }, [cambioFecha, gastosPorCategoria, getGastos, setCambioFecha, mesActual, actualYear])

    return (
        <> 
            <ContenedorHeader>
                <Header>
                    <Boton to="/">
                        <VolverIcono />
                    </Boton>
                    <Titulo>Gastos Por Categoria</Titulo>
                </Header>
            </ContenedorHeader>
            <ContainerCategorias>
                {
                    !cargandoG ? (<>
                    <ContainerBtnLeft>
                    <Boton as="button" onClick={() => previousMonth()} > <ArrowLeft /> </Boton>
                </ContainerBtnLeft>
                <ContenedorListaGastos>
                    <TituloMes>{nombre_meses[mes]} - {year}</TituloMes>
                   {
                       listaGastos.map( (lista, index) => {
                           return <ListaGastos key={index}><p> <IconoCategoria id={lista.categoria} /> {lista.categoria}</p>   <p>{ formatearCantidad(lista.cantidad) }</p> </ListaGastos> 
                       })
                   }
                   <TotalGastado>
                       <p> 
                           <b>Total Gastado:</b> 
                        </p>
                        <p> 
                            <b>{ totalGastos() }</b> 
                        </p> 
                    </TotalGastado>
                </ContenedorListaGastos>
                <ContainerBtnRigth>
                    <Boton as="button" onClick={() => nextMonth()}> <ArrowRight /> </Boton>
                </ContainerBtnRigth> </>)
                : <Cargando>Cargando...</Cargando>
                }
                
            </ContainerCategorias>            
            <TotalGastoMes />
        </>
     );
}
 
export default Categorias;