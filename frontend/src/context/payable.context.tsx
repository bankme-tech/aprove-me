import React, { ReactNode, createContext, useContext, useState } from "react";

interface PayableContextType {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const PayableContext = createContext<PayableContextType | undefined>(undefined);

interface PayableProviderProps {
  children: ReactNode;
}

export const PayableProvider: React.FC<PayableProviderProps> = ({
  children,
}) => {
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <PayableContext.Provider value={{ update, setUpdate }}>
      {children}
    </PayableContext.Provider>
  );
};

export const usePayable = (): PayableContextType => {
  const context = useContext(PayableContext);
  if (context === undefined) {
    throw new Error("usePayable must be used within a PayableProvider");
  }
  return context;
};
