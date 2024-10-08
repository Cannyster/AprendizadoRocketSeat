import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import { EventosContext } from "../../contexts/EventoContext";
import { dateFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

import {
  EventosContainer,
  EventosTable
} from "./styles";

export function Eventos() {
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
            {eventos.map((evento) => {
              return (
                <tr key={evento.idevento}>
                  <td width="">{evento.evento}</td>
                  <td>
                    {dateFormatter.format(new Date(evento.data_evento))}
                  </td>
                  <td width="">{evento.hora_inicio}</td>
                  <td width="">{evento.hora_fim}</td>
                  <td width="">{evento.detalhe}</td>
                </tr>
              );
            })}
          </tbody>
        </EventosTable>
      </EventosContainer>
    </div>
  );
}
