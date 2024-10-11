import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "./styles";
import * as z from "zod";
import { toast } from "sonner";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventosContext } from "../../contexts/EventoContext";
import { useContextSelector } from "use-context-selector";
import { useQuery } from "@tanstack/react-query";
import { getEventoDetails } from '../../../api/get-evento-details'
import { EventoFormSchema } from "../../validation/validation"

type EventoFormInputs = z.infer<typeof EventoFormSchema>;
export interface EventoDetailsProps {
  id: string;
  open: boolean;
}

export function EventoModalDetails({id, open}: EventoDetailsProps) {

  const {data: evento} = useQuery({
    queryKey: ["evento", id],
    queryFn: () => getEventoDetails({id}),
    enabled: open,
  });

  const editarEvento = useContextSelector(
    EventosContext,
    (context) => {
      return context.editarEvento;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<EventoFormInputs>({
    resolver: zodResolver(EventoFormSchema),
  });

  //console.log(errors)

  function LimparFomulário(){
    reset();
    setValue("data_evento", "");
    setValue("hora_inicio", "");
    setValue("hora_fim", "");
  }

  async function handleEditarEvento(dados: EventoFormInputs) {
    const {id, evento, data_evento, hora_fim, hora_inicio, detalhe } = dados;

    try{
      toast.success("Evento alterado com sucesso",);

      await editarEvento({
        id,
        evento,
        data_evento,
        hora_inicio,
        hora_fim,
        detalhe
      });

      LimparFomulário()

    }catch{
      toast.error("Falha na alteração do evento");
    }    
  }

  return (
    <Dialog.Portal >
      <Overlay />
      <Content onPointerDownOutside={LimparFomulário}>
        
        <Dialog.DialogTitle>Evento Cadastrado</Dialog.DialogTitle>
        
        <CloseButton onClick={LimparFomulário}>
          <X size={24} />
        </CloseButton>
        
        <form onSubmit={handleSubmit(handleEditarEvento)}>

          <input  
            type="Text"
            placeholder="Evento"
            required
            {...register("evento")}
            value={evento?.detalhe}
            onBlur={() => errors.evento && toast.error(errors.evento.message)}
          />
          
          <InputMask
            mask={"99/99/9999"} 
            maskChar={null}
            type="text" 
            placeholder="Data"
            required
            value={evento?.data_evento}
            {...register("data_evento")}
          />
          {errors.data_evento && toast.error(errors.data_evento.message)}

          <InputMask
            mask={"99:99"} 
            maskChar={null}
            type="text"
            placeholder="Hora Inicio"
            required
            value={evento?.hora_inicio}
            {...register("hora_inicio")}
          />
          {errors.hora_inicio && toast.error(errors.hora_inicio.message)}

          <InputMask
            mask={"99:99"} 
            maskChar={null}
            type="text"
            placeholder="Hora Fim"
            required
            value={evento?.hora_fim}
            {...register("hora_fim")}
          />
          {errors.hora_fim && toast.error(errors.hora_fim.message)}

          <input
            type="text"
            placeholder="Detalhe"
            required
            value={evento?.detalhe}
            {...register("detalhe")}
          />
          {errors.detalhe && toast.error(errors.detalhe.message)}

          {/* <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button> */}

        </form>
      </Content>
    </Dialog.Portal>
  );
}

