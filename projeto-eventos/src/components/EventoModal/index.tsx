import * as z from "zod";
import { toast } from "sonner";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useQuery } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseButton, Content, Overlay } from "./styles";
import { useContextSelector } from "use-context-selector";
import { EventosContext } from "../../contexts/EventoContext";
import { EventoFormSchema } from "../../validation/validation";
import { getEventoDetails } from "../../api/get-evento-details";
import { useEffect } from "react";

type EventoFormInputs = z.infer<typeof EventoFormSchema>;
export interface EventoDetailsProps {
  id: string;
  open: boolean;
}

export function EventoModalDetails({ id, open }: EventoDetailsProps) {
  const { data: evento } = useQuery({
    queryKey: ["evento", id],
    queryFn: () => getEventoDetails({ id }),
    enabled: open,
    //vai ser ativo apenas se a propriedade open for true, desativa a busca automatica
    //por isso vai ser true apenas quando um modal for aberto na página eventos.
    //controlado pelo estado - isModalOpen - que inicia com valor false
  });

  const editarEvento = useContextSelector(EventosContext, (context) => {
    return context.editarEvento;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<EventoFormInputs>({
    resolver: zodResolver(EventoFormSchema),
    defaultValues: {
      evento: evento?.evento || "",
      data_evento: evento?.data_evento || "",
      hora_inicio: evento?.hora_inicio || "",
      hora_fim: evento?.hora_fim || "",
      detalhe: evento?.detalhe || "",
    },
  });

  useEffect(() => {
    if (evento) {
      reset(evento); // Preenche o formulário com os dados do evento ao carregar
    }
  }, [evento, reset]);

  function LimparFomulário() {
    reset();
    setValue("data_evento", "");
    setValue("hora_inicio", "");
    setValue("hora_fim", "");
  }

  async function handleEditarEvento(dados: EventoFormInputs) {
    const { id, evento, data_evento, hora_fim, hora_inicio, detalhe } = dados;

    try {
      await editarEvento({
        id,
        evento,
        data_evento,
        hora_inicio,
        hora_fim,
        detalhe,
      });

      LimparFomulário();
      toast.success("Evento alterado com sucesso");
    } catch {
      toast.error("Falha na alteração do evento");
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onPointerDownOutside={LimparFomulário}>
        <Dialog.Title>Detalhes Da Atividade</Dialog.Title>
        <Dialog.DialogDescription>Atividade Id: {id}</Dialog.DialogDescription>

        <CloseButton onClick={LimparFomulário}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleEditarEvento)}>
          <input
            type="Text"
            placeholder="Evento"
            required
            {...register("evento")}
            onBlur={() => errors.evento && toast.error(errors.evento.message)}
          />

          <InputMask
            mask={"99/99/9999"}
            maskChar={null}
            type="text"
            placeholder="Data"
            required
            {...register("data_evento")}
          />
          {errors.data_evento && toast.error(errors.data_evento.message)}

          <InputMask
            mask={"99:99"}
            maskChar={null}
            type="text"
            placeholder="Hora Inicio"
            required
            {...register("hora_inicio")}
          />
          {errors.hora_inicio && toast.error(errors.hora_inicio.message)}

          <InputMask
            mask={"99:99"}
            maskChar={null}
            type="text"
            placeholder="Hora Fim"
            required
            {...register("hora_fim")}
          />
          {errors.hora_fim && toast.error(errors.hora_fim.message)}

          <input
            type="text"
            placeholder="Detalhe"
            required
            {...register("detalhe")}
          />
          {errors.detalhe && toast.error(errors.detalhe.message)}

          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
