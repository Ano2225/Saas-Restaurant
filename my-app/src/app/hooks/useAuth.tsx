import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import type { AuthUser } from '@/app/types/next-auth'
import { UserRole } from '../types/user'


interface AuthHookReturn {
  isAuthenticated: boolean
  isAuthorized: boolean
  role: UserRole | null
  user: AuthUser | null
  status: 'authenticated' | 'loading' | 'unauthenticated'
  session: Session | null
}

export function useAuth(requiredRole?: UserRole): AuthHookReturn {
  const { data: session, status } = useSession()

  const isAuthenticated = status === 'authenticated'
  const user = session?.user as AuthUser | null

  const isAuthorized = requiredRole
    ? isAuthenticated && user?.role === requiredRole
    : isAuthenticated

  return {
    isAuthenticated,
    isAuthorized,
    role: user?.role || null,
    user: user || null,
    status,
    session
  }
}