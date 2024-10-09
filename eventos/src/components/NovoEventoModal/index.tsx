import * as Dialog from "@radix-ui/react-dialog"; //https://www.radix-ui.com/primitives/docs/components/dialog
import { CloseButton, Content, Overlay } from "./styles";
import * as z from "zod";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventosContext } from "../../contexts/EventoContext";
import { useContextSelector } from "use-context-selector";
import { validarHora } from "../../utils/formatter"

const novoEventoFormSchema = z.object({
  evento: z.string().max(50, 'Quantia Máxima de 50 Caracteres'),
  data_evento: z.string().date('Data Invalida'),
  hora_inicio : z.string(),
  hora_fim : z.string(),
  detalhe : z.string().max(200, 'Quantia Máxima de 200 Caracteres'),
});

type NovoEventoFormInputs = z.infer<typeof novoEventoFormSchema>;

export function NovoEventoModal() {
  // Usando o use-context-selector, para selecionar unicamente uma informação que deve ser acompanhada
  // assim vai evitar a renderização completa que eo padrão do react
  const criarEvento = useContextSelector(
    EventosContext,
    (context) => {
      return context.criarEvento;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors  },
    reset,
  } = useForm<NovoEventoFormInputs>({
    resolver: zodResolver(novoEventoFormSchema),
  });

  async function handleCriarNovoEvento(dados: NovoEventoFormInputs) {
    const { evento, data_evento, hora_fim, hora_inicio, detalhe } = dados;

    console.log('Criar Evento Modal')

    await criarEvento({
      evento,
      data_evento,
      hora_inicio,
      hora_fim,
      detalhe
    });
    
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        
        <Dialog.DialogTitle>Novo Evento</Dialog.DialogTitle>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCriarNovoEvento)}>

          <input  
            type="Text"
            placeholder="Evento"
            required
            {...register("evento")}
          />
          <InputMask
            mask='99/99/9999' //Máscara de Entrada de dados
            maskChar={null} //Remover os __ que vem na máscara de dados
            type="Text" //Apesar 
            placeholder="Data"
            required
            {...register("data_evento")}
          />
          <InputMask
            mask='99:99'
            maskChar={null}
            type="text"
            placeholder="Hora Inicio"
            required
            {...register("hora_inicio",{
              required: "Horário Invalido",
              validate: validarHora
            })}
          />
          <InputMask
            mask='99:99'
            maskChar={null}
            type="text"
            placeholder="Hora Fim"
            required
            {...register("hora_fim",{
              required: "Horário Invalido",
              validate: validarHora
            })}
          />
          <input
            type="text"
            placeholder="Detalhe"
            required
            {...register("detalhe")}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>

        </form>
      </Content>
    </Dialog.Portal>
  );
}
