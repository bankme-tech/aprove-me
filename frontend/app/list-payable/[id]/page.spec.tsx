import "@testing-library/jest-dom";
import Page from "./page";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const payableMock = {
  id: 1,
  emissionDate: "2023-05-21",
  assignor: "12345",
  value: 100.0,
};
jest.mock("../../../hooks/useFindPayable", () => ({
  useFindPayable: () => ({
    payable: payableMock,
  }),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ id: '1' })),
}));

describe("Payable Page Details Suit Test", () => {
  it("should render page correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
    expect(screen.getByText("Detalhes do Pagável")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Voltar/i })).toBeInTheDocument();
  });
});
