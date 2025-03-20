import {useNavigate} from 'react-router-dom'
export function Tarjeta({task}) {
  const navigate = useNavigate()
  return (
    <div className='bg-gray-700 bg-opacity-40 p-8 rounded-lg hover:bg-gray-500 h-[220px]'
    onClick={() =>{
      navigate('/tarea/'+ task.id)
    }}
    >
    <h1 className='text-center tx-2xl font-bold mb-2 uppercase line-clamp-1 break-words'>{task.title}</h1>
    <p className='text-center line-clamp-5 break-words'>{task.description}</p>
    </div>

  )
}