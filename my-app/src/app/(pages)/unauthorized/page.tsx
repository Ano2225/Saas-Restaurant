import Link from "next/link";

export default function Unauthorized() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Accès non autorisé</h1>
          <p className="mt-2 text-gray-600">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <Link href="/">Se retouner</Link>
        </div>
      </div>
    )
  }