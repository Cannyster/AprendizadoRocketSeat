import * as z from "zod";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputMask from "react-input-mask";
import { useQuery } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseButton, Content, Overlay } from "./styles";
import { useContextSelector } from "use-context-selector";
import { EventosContext } from "../../contexts/EventoContext";
import { EventoFormSchema } from "../../validation/validation";
import { useEffect, useState } from "react";
import { SkeletonEventoModal } from "../SkeletonEventoModal/SkeletonEventoModal";
import { obterEvento } from "../../api/obter-evento";

type EventoFormInputs = z.infer<typeof EventoFormSchema>;
export interface PropriedadesDetalhesEvento {
  id: string;
  open: boolean;
}

export function EventoModalDetails({ id, open }: PropriedadesDetalhesEvento) {
  // (Flag) estado para controlar se o input pode ser editado
  const [isNotEditable, setIsNotEditable] = useState(true);

  // Função que alterna a flag de edição do input
  const toggleEdit = () => {
    setIsNotEditable((prevState) => !prevState);
  };

  const { data: evento, isFetching } = useQuery({
    queryKey: ["evento", id],
    queryFn: () => obterEvento({ id }),
    enabled: open,
    //vai ser ativo apenas se a propriedade open for true, desativa a busca automatica
    //por isso vai ser true apenas quando um modal for aberto na página eventos.
    //controlado pelo estado - isModalOpen - que inicia com valor false
    //decidi usar useQuery devido ao cacheamento de informações e outras vantagens que ela possui em relação a  useCallback
    //ela foi construida fora do contexto pois este eo único local, que precisará dela
  });

  const editarEvento = useContextSelector(EventosContext, (context) => {
    return context.editarEventoFn;
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
    if (open && evento) {
      setValue("evento", evento.evento || "");
      setValue("data_evento", evento.data_evento || "");
      setValue("hora_inicio", evento.hora_inicio || "");
      setValue("hora_fim", evento.hora_fim || "");
      setValue("detalhe", evento.detalhe || "");
    }
  }, [open, evento, setValue, toggleEdit]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function LimparFomulário() {
    reset();
    setValue("evento", "");
    setValue("data_evento", "");
    setValue("hora_inicio", "");
    setValue("hora_fim", "");
    setValue("detalhe", "");
  }

  async function handleEditarEvento(dados: EventoFormInputs) {
    const { id, evento, data_evento, hora_fim, hora_inicio, detalhe } = dados;
    await editarEvento({
      id,
      evento,
      data_evento,
      hora_inicio,
      hora_fim,
      detalhe,
    });
    LimparFomulário();
  }

  //Aplicando SkeletonModal se os dados estiverem em  carregamento
  if (isFetching) {
    return <SkeletonEventoModal />;
  }

  return (
    <Dialog.Portal>
      <Overlay />
      {/* Caso isEditable estiver flase, ao fechar o modal ele voltara para true */}

      <Content onPointerDownOutside={!isNotEditable ? toggleEdit : undefined}>
        <Dialog.Title>Detalhes Da Atividade</Dialog.Title>
        <Dialog.DialogDescription>Atividade Id: {id}</Dialog.DialogDescription>

        <CloseButton onClick={!isNotEditable ? toggleEdit : undefined}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleEditarEvento)}>
          <input
            type="Text"
            placeholder="Evento"
            required
            {...register("evento")}
            onBlur={() => errors.evento && toast.error(errors.evento.message)}
            disabled={isNotEditable}
          />

          <InputMask
            mask={"99/99/9999"}
            maskChar={null}
            type="text"
            placeholder="Data"
            required
            {...register("data_evento")}
            disabled={isNotEditable}
          />
          {errors.data_evento && toast.error(errors.data_evento.message)}

          <InputMask
            mask={"99:99"}
            maskChar={null}
            type="text"
            placeholder="Hora Inicio"
            required
            {...register("hora_inicio")}
            disabled={isNotEditable}
          />
          {errors.hora_inicio && toast.error(errors.hora_inicio.message)}

          <InputMask
            mask={"99:99"}
            maskChar={null}
            type="text"
            placeholder="Hora Fim"
            required
            {...register("hora_fim")}
            disabled={isNotEditable}
          />
          {errors.hora_fim && toast.error(errors.hora_fim.message)}

          <input
            type="text"
            placeholder="Detalhe"
            required
            {...register("detalhe")}
            disabled={isNotEditable}
          />
          {errors.detalhe && toast.error(errors.detalhe.message)}

          {isNotEditable ? (
            <button type="button" onClick={toggleEdit}>
              Editar
            </button>
          ) : (
            <>
              <button type="submit" disabled={isSubmitting}>
                Salvar
              </button>

              <button type="button" onClick={toggleEdit}>
                Cancelar
              </button>
            </>
          )}
        </form>
      </Content>
    </Dialog.Portal>
  );
}
