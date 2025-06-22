import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

export interface UserContextType {
  role: string;
  authenticated: boolean;
  setRole: Dispatch<SetStateAction<string>>;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const userContext = createContext<UserContextType>({
  role: "",
  authenticated: false,
  setRole: () => {},
  setAuthenticated: () => {},
});

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [role, setRole] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <userContext.Provider
      value={{ role, authenticated, setRole, setAuthenticated }}
    >
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
