import { OrderStatus } from "./order-status";
import { render } from "@testing-library/react";

describe("Order Status", () => {
  it("should displya the right text based on order status is pending", () => {
    /* Pending */
    const wrapper = render(<OrderStatus status="pending" />);

    const statusText = wrapper.getByText("Pendente");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });

  it("should displya the right text based on order status is canceled", () => {
    /* Pending */
    const wrapper = render(<OrderStatus status="canceled" />);

    const statusText = wrapper.getByText("Cancelado");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });

  it("should displya the right text based on order status is processing", () => {
    /* Pending */
    const wrapper = render(<OrderStatus status="processing" />);

    const statusText = wrapper.getByText("Em Preparo");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should displya the right text based on order status is delivering", () => {
    /* Pending */
    const wrapper = render(<OrderStatus status="delivering" />);

    const statusText = wrapper.getByText("Em Entrega");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should displya the right text based on order status is delivered", () => {
    /* Pending */
    const wrapper = render(<OrderStatus status="delivered" />);

    const statusText = wrapper.getByText("Entregue");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
});
