'use client'

import { useState } from 'react';
import { Search, Eye, Trash2, Edit, ChevronLeft, ChevronRight, CreditCard, DollarSign } from 'lucide-react';
import Header from '@/app/components/Header';

interface Transaction {
  orderNum: string;
  name: string;
  amount: number;
  items: number;
  type: string;
  payment: string;
  updatedOn: string;
}

export default function TransactionPage() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const transactions: Transaction[] = [
    {
      orderNum: 'AB00123',
      name: 'Jimmy Taylor',
      amount: 120.00,
      items: 2,
      type: 'Dine-in',
      payment: 'Cash',
      updatedOn: '12 June 2020 12:30 pm'
    },
    {
      orderNum: 'AB00124',
      name: 'Peter Johnson',
      amount: 540.00,
      items: 5,
      type: 'Delivery',
      payment: 'Cash',
      updatedOn: '10 June 2020 12:30 pm'
    },
    {
      orderNum: 'AB00124',
      name: 'Peter Johnson',
      amount: 540.00,
      items: 5,
      type: 'Delivery',
      payment: 'Cash',
      updatedOn: '10 June 2020 12:30 pm'
    },
    {
      orderNum: 'AB00124',
      name: 'Peter Johnson',
      amount: 540.00,
      items: 5,
      type: 'Delivery',
      payment: 'Cash',
      updatedOn: '10 June 2020 12:30 pm'
    },
    {
      orderNum: 'AB00124',
      name: 'Peter Johnson',
      amount: 540.00,
      items: 5,
      type: 'Delivery',
      payment: 'Cash',
      updatedOn: '10 June 2020 12:30 pm'
    },
  ];

  const handleView = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowViewModal(true);
  };

  return (
    <>
    <Header/>
     <div className="body_wrapper mt-20">
       {/* En-tête de la page */}
       <div className="page_title bg-white p-4 sm:p-6 border-l-4 border-[#fbaf03]">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
           <h1 className="text-[#4D4D4D] text-xl sm:text-2xl font-semibold">
             Transactions
           </h1>
 
           {/* Recherche */}
           <div className="w-full sm:w-auto">
             <div className="relative w-full sm:max-w-md">
               <div className="absolute inset-y-0 left-4 flex items-center">
                 <Search className="text-gray-400 w-5 h-5" />
               </div>
               <input
                 type="text"
                 placeholder="Rechercher..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-12 pr-4 py-2 bg-[#F4F5F8] rounded-full 
                   border-none focus:ring-2 focus:ring-[#fbaf03] transition-all"
               />
             </div>
           </div>
         </div>
       </div>
 
       {/* Tableau des transactions */}
       <div className="right_sidebar p-2 sm:p-6">
         <div className="bg-white rounded-lg overflow-hidden overflow-x-auto">
           {/* Version desktop */}
           <div className="hidden md:block">
             {/* En-tête du tableau */}
             <div className="grid grid-cols-8 bg-[#F4F5F8] p-4 border-b border-[#fbaf03]">
               <div className="text-center text-[#898c97] text-sm font-medium uppercase">N° Commande</div>
               <div className="text-left text-[#898c97] text-sm font-medium uppercase">Nom</div>
               <div className="text-center text-[#898c97] text-sm font-medium uppercase">Montant</div>
               <div className="text-center text-[#898c97] text-sm font-medium uppercase">Articles</div>
               <div className="text-center text-[#898c97] text-sm font-medium uppercase">Type</div>
               <div className="text-center text-[#898c97] text-sm font-medium uppercase">Paiement</div>
               <div className="text-center text-[#898c97] text-sm font-medium uppercase">Mise à jour</div>
               <div className="text-right text-[#898c97] text-sm font-medium uppercase">Actions</div>
             </div>
 
             {/* Corps du tableau */}
             <div className="divide-y">
               {transactions.map((transaction, index) => (
                 <div 
                   key={index} 
                   className="grid grid-cols-8 p-4 hover:bg-gray-50 animate-fadeIn items-center text-sm sm:text-base"
                   style={{ animationDelay: `${index * 0.1}s` }}
                 >
                   <div className="text-center text-[#4D4D4D]">{transaction.orderNum}</div>
                   <div className="text-left text-[#4D4D4D] font-semibold">{transaction.name}</div>
                   <div className="text-center text-[#4D4D4D]">{transaction.amount.toFixed(2)} €</div>
                   <div className="text-center text-[#fbaf03] font-semibold">{transaction.items}</div>
                   <div className="text-center text-[#4D4D4D]">{transaction.type}</div>
                   <div className="text-center text-[#4D4D4D]">{transaction.payment}</div>
                   <div className="text-center text-[#4D4D4D]">{transaction.updatedOn}</div>
                   <div className="flex justify-end space-x-2">
                     <button onClick={() => handleView(transaction)} className="p-2 hover:bg-green-50 rounded-full">
                       <Eye className="w-5 h-5 text-[#009946]" />
                     </button>
                     <button className="p-2 hover:bg-red-50 rounded-full">
                       <Trash2 className="w-5 h-5 text-red-500" />
                     </button>
                     <button className="p-2 hover:bg-blue-50 rounded-full">
                       <Edit className="w-5 h-5 text-[#29B6FF]" />
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
 
           {/* Version mobile */}
           <div className="md:hidden">
             {transactions.map((transaction, index) => (
               <div key={index} className="p-4 border-b">
                 <div className="flex justify-between items-start mb-2">
                   <div>
                     <div className="text-[#4D4D4D] font-semibold">{transaction.name}</div>
                     <div className="text-sm text-[#898c97]">{transaction.orderNum}</div>
                   </div>
                   <div className="text-right">
                     <div className="text-[#4D4D4D] font-semibold">{transaction.amount.toFixed(2)} €</div>
                     <div className="text-sm text-[#fbaf03]">{transaction.items} articles</div>
                   </div>
                 </div>
                 <div className="flex justify-between items-center text-sm mb-2">
                   <div className="text-[#4D4D4D]">{transaction.type}</div>
                   <div className="text-[#4D4D4D]">{transaction.payment}</div>
                 </div>
                 <div className="flex justify-between items-center">
                   <div className="text-sm text-[#898c97]">{transaction.updatedOn}</div>
                   <div className="flex space-x-2">
                     <button onClick={() => handleView(transaction)} className="p-1.5 hover:bg-green-50 rounded-full">
                       <Eye className="w-4 h-4 text-[#009946]" />
                     </button>
                     <button className="p-1.5 hover:bg-red-50 rounded-full">
                       <Trash2 className="w-4 h-4 text-red-500" />
                     </button>
                     <button className="p-1.5 hover:bg-blue-50 rounded-full">
                       <Edit className="w-4 h-4 text-[#29B6FF]" />
                     </button>
                   </div>
                 </div>
               </div>
             ))}
           </div>
 
           {/* Pagination */}
           <div className="p-4 border-t">
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
               <span className="text-[#4D4D4D] text-sm order-2 sm:order-1">
                 Affichage 1-10 sur 126 transactions
               </span>
               <div className="flex items-center space-x-1 order-1 sm:order-2">
                 <button className="p-2 rounded hover:bg-gray-100 disabled:opacity-50">
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 {[1, 2, 3].map((page) => (
                   <button 
                     key={page}
                     className="px-3 py-1 rounded hover:bg-gray-100"
                   >
                     {page}
                   </button>
                 ))}
                 <button className="p-2 rounded hover:bg-gray-100">
                   <ChevronRight className="w-5 h-5" />
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
    </>
   );
}
