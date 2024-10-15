import { api } from "../lib/axios";

export interface ObterEventoInput{
    id: string;
}

export interface ObterEventoResponse{
    id: string;
    evento: string;
    data_evento: string;
    hora_inicio: string;
    hora_fim: string;
    detalhe: string;
}

export async function obterEvento({id}: ObterEventoInput){
    const response = await api.get<ObterEventoResponse>(`/eventos/${id}`)
    return response.data
}