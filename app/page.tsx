import { AuthProvider } from "@/hooks/use-auth"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function HomePage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    </AuthProvider>
  )
}
