import "@testing-library/jest-dom";
import Page from "./page";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const signUpMock = jest.fn();

jest.mock("../../hooks/useCreateAssignor", () => ({
  useCreateAssignor: () => ({
    createAssignor: signUpMock,
  }),
}));

describe("Page", () => {
  it("should render register page correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefone")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cadastrar/i })).toBeInTheDocument();
  });

  it("should submit form correctly", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
    const nameInput = screen.getByLabelText("Nome");
    await userEvent.type(nameInput, "Usuário Teste");

    const documentInput = screen.getByLabelText("CPF / CNPJ");
    await userEvent.type(documentInput, "123.456.789-90");

    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "usuario.teste@teste.com");

    const phoneInput = screen.getByLabelText("Telefone");
    await userEvent.type(phoneInput, "(99) 99999-9999");

    await userEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalled();
    });
  });
});
