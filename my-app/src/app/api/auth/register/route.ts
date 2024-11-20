import bcrypt from "bcryptjs"
import prisma from "@/app/lib/prisma"
import { z } from "zod"

//Validation des donnees avec Zod 
const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  enterprise_name: z.string().min(2, "Nom minimum doit contenir au moins 3 caractères"),
  telephone: z.string()
 .length(8, "Le numéro doit contenir exactement 8 chiffres") 
 .regex(/^\d+$/, "Le numéro ne doit contenir que des chiffres")
})

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Méthode non autorisée' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      )
    }

    let body
    try {
      const text = await req.text()
      body = JSON.parse(text)
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Corps de la requête invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: validation.error.errors[0].message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const data = validation.data

    try {
      const [existingUser, existingName] = await Promise.all([
        prisma.user.findUnique({ where: { email: data.email } }),
        prisma.user.findUnique({ where: { name: data.name } })
      ])

      if (existingUser && existingName) {
        return new Response(
          JSON.stringify({ error: "Le nom et l'email sont déjà utilisés" }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }

      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "Cet email est déjà utilisé" }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }

      if (existingName) {
        return new Response(
          JSON.stringify({ error: "Ce nom est déjà utilisé" }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Erreur lors de la vérification des données" }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    try {
      const hashedPassword = await bcrypt.hash(data.password, 12)
      const user = await prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          user_Role: "RESTAURANT_OWNER",
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          isTrialExpired: false
        },
        select: {
          id: true,
          name: true,
          email: true,
          user_Role: true
        }
      })

      return new Response(
        JSON.stringify({
          success: true,
          message: "Compte créé avec succès",
          user
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      )
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Erreur lors de la création du compte" }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('Erreur inattendue:', error)
    return new Response(
      JSON.stringify({ error: "Une erreur inattendue s'est produite" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}