import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { v4 as uuidv4 } from 'uuid';
import { api } from "../lib/axios";

interface evento {
  idevento: number;
  evento: string;
  data_evento: string;
  hora_inicio: string;
  hora_fim: string;
  detalhe: string;
}

interface EventoContextType {
  eventos: evento[];
  buscaEventos: (query?: string) => Promise<void>;
  criarEvento: (dados: CriarEventoInput) => Promise<void>;
  //editarEvento: (dados: EditarEventoInput ) => Promise<void>
}

interface EventoProviderProps {
  children: ReactNode;
}

interface CriarEventoInput {
  idevento: string,
  evento: string,
  data_evento: string,
  hora_inicio: string,
  hora_fim: string,
  detalhe: string
}

// interface EditarEventoInput {
//   evento?: string;
//   data_evento?: string;
//   hora_inicio?: string;
//   hora_fim?: string;
//   detalhe?: string;
// }

export const EventosContext = createContext({} as EventoContextType);

export function EventosProvider({ children }: EventoProviderProps) {
  const [eventos, setEventos] = useState<evento[]>([]);

  const buscaEventos = useCallback(async (query?: string) => {
    const response = await api.get("eventos", {
      params: { _sort: "data_evento", _order: "desc", q: query },
    });
    setEventos(response.data);
    console.log(response.data);
  }, []);

  const criarEvento = useCallback(
    async (dados: CriarEventoInput) => {
      const {evento, data_evento, hora_inicio, hora_fim, detalhe } = dados;
      const response = await api.post("eventos", {
        idevento: uuidv4(),
        evento,
        data_evento,
        hora_inicio,
        hora_fim,
        detalhe
      });
      setEventos((state) => [response.data, ...state]);
    },
    []
  );

  // const editarEvento = useCallback(
  //   async (dados: EditarEventoInput) => {
  //     const { evento, data_evento, hora_inicio, hora_fim, detalhe } = dados;
  //     const response = await api.post("eventos", {
  //       evento,
  //       data_evento: new Date(),
  //       hora_inicio,
  //       hora_fim,
  //       detalhe
  //     });
  //     setEventos((state) => [response.data, ...state]);
  //   },
  //   []
  // );

  useEffect(() => {
    buscaEventos();
  }, []);

  return (
    <EventosContext.Provider
      value={{
        eventos,
        buscaEventos,
        criarEvento,
        //editarEvento        
      }}
    >
      {children}
    </EventosContext.Provider>
  );
}
