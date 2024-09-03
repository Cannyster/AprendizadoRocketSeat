import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    // com o withcredential, ele ja pega informação dos cookies automaticamente
    withCredentials: true
})

//Interceptors executam alguma função antes de cada requisição no axiso
//nesse caso adicionei um delay de 3 segundos para toda requisição
if(env.VITE_ENABLE_API_DELAY){
    api.interceptors.request.use(async(config) => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        return config
    })
}