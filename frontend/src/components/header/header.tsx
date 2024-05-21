import { ThemeDropDown } from "./components/themeDropdown";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-screen h-12 justify-between border-b border-primary flex items-center p-4">
      <h1 className="text-xl font-bold">Bem-vindo</h1>

      <ThemeDropDown />
    </header>
  );
};
