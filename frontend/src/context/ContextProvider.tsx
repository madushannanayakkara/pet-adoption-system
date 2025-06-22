import { createContext, useState, useEffect } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { getCurrentUser } from "../services/authService";

export interface UserContextType {
  role: string;
  authenticated: boolean;
  loading: boolean;
  setRole: Dispatch<SetStateAction<string>>;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const userContext = createContext<UserContextType>({
  role: "",
  authenticated: false,
  loading: true,
  setRole: () => {},
  setAuthenticated: () => {},
});

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [role, setRole] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();

        if (response.status === 200) {
          setRole(response.data.role);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          setRole("");
        }
      } catch (err) {
        setAuthenticated(false);
        setRole("");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <userContext.Provider
      value={{ role, authenticated, loading, setRole, setAuthenticated }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </userContext.Provider>
  );
};

export default ContextProvider;
