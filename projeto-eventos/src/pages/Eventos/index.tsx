import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import { EventosContext } from "../../contexts/EventoContext";
import { useContextSelector } from "use-context-selector";

import {
  EventosContainer,
  EventosItem
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

        {/* <EventosTable>
          <tbody>
            <tr>
              <td>Evento</td>
              <td>Data</td>
              <td>Hora Inicio</td>
              <td>Hora Fim</td>
              <td>Detalhe</td>
            </tr>
            {eventos.map((evento) => {
              return (
                <tr key={evento.id}>
                  <td>{evento.evento}</td>
                  <td>{evento.data_evento}</td>
                  <td>{formatarHora.format(converterHora(evento.hora_inicio))}</td>
                  <td>{formatarHora.format(converterHora(evento.hora_fim))}</td>
                  <td>{evento.detalhe}</td>
                </tr>
              );
            })}
          </tbody>
        </EventosTable> */}
        
        <EventosItem>
           {eventos.map((evento) => {
              return(
                <div key={evento.id}>
                  <strong>{evento.evento}</strong>
                  <p>{evento.data_evento}</p>
                  <p>{evento.detalhe}</p>
                </div>
              );
            })} 
        </EventosItem>
            
        
      </EventosContainer>
    </div>
  );
}
