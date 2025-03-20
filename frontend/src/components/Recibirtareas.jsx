import React from 'react';
import { Recibirapi } from '../api/tarea.api';
import { useEffect, useState } from 'react';
import { Tarjeta } from './Tarjetas';
 export function Recibirtareas() {
    const [tarea, setTarea] = useState([])
   
    useEffect(() => {
      async function cargaTarea() {
            const res = await Recibirapi()
            setTarea(res.data)
      }
      cargaTarea()
     }, []);
  return (
    <div className='grid grid-cols-3 gap-3'>
        {tarea.map((task) => (
        <Tarjeta key={task.id} task={task}/>

        ))}
    </div>
  )
}

export default Recibirtareas