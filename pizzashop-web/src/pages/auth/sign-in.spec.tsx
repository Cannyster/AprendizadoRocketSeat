import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from "./sign-in";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { HelmetProvider } from "react-helmet-async";

describe("SignIn", () => {
  it("should set default email input value if email is present on search params", () => {
    // Para testar esse NavLink e necessário definir um router por volta dele
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            //Memory Router a rota ativa fica salva em memoria apenas
            <MemoryRouter
              initialEntries={["/sign-in?email=johndoe@example.com"]}
            >
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        );
      },
    });

    const emailInput = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;
    console.log(emailInput.outerHTML);

    expect(emailInput.value).toEqual("johndoe@example.com");

    wrapper.debug();
  });
});
