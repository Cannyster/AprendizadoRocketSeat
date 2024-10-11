import * as z from "zod";

export const baseSchema = z.object({
    evento: z.string().min(5, 'O nome deve ter pelo menos 5 caracteres.'),
    data_evento: z.string().refine((val) => {
        const [dia, mes, ano] = val.split('/');
        const dataConvertida = new Date(`${ano}-${mes}-${dia}`);
        return !isNaN(dataConvertida.getTime()); // Valida que a data é válida
    }, {
        message: "Data inválida"
    }),
    hora_inicio: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora de Início inválida, defina entre 00:00 e 23:59"),
    hora_fim: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora de Fim inválida, defina entre 00:00 e 23:59"),
    detalhe: z.string().min(5, 'O detalhe deve ter pelo menos 5 caracteres.')
});

export const EventoFormSchema = baseSchema.extend({
    id: z.string()
});
