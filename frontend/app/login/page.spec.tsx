import "@testing-library/jest-dom";
import Page from "./page";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

const loginMock = jest.fn();

jest.mock("../../hooks/useLogin", () => ({
  useLogin: () => ({
    login: loginMock,
  }),
}));

describe("Page", () => {
  it("should render login page correctly", () => {
    render(<Page />);
    expect(screen.getByText("Entre na sua conta")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should submit form correctly", async () => {
    render(<Page />);
    const loginInput = screen.getByLabelText("Login");
    await userEvent.type(loginInput, "aprovame");

    const passwordInput = screen.getByLabelText("Senha");
    await userEvent.type(passwordInput, "aprovame");

    await userEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
    });
  });

  it("try submit form incorrectly", async () => {
    render(<Page />);
    const loginInput = screen.getByLabelText("Login");
    await userEvent.type(loginInput, "aprovame");

    const passwordInput = screen.getByLabelText("Senha");
    await userEvent.type(passwordInput, "demoteste");

    await userEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveReturnedWith(undefined);
    });
  });
});
