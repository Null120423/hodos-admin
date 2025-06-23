"use client"

import type * as React from "react"
import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "./login-form"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, login, isLoading, error } = useAuth()

  const handleLogin = async (username: string, password: string) => {
    await login(username, password)
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} error={error} isLoading={isLoading} />
  }

  return <>{children}</>
}
