import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Eventos } from "./pages/Eventos";
import { EventosProvider } from "./contexts/EventoContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Toaster
        position="top-left"
        closeButton
        expand={true}
        toastOptions={{
          style: {
            fontSize: "16px",
            padding: "10px",
            maxWidth: "400px",
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <EventosProvider>
          <Eventos />
        </EventosProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
