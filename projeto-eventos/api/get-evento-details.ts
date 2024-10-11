import { api } from "../src/lib/axios";

export interface GetEventoDetailsParams{
    id: string;
}

export interface GetEventoDetailsResponse{
    id: string;
    evento: string;
    data_evento: string;
    hora_inicio: string;
    hora_fim: string;
    detalhe: string;
}

export async function getEventoDetails({id}: GetEventoDetailsParams){
    const response = await api.get<GetEventoDetailsResponse>(`/eventos/${id}`)
    return response.data
}