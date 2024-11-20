'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
 
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
      <LoginForm/>
    </div>
  );
}