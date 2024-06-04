import React, { ReactNode, createContext, useContext } from "react";
import { AssignorService } from "services/assignor/assignor.service";
import { AuthService } from "services/auth/auth.service";
import { ReceivableService } from "services/receivable/receivable.service";
import { UserService } from "services/user/user.service";
import { OmitUnusedArgs } from "./interfaces/OmitUnsedArgs";

interface IServiceContext {
  authService: Omit<typeof AuthService, OmitUnusedArgs>;
  assignorService: Omit<typeof AssignorService, OmitUnusedArgs>;
  receivableService: Omit<typeof ReceivableService, OmitUnusedArgs>;
  userService: Omit<typeof UserService, OmitUnusedArgs>;
}

export const ServiceContext = createContext<IServiceContext | null>(null);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => (
  <ServiceContext.Provider
    value={{
      authService: AuthService,
      assignorService: AssignorService,
      receivableService: ReceivableService,
      userService: UserService
    }}
  >
    {children}
  </ServiceContext.Provider>
);

export const useService = () => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }

  return context;
};
