import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://react-django-gestion-tareas.vercel.app/tasks/api/task/'
})

export const Recibirapi = () => {
    return Api.get('/')
}

export const Recibirtarea = (id) => {
    return Api.get('/'+id+'/')
}

export const creartarea = (task) => {
    return Api.post('/', task)
}

export const borrartarea = (id) => {
    return Api.delete('/'+id+'/')
}

export const actualizar = (id, task) => {
    return Api.put('/'+id+'/', task)
}