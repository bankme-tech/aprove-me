export interface ThemeTypes {
  children: React.ReactNode;
}

export type StateTypes = "dark" | "light" | "system";

export interface StateProps {
  theme: StateTypes;
  handleTheme: (theme: StateTypes) => void;
}
