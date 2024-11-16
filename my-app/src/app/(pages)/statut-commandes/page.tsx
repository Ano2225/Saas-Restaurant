'use client'

import Header from '@/app/components/Header';
import { useState } from 'react';

interface OrderItem {
  quantity: number;
  name: string;
  extras?: string[];
  isDone: boolean;
}

type OrderType = 'Sur place' | 'Livraison' | 'À emporter';

interface Order {
  id: string;
  type: OrderType;
  orderNumber: string;
  timer: string;
  items: OrderItem[];
  status: 'active1' | 'active2' | 'normal';
}

export default function OrderStatusPage() {
   
    
    const orders: Order[] = [
        {
          id: '1',
          type: 'Sur place',  
          orderNumber: 'AB00121',
          timer: '08:49',
          status: 'active1',
          items: [
            { quantity: 1, name: 'Chat Masala', isDone: true },
            { quantity: 1, name: 'Veg Cheese Pizza', extras: ['Extra Cheese'], isDone: true },
            { quantity: 1, name: 'Fride Checken', isDone: true },
            { quantity: 1, name: 'Mashroom Pizza', isDone: false }
          ]
        },
        {
          id: '2',
          type: 'Livraison', 
          orderNumber: 'AB00121',
          timer: '05:12',
          status: 'active2',
          items: [
            { quantity: 1, name: 'Chat Masala', isDone: true },
            { quantity: 1, name: 'Veg Cheese Pizza', extras: ['Extra Cheese'], isDone: true },
            { quantity: 1, name: 'Fride Checken', isDone: true },
            { quantity: 1, name: 'Mashroom Pizza', isDone: false }
          ]
        },
        {
          id: '3',
          type: 'À emporter',  
          orderNumber: 'AB00121',
          timer: '00:33',
          status: 'normal',
          items: [
            { 
                quantity: 1, 
                name: 'Egg Faritta', 
                extras: ['Extra Cheese', 'Extra Egg'], 
                isDone: true 
              }
          ]
        }
    ];

  const getHeaderColor = (status: Order['status']) => {
    switch (status) {
      case 'active1':
        return 'bg-[#EF1010]';
      case 'active2':
        return 'bg-[#009946]';
      default:
        return 'bg-[#fbaf03]';
    }
  };

  return (
   <>
   <Header/>
   <div className="min-h-screen py-5 mt-20">
      <div className="columns-1 md:columns-3 lg:columns-5 gap-4 px-4 mx-auto max-w-[2100px]">
        {orders.map((order, idx) => (
          <div 
            key={order.id}
            className="break-inside-avoid mb-4"
            style={{ 
              animationDelay: `${idx * 0.1}s`,
              animation: 'zoomIn 0.5s ease-out forwards' 
            }}
          >
            <div className="bg-white rounded-t-xl relative pb-4">
              {/* En-tête de la commande */}
              <div className={`${getHeaderColor(order.status)} rounded-t-xl p-4 flex items-center justify-between`}>
                <div>
                  <h2 className="text-white text-lg font-medium">
                    {order.type}
                    <span className="block text-sm opacity-80">
                      {order.orderNumber}
                    </span>
                  </h2>
                </div>
                <div className="text-white text-xl font-bold">
                  {order.timer}
                </div>
              </div>

              {/* Liste des articles */}
              <div className="space-y-2 mt-4">
                {order.items.map((item, index) => (
                  <div 
                    key={index}
                    className={`px-4 py-2 flex gap-4 ${
                      item.isDone ? 'text-[#b3b3b3]' : 'text-[#4D4D4D]'
                    }`}
                  >
                    <span className={`text-base ${item.isDone ? 'line-through' : ''}`}>
                      {item.quantity}
                    </span>
                    <div className="flex-1">
                      <p className={`text-base ${item.isDone ? 'line-through' : ''}`}>
                        {item.name}
                        {item.extras?.map((extra, idx) => (
                          <span 
                            key={idx}
                            className="block text-sm text-[#898c97]"
                          >
                            {extra}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bordure dentelée */}
              <div className="absolute -bottom-3 left-0 w-full h-3 bg-[url('/images/card_zigzag.png')] bg-repeat-x bg-[length:209px_auto]" />
            </div>
          </div>
        ))}
      </div>
    </div>
   </>
  );
}
