import { LayoutSecurePage } from "layout/Authenticated/LayoutSecurePage";
import React from "react";

export const TestePage: React.FC = () => {
  return (
    <LayoutSecurePage title="Página de testes">
      Realize testes aqui
    </LayoutSecurePage>
  );
};
