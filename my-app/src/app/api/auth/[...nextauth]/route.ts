import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/app/lib/prisma"
import { User } from "@prisma/client"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Nom", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.name || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              name: credentials.name
            }
          })

          if (!user || !await bcrypt.compare(credentials.password, user.password)) {
            return null
          }
          const result = {
            id: user.id,
            name: user.name,
            email : user.email,
            enterprise_name: user.enterprise_name,
            role: user.user_Role
          }
          console.log("User ID:", result.id)
          console.log("User Name:", result.name)
          console.log("Enterprise Name:", result.enterprise_name) 
          return result

      
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.enterprise_name = user.enterprise_name
        token.role = user.role

      }
        // Log le token final
    console.log("JWT callback - Final token:", token)
    return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.enterprise_name = token.enterprise_name as string
        session.user.role = token.role as string

      }
    console.log("Session callback - Final session:", session)
    return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }