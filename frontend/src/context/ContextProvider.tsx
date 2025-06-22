import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface UserContextType {
  role: string;
  authenticated: boolean;
  setUser: (role: string, authenticated: boolean) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const userContext = createContext<UserContextType>({
  role: "",
  authenticated: false,
  setUser: () => {},
});

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [role, setRole] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const setUser = (role: string, authenticated: boolean) => {
    setRole(role);
    setAuthenticated(authenticated);
  };

  return (
    <userContext.Provider value={{ role, authenticated, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
