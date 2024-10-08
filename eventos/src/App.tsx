import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Eventos } from "./pages/Eventos";
import { EventosProvider } from "./contexts/EventoContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <EventosProvider>
        <Eventos />
      </EventosProvider>
    </ThemeProvider>
  );
}
