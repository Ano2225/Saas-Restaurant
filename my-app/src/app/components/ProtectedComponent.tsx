import { useAuth } from '@/app/hooks/useAuth'
import { UserRole } from '../types/user'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
  requiredRole?: UserRole
  loadingMessage?: string
  unauthorizedMessage?: string
}

export function ProtectedComponent({ 
  children, 
  requiredRole,
  loadingMessage = "Vérification de vos accès...",
  unauthorizedMessage = "Vous n'avez pas les permissions nécessaires pour accéder à cette page."
}: Props) {
  const { isAuthorized, status } = useAuth(requiredRole)
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
        <p className="text-muted-foreground text-sm">{loadingMessage}</p>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-xl w-full mx-auto p-4 border border-red-200 bg-red-50 rounded-lg text-red-900">
          <h2 className="font-semibold mb-2 text-center">Accès Restreint</h2>
          <p className="text-sm text-red-800 text-center mb-4">
            {unauthorizedMessage}
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Se retourner
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}