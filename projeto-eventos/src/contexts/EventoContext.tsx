import { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createContext } from "use-context-selector";
import { useMutation } from "@tanstack/react-query";
import { CriarEventoInput, criarEvento } from "../api/criar-evento";
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
  buscaEventos: (query?: string) => Promise<void>;
  criarEventoFn: (dados: CriarEventoInput) => Promise<void>;
  editarEventoFn: (dados: EditarEventoInput) => Promise<void>;
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

  const { mutateAsync: criarEventoFn } = useMutation({
    mutationFn: criarEvento,
    onSuccess: () => {
      toast.success("Evento Criado com sucesso");
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na Criação do evento");
    },
  });

  const { mutateAsync: editarEventoFn } = useMutation({
    mutationFn: editarEvento,
    onSuccess: () => {
      toast.success("Evento alterado com sucesso");
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na alteração do evento");
    },
  });

  // const deletarEvento = useCallback(async (dados: deletarEventoInput) => {
  //   const { id } = dados;
  //   const response = await api.delete(`/eventos/${id}`);
  // }, []);

  //Busca inicial de eventos
  useEffect(() => {
    buscaEventos();
  }, []);

  return (
    <EventosContext.Provider
      value={{
        eventos,
        buscaEventos,
        criarEventoFn,
        editarEventoFn,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
}
