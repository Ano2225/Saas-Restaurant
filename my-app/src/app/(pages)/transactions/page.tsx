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
      <div className="page_title bg-white p-6 border-l-4 border-[#fbaf03]">
        <div className="flex flex-wrap items-center justify-between">
          <h1 className="text-[#4D4D4D] text-2xl font-semibold">
            Transactions
          </h1>

          {/* Recherche */}
          <div className="mt-4 lg:mt-0 w-full lg:w-auto">
            <div className="relative max-w-md ml-auto">
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
      <div className="right_sidebar p-6">
        <div className="bg-white rounded-lg overflow-hidden">
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
                className="grid grid-cols-8 p-4 hover:bg-gray-50 animate-fadeIn items-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center text-[#4D4D4D]">{transaction.orderNum}</div>
                <div className="text-left text-[#4D4D4D] font-semibold">{transaction.name}</div>
                <div className="text-center text-[#4D4D4D]">{transaction.amount.toFixed(2)}</div>
                <div className="text-center text-[#fbaf03] font-semibold">{transaction.items}</div>
                <div className="text-center text-[#4D4D4D]">{transaction.type}</div>
                <div className="text-center text-[#4D4D4D] flex items-center justify-center gap-2">
                  {transaction.payment}
                  
                </div>
                <div className="text-center text-[#4D4D4D]">{transaction.updatedOn}</div>
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => handleView(transaction)}
                    className="p-2 hover:bg-green-50 rounded-full transition-colors"
                  >
                    <Eye className="w-5 h-5 text-[#009946]" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                    <Edit className="w-5 h-5 text-[#29B6FF]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-4 border-t">
            <div className="flex flex-wrap items-center justify-between">
              <span className="text-[#4D4D4D] text-sm">
                Affichage 1-10 sur 126 transactions
              </span>
              <div className="flex items-center space-x-1">
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

      {/* Modal de détails */}
      {showViewModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-end z-50">
          <div className="bg-white w-full max-w-xl h-screen">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-[#4D4D4D]">
                  {selectedTransaction.name}
                </h2>
                <p className="text-sm text-[#898c97]">
                  {selectedTransaction.orderNum} | {selectedTransaction.updatedOn}
                </p>
              </div>
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            {/* ... Contenu de la modal ... */}
          </div>
        </div>
      )}
    </div>
   </>
  );
}
