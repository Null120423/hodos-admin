import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/contexts/auth-context";
import { ADMIN_ROUTES } from "@/routes/routes";

function AuthLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={ADMIN_ROUTES.DASHBOARD} />;
  }

  return children;
}

export default AuthLayout;
