'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Toaster, toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

export default function RegisterPage() {
 const router = useRouter()
 const [showPassword, setShowPassword] = useState(false)
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   password: '',
   enterprise_name: '',
   telephone: ''
 })
 const [loading, setLoading] = useState(false)

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   setLoading(true)

   try {
     const response = await fetch('/api/auth/register', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData)
     })

     const data = await response.json()

     if (!response.ok) {
       throw new Error(data.error || 'Une erreur est survenue')
     }

     toast.success('Compte créé avec succès ! Redirection vers la page de connexion')
     
     setTimeout(() => {
       router.push('/login')
     }, 2000)
   } catch (error) {
     toast.error(error instanceof Error ? error.message : 'Une erreur est survenue')
   } finally {
     setLoading(false)
   }
 }

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target
   if (name === 'telephone') {
     const numericValue = value.replace(/\D/g, '').slice(0, 8)
     setFormData(prev => ({
       ...prev,
       [name]: numericValue
     }))
     return
   }

   setFormData(prev => ({
     ...prev,
     [name]: value
   }))
 }

 return (
   <div className="min-h-screen flex bg-[#f8f9fd]">
     {/* Section Gauche - Image */}
     <div className="hidden lg:flex lg:flex-col w-1/2 relative bg-[#e9f3fb] p-6">
       <div className="mb-6">
         <Image
           src="/images/logo.png"
           alt="Logo"
           width={140}
           height={42}
           priority
           className="w-auto h-auto"
         />
       </div>
       <div className="flex-1 flex items-center justify-center relative">
         <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-[450px] h-[450px] rounded-full bg-[#d6e8f7] opacity-50" />
         </div>
         <Image
           src="/images/img_register.webp"
           alt="Illustration inscription"
           width={400}
           height={350}
           priority
           className="relative z-10 w-full max-w-xl h-auto object-contain"
         />
       </div>
     </div>

     {/* Section Droite - Formulaire */}
     <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12">
       <Toaster position="top-center" expand={false} richColors />
       
       <div className="lg:hidden mb-6 flex justify-center">
         <Image
           src="/images/logo.png"
           alt="Logo"
           width={120}
           height={36}
           priority
           className="w-auto h-auto"
         />
       </div>

       <div className="text-center mb-6">
         <h2 className="text-2xl font-bold text-[#2D3748]">
           Créez votre compte
         </h2>
         <p className="mt-2 text-gray-600">
           Commencez votre essai gratuit de 14 jours
         </p>
       </div>

       <div className="bg-white rounded-xl shadow-lg p-6">
         <form className="space-y-4" onSubmit={handleSubmit}>
           <div className="space-y-4">
             <div>
               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                 Nom complet
               </label>
               <input
                 id="name"
                 name="name"
                 type="text"
                 required
                 value={formData.name}
                 onChange={handleChange}
                 className="appearance-none rounded-lg relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fbaf03] focus:border-transparent transition duration-150 ease-in-out"
                 placeholder="Arouna Ouattara"
               />
             </div>

             <div>
               <label htmlFor="enterprise_name" className="block text-sm font-medium text-gray-700 mb-1">
                 Nom de l'entreprise
               </label>
               <input
                 id="enterprise_name"
                 name="enterprise_name"
                 type="text"
                 required
                 value={formData.enterprise_name}
                 onChange={handleChange}
                 className="appearance-none rounded-lg relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fbaf03] focus:border-transparent"
                 placeholder="Restaurant SARL"
               />
             </div>

             <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                 Email professionnel
               </label>
               <input
                 id="email"
                 name="email"
                 type="email"
                 autoComplete="email"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 className="appearance-none rounded-lg relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fbaf03] focus:border-transparent"
                 placeholder="arouna@restaurant.fr"
               />
             </div>

             <div>
               <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                 Numéro de téléphone
               </label>
               <input
                 id="telephone"
                 name="telephone"
                 type="tel"
                 maxLength={8}
                 required
                 value={formData.telephone}
                 onChange={handleChange}
                 className="appearance-none rounded-lg relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fbaf03] focus:border-transparent"
                 placeholder="01234567"
               />
             </div>

             <div>
               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                 Mot de passe
               </label>
               <div className="relative">
                 <input
                   id="password"
                   name="password"
                   type={showPassword ? "text" : "password"}
                   autoComplete="new-password"
                   required
                   value={formData.password}
                   onChange={handleChange}
                   className="appearance-none rounded-lg relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fbaf03] focus:border-transparent pr-12"
                   placeholder="Minimum 6 caractères"
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                 >
                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
               </div>
             </div>
           </div>

           <button
             type="submit"
             disabled={loading}
             className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-white text-sm font-medium bg-[#fbaf03] hover:bg-[#e59f02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fbaf03] transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] mt-6"
           >
             {loading ? (
               <div className="flex items-center">
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                 </svg>
                 Création en cours...
               </div>
             ) : (
               'Créer mon compte'
             )}
           </button>

           <p className="mt-4 text-center text-sm text-gray-600">
             Déjà inscrit ?{' '}
             <Link href="/login" className="font-medium text-[#fbaf03] hover:text-[#e59f02] transition-colors">
               Connectez-vous
             </Link>
           </p>
         </form>
       </div>

       <div className="mt-4 text-center text-sm text-gray-500">
         En créant un compte, vous acceptez nos{' '}
         <a href="#" className="text-[#fbaf03] hover:text-[#e59f02]">
           Conditions d'utilisation
         </a>
       </div>
     </div>
   </div>
 )
}