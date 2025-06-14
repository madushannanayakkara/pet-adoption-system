import { useContext } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { userContext } from "./ContextProvider";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[]; // Optional: restrict access by roles
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const context = useContext(userContext);

  if (!context) {
    return <Navigate to="/login" />;
  }
  const { role, authenticated } = context;

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
