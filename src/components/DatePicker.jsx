import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';
import theme from '../theme';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { es } from 'date-fns/locale';

function parseDate(str, format) {
    const parsed = dateFnsParse(str, format, new Date(), { locale: es });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
  
  function formatDate(date, format) {
    return dateFnsFormat(date, format, { locale: es });
  }

  const ContenedorInput = styled.div`
    input{
        width: 230px;
        height: 50px;
        background: ${theme.grisOscuro};
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        font-size: large;
        font-weight: 500;
        letter-spacing: 1px;
        outline: none;
        border: none;
        text-align: center;
    }
  `;

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const dias_semanas = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];


const DatePicker = ({fecha, setFecha}) => {
    return ( 
        <ContenedorInput>
            <DayPickerInput 
                value={fecha}
                onDayChange={(day) => setFecha(day)}
                format="dd 'de' MMMM 'de' yyyy"
                formatDate={formatDate}
                parseDate={parseDate}

                dayPickerProps={
                    {
                        months: meses,
                        weekdaysShort: dias_semanas
                    }
                }
            />
        </ContenedorInput>
        
     );
}
 
export default DatePicker;