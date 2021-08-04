import React, { createContext, useContext, useState } from 'react';

const AlertaContext = createContext();

// Hook para acceder al contexto
const useAlerta = () => {
    return useContext(AlertaContext);
}


const AlertaProvider = ({children}) => {

    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});


    return ( 
        <AlertaContext.Provider value={{
            estadoAlerta,
            setEstadoAlerta,
            alerta,
            setAlerta
        }}>
            { children }
        </AlertaContext.Provider>
     );
}
 
export { AlertaProvider, AlertaContext, useAlerta };