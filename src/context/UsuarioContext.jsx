import React, { createContext, useContext, useState } from 'react';

const UsuarioContext = createContext();

// Hook para acceder contexto
const useUsuario = () => {
    return useContext(UsuarioContext);
}

const UsuarioProvider = ({children}) => {

    const [usuario, setUsuario] = useState({});
    
    return ( 
        <UsuarioContext.Provider value={
            {
                usuario,
                setUsuario
            }
        }>
            { children }
        </UsuarioContext.Provider>
     );
}
 
export { useUsuario, UsuarioProvider, UsuarioContext };