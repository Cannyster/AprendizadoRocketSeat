import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Eventos } from "./pages/Eventos";
import { EventosProvider } from "./contexts/EventoContext";
import { Toaster } from "sonner";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Toaster position="top-left" closeButton expand={true} toastOptions={{ 
          style:{
            fontSize: '16px',
            padding: '10px',   
            maxWidth: '400px', 
          }
        }}/> 
      <EventosProvider>
        <Eventos />
      </EventosProvider>
    </ThemeProvider>
  );
}
