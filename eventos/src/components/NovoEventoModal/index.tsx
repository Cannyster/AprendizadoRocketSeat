import * as Dialog from "@radix-ui/react-dialog"; //https://www.radix-ui.com/primitives/docs/components/dialog
import { CloseButton, Content, Overlay } from "./styles";
import * as z from "zod";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventosContext } from "../../contexts/EventoContext";
import { useContextSelector } from "use-context-selector";

const novoEventoFormSchema = z.object({
  idevento: z.string(),
  evento: z.string(),
  data_evento: z.string(),
  hora_inicio : z.string(),
  hora_fim : z.string(),
  detalhe : z.string(),
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
    formState: { isSubmitting },
    reset,
  } = useForm<NovoEventoFormInputs>({
    resolver: zodResolver(novoEventoFormSchema),
  });

  async function handleCriarNovoEvento(dados: NovoEventoFormInputs) {
    const { idevento, evento, data_evento, hora_fim, hora_inicio, detalhe } = dados;

    await criarEvento({
      idevento,
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
          <input
            type="Text"
            placeholder="Data"
            required
            {...register("data_evento")}
          />
          <input
            type="text"
            placeholder="Hora Inicio"
            required
            {...register("hora_inicio")}
          />
          <input
            type="text"
            placeholder="Hora Fim"
            required
            {...register("hora_fim")}
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
