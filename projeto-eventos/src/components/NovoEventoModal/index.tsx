import * as z from "zod";
import { toast } from "sonner";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseButton, Content, Overlay } from "./styles";
import { baseSchema } from "../../validation/validation";
import { useContextSelector } from "use-context-selector";
import { EventosContext } from "../../contexts/EventoContext";

type NovoEventoFormInputs = z.infer<typeof baseSchema>;

export function NovoEventoModal() {
  // Usando o use-context-selector, para selecionar unicamente uma informação que deve ser acompanhada
  // assim vai evitar a renderização completa que eo padrão do react
  const criarEvento = useContextSelector(EventosContext, (context) => {
    return context.criarEvento;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NovoEventoFormInputs>({
    resolver: zodResolver(baseSchema),
  });

  //console.log(errors)

  /* Foi necessário definir como função para que seja reutilizado em diversos momentos
  Utilizei duas abordagens para limpeza do formulário apenas para explorar possiblidades diferentes no react:
    - reset limpa campos input padrão
    - setValue limpa campos InputMask */
  function LimparFomulário() {
    reset();
    setValue("data_evento", "");
    setValue("hora_inicio", "");
    setValue("hora_fim", "");
  }

  async function handleCriarNovoEvento(dados: NovoEventoFormInputs) {
    const { evento, data_evento, hora_fim, hora_inicio, detalhe } = dados;

    try {
      toast.success("Evento cadastrado com sucesso");

      await criarEvento({
        evento,
        data_evento,
        hora_inicio,
        hora_fim,
        detalhe,
      });

      LimparFomulário();
    } catch {
      toast.error("Falha no cadastro do evento");
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onPointerDownOutside={LimparFomulário}>
        <Dialog.DialogTitle>Novo Registro de Atividade</Dialog.DialogTitle>

        <CloseButton onClick={LimparFomulário}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCriarNovoEvento)}>
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
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
