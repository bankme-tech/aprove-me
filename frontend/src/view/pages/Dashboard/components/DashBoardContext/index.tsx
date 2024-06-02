import React, { createContext, useCallback, useMemo, useState } from "react";

interface DashboardContextValue {
  openNewAssignorModal: () => void;
  openNewTransactionModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isNewAssignorModalOpen, setIsNewAssignorModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const openNewAssignorModal = useCallback(() => {
    setIsNewAssignorModalOpen(true);
  }, []);

  const openNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true);
  }, []);

  const contextValue = useMemo(
    () => ({
      openNewAssignorModal,
      openNewTransactionModal,
    }),
    [openNewAssignorModal, openNewTransactionModal]
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}
