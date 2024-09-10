import { render } from "@testing-library/react";
import { Pagination } from "./pagination";
import { userEvent } from "@testing-library/user-event";

//spy criado para os testes
const onPageChangeCallback = vi.fn();

describe("Pagination", () => {
  // Antes de cada teste, o spy será limpo, para não haver interferências
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it("Should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
  });

  it("Should be able to navigate to the next page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Próxima Página",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it("Should be able to navigate to the previous page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const previousPageButton = wrapper.getByRole("button", {
      name: "Página Anterior",
    });

    const user = userEvent.setup();
    await user.click(previousPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it("Should be able to navigate to the first page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const previousPageButton = wrapper.getByRole("button", {
      name: "Primeira Página",
    });

    const user = userEvent.setup();
    await user.click(previousPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it("Should be able to navigate to the last page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const previousPageButton = wrapper.getByRole("button", {
      name: "Última Página",
    });

    const user = userEvent.setup();

    //verificando as chamada existentes no onPageChangeCallback,
    //não deve haver nenhuma ja que ele esta sendo limpo antes de cada chamada
    //console.log(onPageChangeCallback.mock.calls);
    await user.click(previousPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});
