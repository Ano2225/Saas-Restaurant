'use client'

import { useState } from 'react';
import { Search, Plus, Trash2, Edit, ChevronLeft, ChevronRight, Calendar, Eye } from 'lucide-react';
import Header from '@/app/components/Header';

interface Booking {
  date: string;
  time: string;
  customerName: string;
  note: string;
  updatedOn: string;
}

export default function BookingPage() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const bookings: Booking[] = [
    {
      date: '12 June 2020',
      time: '11:30 am',
      customerName: 'Samantha Smith',
      note: 'My Anniversary',
      updatedOn: '12 June 2020 12:30 pm'
    },
    {
      date: '12 June 2020',
      time: '11:30 am',
      customerName: 'Samantha Smith',
      note: 'My Anniversary',
      updatedOn: '12 June 2020 12:30 pm'
    },
    {
      date: '12 June 2020',
      time: '11:30 am',
      customerName: 'Samantha Smith',
      note: 'My Anniversary',
      updatedOn: '12 June 2020 12:30 pm'
    },
    {
      date: '12 June 2020',
      time: '11:30 am',
      customerName: 'Samantha Smith',
      note: 'My Anniversary',
      updatedOn: '12 June 2020 12:30 pm'
    },
  ];

  return (
    <>
    <Header/>
    <div className="body_wrapper">
      <div className="page_title bg-white p-6 border-l-4 border-[#fbaf03]">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-[#4D4D4D] text-2xl font-semibold">
              Réservations
            </h1>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-[#fbaf03] text-white px-8 h-12 rounded-full hover:bg-[#fbaf03]/90 transition-colors"
            >
              Faire une reservation
            </button>
          </div>

          {/* Search Bar */}
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

      {/* Table des réservations */}
      <div className="right_sidebar p-6">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-6 bg-[#F4F5F8] p-4 border-b border-[#fbaf03]">
            <div className="text-[#898c97] text-sm font-medium uppercase">Date</div>
            <div className="text-[#898c97] text-sm font-medium uppercase">Heure</div>
            <div className="text-[#898c97] text-sm font-medium uppercase">Client</div>
            <div className="text-[#898c97] text-sm font-medium uppercase">Note</div>
            <div className="text-[#898c97] text-sm font-medium uppercase">Mise à jour</div>
            <div className="text-[#898c97] text-sm font-medium uppercase text-right">Actions</div>
          </div>


        {/* Table Body */}
        <div className="divide-y">
        {bookings.map((booking, index) => (
            <div 
            key={index} 
            className="grid grid-cols-6 p-4 hover:bg-gray-50 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
            >
            <div className="text-[#4D4D4D]">{booking.date}</div>
            <div className="text-[#4D4D4D] font-medium">{booking.time}</div>
            <div className="text-[#4D4D4D] font-medium">{booking.customerName}</div>
            <div className="text-[#4D4D4D]">{booking.note}</div>
            <div className="text-[#4D4D4D]">{booking.updatedOn}</div>
            <div className="flex justify-end space-x-2">
                <button 
                onClick={() => ('')}
                className="p-2 hover:bg-green-50 rounded-full transition-colors"
                >
                <Eye className="w-5 h-5 text-[#009946]" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                <Trash2 className="w-5 h-5 text-red-500" />
                </button>
                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                <Edit className="w-5 h-5 text-blue-500" />
                </button>
            </div>
            </div>
        ))}
        </div>

          {/* Pagination */}
          <div className="p-4 border-t bg-white">
            <div className="flex flex-wrap items-center justify-between">
              <span className="text-[#4D4D4D] text-sm">
                Affichage 1-10 sur 126 réservations
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

      {/* Modal de réservation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-[#4D4D4D]">Ajouter une réservation</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-[#898c97] font-medium uppercase">
                    Date et Heure
                  </label>
                  <div className="relative mt-1">
                    <input 
                      type="datetime-local" 
                      className="w-full rounded-full bg-[#F4F5F8] border-none 
                        focus:ring-2 focus:ring-[#fbaf03] px-4 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#898c97] font-medium uppercase">
                    Nombre de personnes
                  </label>
                  <select className="w-full mt-1 rounded-full bg-[#F4F5F8] border-none 
                    focus:ring-2 focus:ring-[#fbaf03] px-4 py-2">
                    <option>Sélectionner</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-[#898c97] font-medium uppercase">
                    Nom du client
                  </label>
                  <input 
                    type="text"
                    className="w-full mt-1 rounded-full bg-[#F4F5F8] border-none 
                      focus:ring-2 focus:ring-[#fbaf03] px-4 py-2"
                    placeholder="Nom complet"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#898c97] font-medium uppercase">
                    Téléphone
                  </label>
                  <input 
                    type="tel"
                    className="w-full mt-1 rounded-full bg-[#F4F5F8] border-none 
                      focus:ring-2 focus:ring-[#fbaf03] px-4 py-2"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-[#898c97] font-medium uppercase">
                  Notes
                </label>
                <input 
                  type="text"
                  className="w-full mt-1 rounded-full bg-[#F4F5F8] border-none 
                    focus:ring-2 focus:ring-[#fbaf03] px-4 py-2"
                  placeholder="ex: Pour anniversaire surprise"
                />
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex space-x-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-2 bg-gray-200 text-gray-800 rounded-full 
                  hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button className="flex-1 px-6 py-2 bg-[#fbaf03] text-white rounded-full 
                hover:bg-[#fbaf03]/90 transition-colors">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
