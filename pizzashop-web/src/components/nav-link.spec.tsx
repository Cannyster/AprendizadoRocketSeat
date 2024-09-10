import { render } from "@testing-library/react";
import { NavLink } from "./nav-link";
import { MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
  it("should highlight the nav link when is the current pago link", () => {
    // Para testar esse NavLink e necessário definir um router por volta dele
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            //Memory Router a rota ativa fica salva em memoria apenas
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    wrapper.debug();

    expect(wrapper.getByText("About").dataset.current).toEqual("true");
    expect(wrapper.getByText("Home").dataset.current).toEqual("false");
  });
});
