import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "./styles";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventosContext } from "../../contexts/EventoContext";
import { useContextSelector } from "use-context-selector";


const novoEventoFormSchema = z.object({
  evento: z.string().min(5, 'O nome deve ter pelo menos 5 caracteres.'),
  data_evento: z.string().refine((val) => {
    const [dia, mes, ano] = val.split('/');
    const dataConvertida = new Date(`${ano}-${mes}-${dia}`);
    return !isNaN(dataConvertida.getTime()); // Valida que a data é válida
  }, {
    message: "Data inválida, use o formato dd/mm/yyyy"
  }),
  hora_inicio: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora de Início inválida, use o formato HH:mm"),
  hora_fim: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora de Fim inválida, use o formato HH:mm"),
  detalhe: z.string().min(5, 'O detalhe deve ter pelo menos 5 caracteres.')
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
    formState: { isSubmitting, errors },
    reset,
    setValue
  } = useForm<NovoEventoFormInputs>({
    resolver: zodResolver(novoEventoFormSchema),
  });

  //console.log(errors)

  async function handleCriarNovoEvento(dados: NovoEventoFormInputs) {
    const { evento, data_evento, hora_fim, hora_inicio, detalhe } = dados;

    try{
      toast.success("Evento cadastrado com sucesso",);

      await criarEvento({
        evento,
        data_evento,
        hora_inicio,
        hora_fim,
        detalhe
      });

      //Utilizei duas abordagens para limpeza do formulário apenas para explorar possiblidades diferentes no react
      // Resetando campos input padrão
      reset();
      // Resetando campos específicos com InputMask manualmente
      setValue("data_evento", "");
      setValue("hora_inicio", "");
      setValue("hora_fim", "");

    }catch{
      toast.error("Falha no cadastro do evento");
    }    
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        
        <Dialog.DialogTitle>Novo Evento</Dialog.DialogTitle>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <Toaster position="top-center" closeButton toastOptions={{ 
          style:{
            fontSize: '16px',  // Aumenta o tamanho da fonte
            padding: '10px',   // Aumenta o espaçamento interno
            maxWidth: '400px', // Limita a largura da notificação
          }
        }}/> 
        
        <form onSubmit={handleSubmit(handleCriarNovoEvento)}>

          <input  
            type="Text"
            placeholder="Evento"
            required
            {...register("evento")}
          />
           {errors.evento && toast.error(errors.evento.message)}

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
