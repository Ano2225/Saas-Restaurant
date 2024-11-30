'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/app/components/Header';
import OrderSection from '@/app/components/OrderSection';
import MenuSection from '@/app/components/MenuSection';
import {MenuItem} from '@/app/types/menuTypes'
import { useAuth } from '@/app/hooks/useAuth';
import { ProtectedComponent } from '@/app/components/ProtectedComponent';

export interface CartItem extends MenuItem {
    quantity: number;
  }

interface MenuSectionProps {

    cartItems: CartItem[];
  
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  
  }


interface HomeProps {}

export default function Home({}: HomeProps) {
  const [orderState, setOrderState] = useState<'no-order' | 'item-list' | 'payment'>('no-order');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const handleAddOrder = () => {
    setOrderState('item-list');
  };

  const handleCancelOrder = () => {
    setCartItems([]);
    setOrderState('no-order');
  };

  const handlePlaceOrder = () => {
    setOrderState('payment');
  };

  const handleEditOrder = () => {
    setOrderState('item-list');
  };

  const handleSubmitOrder = () => {
    setCartItems([]);
    setOrderState('no-order');
  };

  const handleSetCartItems = (items: CartItem[]) => {
    setCartItems(items);
  };



  return (
    <>
    <ProtectedComponent requiredRole='RESTAURANT_OWNER'>
      <Head>
        <title>POS Restaurant - Système de Commande</title>
        <meta name="description" content="Système de point de vente pour restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="page_home" className="font-['Google_Sans']">
        <Header />
        
        {/* Header Spacer */}
        <div className="header_spacebar"></div>
        
        {/* Body Wrapper */}
        <div className="body_wrapper pt-[5px] relative w-full overflow-x-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Order Section */}
            <OrderSection 
              orderState={orderState}
              cartItems={cartItems}
              onAddOrder={handleAddOrder}
              onCancelOrder={handleCancelOrder}
              onPlaceOrder={handlePlaceOrder}
              onEditOrder={handleEditOrder}
              onSubmitOrder={handleSubmitOrder}
            />
            
            {/* Right Side - Menu Section */}
            <div className="flex-1">
              <MenuSection 
                cartItems={cartItems}
                setCartItems={handleSetCartItems}
              />
            </div>
          </div>
        </div>

        {/* Optional: Animations Loader */}
        <script src="/js/wow.min.js" defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                new WOW().init();
              });
            `,
          }}
        />

        {/* Optional: Carousel Loader */}
        <script src="/js/owl.carousel.min.js" defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                $('.owl-carousel').owlCarousel({
                  loop: false,
                  margin: 20,
                  nav: false,
                  dot: false,
                  responsive: {
                    0: { items: 2 },
                    600: { items: 4 },
                    1200: { items: 8 }
                  }
                });
              });
            `,
          }}
        />
      </div>
      </ProtectedComponent>
    </>
  );
}