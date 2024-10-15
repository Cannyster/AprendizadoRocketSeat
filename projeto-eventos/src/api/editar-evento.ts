

import { api } from "../lib/axios";

export interface EditarEventoInput{
    id: string;
    evento: string;
    data_evento: string;
    hora_inicio: string;
    hora_fim: string;
    detalhe: string;
}

// export interface EditarEventoResponse{
//     eventoId: string;
//     evento: string;
//     data_evento: string;
//     hora_inicio: string;
//     hora_fim: string;
//     detalhe: string;
// }

export async function editarEvento({id,...resto}: EditarEventoInput){
    const response = await api.put(`/eventos/${id}`, {resto})
    return response.data
}