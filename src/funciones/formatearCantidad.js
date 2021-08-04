const formatearCantidad = (cantidad) => {
    try {
        return  new Intl.NumberFormat(
               'es-CL',
               {
                   style: 'currency',
                   currency: 'CLP' 
               }
               ).format(cantidad) 
    
    } catch (error) {
        console.log(error);       
    }
        
    }

export default formatearCantidad;