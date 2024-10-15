import { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createContext } from "use-context-selector";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
import { obterEventos } from "../api/obter-eventos";
import { obterEvento } from "../api/obter-evento";
import { CriarEventoInput } from "../api/criar-evento";
import { editarEvento } from "../api/editar-evento";
import { EditarEventoInput } from "../api/editar-evento";
import { api } from "../lib/axios";

export interface Evento {
  id: string;
  evento: string;
  data_evento: string;
  hora_inicio: string;
  hora_fim: string;
  detalhe: string;
}
interface EventoContextType {
  eventos: Evento[];
}
interface EventoProviderProps {
  children: ReactNode;
}

export const EventosContext = createContext({} as EventoContextType);

export function EventosProvider({ children }: EventoProviderProps) {
  const [eventos, setEventos] = useState<Evento[]>([]);

  const buscaEventos = useCallback(async (query?: string) => {
    const response = await api.get("eventos", {
      params: { _sort: "data_evento", _order: "desc", q: query },
    });
    setEventos(response.data);
    console.log(response.data);
  }, []);

  // const buscaEvento = useCallback(async (query?: string) => {
  //   const response = await api.get("eventos", {
  //     params: { _sort: "evento", _order: "desc", q: query },
  //   });
  //   setEventos(response.data);
  //   console.log(response.data);
  // }, []);

  // const { mutateAsync: criarEventoFn } = useMutation({
  //   mutationFn: criarEvento,
  // });

  // useMutation para editar evento
  // const { mutateAsync: editarEventoFn } = useMutation<
  //   Evento,
  //   Error,
  //   EditarEventoInput
  // >(
  //   editarEvento(id)
  //   )},
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("eventos"); // Atualiza o cache após edição
  //       toast.success("Evento alterado com sucesso");
  //     },
  //     onError: () => {
  //       toast.error("Falha na alteração do evento");
  //     },
  //   }
  // ;

  // const deletarEvento = useCallback(async (dados: deletarEventoInput) => {
  //   const { id } = dados;
  //   const response = await api.delete(`/eventos/${id}`);
  // }, []);

  // Busca inicial de eventos
  // useEffect(() => {
  //   buscaEventos();
  // }, []);

  return (
    <EventosContext.Provider
      value={{
        eventos,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
}
