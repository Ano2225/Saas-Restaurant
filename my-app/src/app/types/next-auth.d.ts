import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      enterprise_name: string
      role: string
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    name: string
    enterprise_name: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string
    enterprise_name: string
    role: string
  }
}