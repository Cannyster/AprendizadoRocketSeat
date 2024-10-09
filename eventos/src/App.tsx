import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Eventos } from "./pages/Eventos";
import { Toaster } from "sonner";
import { EventosProvider } from "./contexts/EventoContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster duration={3000} richColors position="top-right"/>
      <GlobalStyle />
      <EventosProvider>
        <Eventos />
      </EventosProvider>
    </ThemeProvider>
  );
}
