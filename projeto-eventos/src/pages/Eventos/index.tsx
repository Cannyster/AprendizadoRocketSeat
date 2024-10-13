import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import { EventosContext, Evento } from "../../contexts/EventoContext";
import { useContextSelector } from "use-context-selector";
import { EventosContainer, EventosTable } from "./styles";
import { converterHora, formatarHora } from "../../utils/formatter";
import { Dialog, DialogTrigger, Root } from "@radix-ui/react-dialog";
import { EventoModalDetails } from "../../components/EventoModal";
import { useState } from "react";
import { Search } from "lucide-react";

export function Eventos() {
  const eventos = useContextSelector(EventosContext, (context) => {
    return context.eventos;
  });

  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  const handleOpenModal = (evento: Evento) => {
    console.log("Evento selecionado:", evento);
    setSelectedEvento(evento);
  };

  const handleCloseModal = () => {
    console.log("Evento Fechado");
    setSelectedEvento(null);
  };

  return (
    <div>
      <Header />
      <EventosContainer>
        <SearchForm />

        <EventosTable>
          <tbody>
            <tr>
              <td></td>
              <td>Evento</td>
              <td>Data</td>
              <td>Hora Inicio</td>
              <td>Hora Fim</td>
              <td>Detalhe</td>
            </tr>
            {eventos.map((evento) => {
              return (
                <tr key={evento.id}>
                  <td>
                    <Root
                      open={!!selectedEvento}
                      onOpenChange={handleCloseModal}
                    >
                      <DialogTrigger asChild>
                        <button>
                          <Search className="h-3 w-3" />
                        </button>
                      </DialogTrigger>
                      {selectedEvento && (
                        <EventoModalDetails
                          id={selectedEvento.id}
                          // onClose={handleCloseModal}
                        />
                      )}
                    </Root>
                  </td>
                  <td>{evento.evento}</td>
                  <td>{evento.data_evento}</td>
                  <td>
                    {formatarHora.format(converterHora(evento.hora_inicio))}
                  </td>
                  <td>{formatarHora.format(converterHora(evento.hora_fim))}</td>
                  <td>{evento.detalhe}</td>
                </tr>
              );
            })}
          </tbody>
        </EventosTable>
      </EventosContainer>
    </div>
  );
}
