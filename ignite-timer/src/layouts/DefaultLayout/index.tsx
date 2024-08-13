import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/index";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}

// o <Outlet /> baiscamente representa o restante dos elementos da página
// sempre começa com a mesmo Header padrão e depois carrega as informações próprias da página.
