import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import { EventosContext } from "../../contexts/EventoContext";
import { useContextSelector } from "use-context-selector";
import { EventosContainer, EventosTable } from "./styles";
import { converterHora, formatarHora } from "../../utils/formatter";
import { DialogTrigger, Root } from "@radix-ui/react-dialog";
import { EventoModalDetails } from "../../components/EventoModal/EventoModal";
import { Search } from "lucide-react";
import { useState } from "react";

export function Eventos() {
  //const [isModalOpen, setIsModalsOpen] = useState(false);
  const [selectedEventoId, setSelectedEventoId] = useState<string | null>(null);

  const eventos = useContextSelector(EventosContext, (context) => {
    return context.eventos;
  });

  return (
    <div>
      <Header />
      <EventosContainer>
        <SearchForm />

        <EventosTable>
          <tbody>
            <tr>
              <td></td>
              <td>Atividade</td>
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
                      open={selectedEventoId === evento.id}
                      onOpenChange={(isOpen) =>
                        setSelectedEventoId(isOpen ? evento.id : null)
                      }
                    >
                      {/* // <Root open={isModalOpen} onOpenChange={setIsModalsOpen}> */}
                      <DialogTrigger asChild>
                        <Search className="h-3 w-3" />
                      </DialogTrigger>
                      <EventoModalDetails
                        key={evento.id} // Força re-renderização
                        open={selectedEventoId === evento.id}
                        // open={isModalOpen}
                        eventoId={evento.id}
                      />
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
