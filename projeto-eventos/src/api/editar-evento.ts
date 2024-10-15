

import { api } from "../lib/axios";

export interface EditarEventoInput{
    eventoId: string;
    evento: string;
    data_evento: string;
    hora_inicio: string;
    hora_fim: string;
    detalhe: string;
}

export interface EditarEventoResponse{
    eventoId: string;
    evento: string;
    data_evento: string;
    hora_inicio: string;
    hora_fim: string;
    detalhe: string;
}

export async function editarEvento({eventoId,...resto}: EditarEventoInput){
    const response = await api.put<EditarEventoResponse>(`/eventos/${eventoId}`, {resto})
    return response.data
}