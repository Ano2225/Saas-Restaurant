'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation' 
import Link from 'next/link'

const LoginForm = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        name,
        password,
      })
      console.log(result)
      if (result?.error) {
        setError('Identifiants invalides')
        setIsLoading(false)
        return
      }
      
      router.push('/home')
      router.refresh()  
    } catch (error) {
      setError('Une erreur est survenue')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
      <div className="w-full max-w-md relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl transform -translate-x-6 translate-y-6" />
        <div className="relative bg-white rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4D4D4D]">
              Bon Retour
            </h2>
            <p className="text-[#898c97] mt-3">
              Veuillez vous connecter pour accéder à votre compte
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#4D4D4D] mb-2"
                >
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200
                    focus:outline-none focus:border-[#fbaf03]
                    transition-colors duration-200
                    placeholder:text-gray-400 text-[#4D4D4D]
                    hover:border-[#fbaf03]/50"
                  placeholder="Entrez votre nom d'utilisateur"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#4D4D4D] mb-2"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200
                    focus:outline-none focus:border-[#fbaf03]
                    transition-colors duration-200
                    placeholder:text-gray-400 text-[#4D4D4D]
                    hover:border-[#fbaf03]/50"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full bg-[#fbaf03] text-white py-4 px-6 rounded-xl font-semibold
                  hover:bg-[#e59f02] transition-colors duration-200 flex justify-center items-center ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                disabled={isLoading} 
              >
                {isLoading ? (
                  <span className="loader border-2 border-white border-t-transparent w-5 h-5 rounded-full animate-spin"></span>
                ) : (
                  'Se Connecter'
                )}
              </button>

              <div className="flex items-center justify-between mt-6 text-sm">
                <a href="#" className="text-[#898c97] hover:text-[#fbaf03] transition-colors duration-200">
                  Mot de passe oublié ?
                </a>
                <a href="#" className="text-[#898c97] hover:text-[#fbaf03] transition-colors duration-200">
                  Besoin d'aide ?
                </a>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Pas encore de compte ?{' '}
                  <Link 
                    href="/register" 
                    className="font-medium text-[#fbaf03] hover:text-[#e59f02] transition-colors"
                  >
                    Créez-en un
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm