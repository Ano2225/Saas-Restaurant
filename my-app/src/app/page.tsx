'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Connexion soumise:', { phoneNumber, otp });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fd] flex">
      {/* Section Gauche - Image */}
      <div className="hidden lg:flex lg:flex-col w-1/2 relative bg-[#e9f3fb] p-8">
        <div className="mb-8 mt-10">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={160}
            height={48}
            priority
            className="w-auto h-auto"
          />
        </div>
        <div className="flex-1 flex items-end justify-center">
          <Image
            src="/images/img_signin.png"
            alt="Bannière de connexion"
            width={600}
            height={500}
            priority
            className="w-full max-w-2xl h-auto object-contain"
          />
        </div>
      </div>

      {/* Section Droite - Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md relative">
          <div className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl transform -translate-x-6 translate-y-6" />
          <div className="relative bg-white rounded-3xl p-8 lg:p-12">
            <div className="lg:hidden mb-8">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={140}
                height={42}
                priority
                className="w-auto h-auto"
              />
            </div>

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#4D4D4D]">
                Bon Retour
              </h2>
              <p className="text-[#898c97] mt-3">
                Veuillez vous connecter pour accéder à votre compte
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label 
                    htmlFor="phoneNumber" 
                    className="block text-sm font-medium text-[#4D4D4D] mb-2"
                  >
                    Numéro de téléphone
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Entrez votre numéro de téléphone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100
                      focus:outline-none focus:border-[#fbaf03]
                      transition-colors duration-200
                      placeholder:text-gray-400 text-[#4D4D4D]
                      hover:border-[#fbaf03]/50"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="otp" 
                    className="block text-sm font-medium text-[#4D4D4D] mb-2"
                  >
                    Vérification OTP
                  </label>
                  <input
                    type="password"
                    id="otp"
                    placeholder="Entrez le code OTP envoyé sur votre téléphone"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100
                      focus:outline-none focus:border-[#fbaf03]
                      transition-colors duration-200
                      placeholder:text-gray-400 text-[#4D4D4D]
                      hover:border-[#fbaf03]/50"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#fbaf03] text-white py-4 px-6 rounded-xl font-semibold
                    hover:bg-[#e59f02] transition-colors duration-200"
                >
                  Se Connecter
                </button>

                <div className="flex items-center justify-between mt-6 text-sm">
                  <a href="#" className="text-[#898c97] hover:text-[#fbaf03] transition-colors duration-200">
                    Mot de passe oublié ?
                  </a>
                  <a href="#" className="text-[#898c97] hover:text-[#fbaf03] transition-colors duration-200">
                    Besoin d'aide ?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}