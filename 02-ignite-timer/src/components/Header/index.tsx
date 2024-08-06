import { HeaderContainer } from "./styles";
import { Timer, Scroll } from "phosphor-react";
import logoIgnite from "../../assets/logo-ignite.svg";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="" title="Timer">
          {" "}
          <Timer size={24} />{" "}
        </NavLink>
        <NavLink to="/history" title="Histórico">
          {" "}
          <Scroll size={24} />{" "}
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}

// o elemento NavLink do react-router-dom funciona como um link para outras páginas,
// alem disso ele adiciona uma classe active, para quando aquele botão for clicado ele ficar de forma ativa.
// realmente marcado em destaque, assim podemos adicionar personalização para quando os elementos estiverem com Active.
