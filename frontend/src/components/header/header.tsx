import { ThemeDropDown } from "./components/themeDropdown";

export const Header = () => {
  return (
    <header className="fixed z-10 top-0 left-0 w-screen h-12 justify-end backdrop-blur-sm border-b border-primary flex items-center p-4">
      <ThemeDropDown />
    </header>
  );
};
