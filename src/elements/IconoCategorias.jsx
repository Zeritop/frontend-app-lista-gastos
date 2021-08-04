import React from 'react';
import { ReactComponent as ComidaIcono } from '../image/cat_comida.svg';
import { ReactComponent as ComprasIcono } from '../image/cat_compras.svg';
import { ReactComponent as CuentasYPagosIcono } from '../image/cat_cuentas-y-pagos.svg';
import { ReactComponent as DiversionIcono } from '../image/cat_diversion.svg';
import { ReactComponent as HogarIcono } from '../image/cat_hogar.svg';
import { ReactComponent as RopaIcono } from '../image/cat_ropa.svg';
import { ReactComponent as SaludEHigieneIcono } from '../image/cat_salud-e-higiene.svg';
import { ReactComponent as TransporteIcono } from '../image/cat_transporte.svg';

const IconoCategoria = ({id}) => {
        switch (id) {
            case 'comida':
                return <ComidaIcono/>
            case 'compras':
                return <ComprasIcono />
            case 'cuentas y pagos':
                return <CuentasYPagosIcono />
            case 'diversion':
                return <DiversionIcono />
            case 'hogar':
                return <HogarIcono />
            case 'ropa':
                return <RopaIcono />
            case 'salud e higiene':
                return <SaludEHigieneIcono />
            case 'transporte':
                return <TransporteIcono />                        
            default:
                return '';
        }
}
 
export default IconoCategoria;