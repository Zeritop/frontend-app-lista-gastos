import React, { createContext, useContext, useEffect, useState } from 'react';
import ObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';

const GastosDelMes = createContext();

const useTotal = () => {
    return useContext(GastosDelMes);
}

const GastosDelMesProvider = ({children}) => {

    const [total, setTotal] = useState(0);
    const gastos = ObtenerGastosDelMes();

    useEffect(() => {

        setTotal(gastos.reduce( (acc, gastos) => acc + gastos.cantidad, 0 ))

    }, [gastos]);

    return ( 
        <GastosDelMes.Provider value={{total: total}}>
            { children }
        </GastosDelMes.Provider>
     );
}
 
export { GastosDelMesProvider, useTotal };