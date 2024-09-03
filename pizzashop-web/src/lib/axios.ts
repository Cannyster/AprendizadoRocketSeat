import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    // com o withcredential, ele ja pega informação dos cookies automaticamente
    withCredentials: true
})