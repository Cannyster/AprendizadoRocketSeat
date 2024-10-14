import { api } from "../lib/axios";

export interface GetEventoDetailsParams{
    eventoId: string;
}

export interface GetEventoDetailsResponse{
    id: string;
    evento: string;
    data_evento: string;
    hora_inicio: string;
    hora_fim: string;
    detalhe: string;
}

export async function getEventoDetails({eventoId}: GetEventoDetailsParams){
    const response = await api.get<GetEventoDetailsResponse>(`/eventos/${eventoId}`)
    return response.data
}