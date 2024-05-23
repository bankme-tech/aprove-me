import "@testing-library/jest-dom";
import Page from "./page";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const payablesMock = [
    {
      id: 1,
      emissionDate: "2023-05-21",
      assignor: "12345",
      value: 100.00,
    },
    {
      id: 2,
      emissionDate: "2023-06-15",
      assignor: "67890",
      value: 200.00,
    },
  ];
jest.mock("../../hooks/useListPayable", () => ({
  useListPayable: () => ({
    payables: payablesMock,
  }),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ListPayable Page Suit Test", () => {
  it("should render page correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
    expect(screen.getByText("Data de emissão")).toBeInTheDocument();
    expect(screen.getByText("Lista de Pagáveis")).toBeInTheDocument();
  });
});
