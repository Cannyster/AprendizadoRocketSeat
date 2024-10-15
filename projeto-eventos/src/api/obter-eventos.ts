import { Evento } from "../contexts/EventoContext";
import { api } from "../lib/axios";

export interface ObterEventosResponse{
    id: string;
    evento: string;
    data_evento: string;
    hora_inicio: string;
    hora_fim: string;
    detalhe: string
}

export async function obterEventos(query?: string): Promise<Evento[]>{
    const response = await api.get(`/eventos`,{
        params: { _sort: "data_evento", _order: "desc", q: query },
      })
    return response.data
}