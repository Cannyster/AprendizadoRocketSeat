import { api } from "../lib/axios";

export interface CriarEventoInput{
    evento: string;
    data_evento: string;
    hora_inicio: string;
    hora_fim: string;
    detalhe: string;
}

// export interface CriarEventoResponse{
//     id: string;
//     evento: string;
//     data_evento: string;
//     hora_inicio: string;
//     hora_fim: string;
//     detalhe: string;
// }

export async function criarEvento({
    evento,
    data_evento,
    hora_inicio,
    hora_fim,
    detalhe}: CriarEventoInput){
    const response = await api.post(`/eventos`, {
        evento,
        data_evento,
        hora_inicio,
        hora_fim,
        detalhe
    })
    return response.data
}