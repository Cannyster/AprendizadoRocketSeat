import { api } from "../lib/axios";

export interface DeletarEventoInput{
    eventoId: string;
}

export async function deletarEvento({eventoId}: DeletarEventoInput){
    const response = await api.delete(`/eventos/${eventoId}`)
    return response.data
}