"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { BiSolidTimeFive } from 'react-icons/bi';

export default function UserTrialStatus() {
 const { data: session } = useSession();
 const [trialStatus, setTrialStatus] = useState<{
   daysLeft: number;
   isExpired: boolean;
 } | null>(null);
 const router = useRouter();

 useEffect(() => {
   const fetchTrialStatus = async () => {
     if (session?.user?.name) {
       try {
         const response = await fetch('/api/trial-status');
         const data = await response.json();
         setTrialStatus(data);

         if (data.isExpired) {
           router.push('/subscription');
         }
       } catch (error) {
         console.error("Erreur lors de la récupération du statut d'essai:", error);
       }
     }
   };

   fetchTrialStatus();
 }, [session, router]);

 if (!session) return null;

 return (
   <div className="bg-white border-b px-4 py-2">
     <div className="max-w-7xl mx-auto flex justify-between items-center">
       {/* Info Restaurant */}
       <div className="flex items-center gap-2">
         <FaUser className="text-orange-500" />
         <span className="text-gray-600 font-bold">RESTAURANT : {session.user.enterprise_name}</span>
       </div>
       {/* Statut de l'essai */}
       {trialStatus && !trialStatus.isExpired && (
         <div className="flex items-center gap-2 text-sm text-orange-600">
           <span className="text-gray-600 font-semibold">Durée d'essai : </span>
           <BiSolidTimeFive />
           {`${trialStatus.daysLeft} jour${trialStatus.daysLeft > 1 ? 's' : ''} restant${trialStatus.daysLeft > 1 ? 's' : ''}`}
         </div>
       )}
     </div>
   </div>
 );
}