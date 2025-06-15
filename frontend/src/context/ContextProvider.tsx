import { createContext } from "react";
import type { ReactNode } from "react";

export interface UserContextType {
  role: string;
  authenticated: boolean;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const userContext = createContext<UserContextType>({
  role: "",
  authenticated: false,
});

const ContextProvider = ({ children }: ContextProviderProps) => {
  const role = "admin";
  const authenticated = true;

  return (
    <userContext.Provider value={{ role, authenticated }}>
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
