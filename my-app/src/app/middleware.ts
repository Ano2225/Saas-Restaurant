// middleware.ts
import { withAuth } from "next-auth/middleware"

// Protection simple de toutes les routes sauf login
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,

  }
})

// Configuration des routes à protéger (toutes sauf login et ressources statiques)
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/home/:path*',
    '/transactions/:path*',
    '/booking/:path*',
    '/statut-commandes/:path*',
    '/people/:path*',
    '/wallet/:path*',
    '/items/:path*',
    '/reviews/:path*',
    '/settings/:path*',
    '/support/:path*',
    '/terms/:path*',
  ]
}