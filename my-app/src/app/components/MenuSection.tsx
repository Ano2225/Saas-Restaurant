'use client'

import { useState } from 'react';
import { Search } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  quantity?: number;
}

interface MenuSectionProps {
  cartItems: MenuItem[];
  setCartItems: any;
}

const categories: Category[] = [
  { id: 'fast-food', name: 'Fast Food', icon: '🍔', image: '/images/ic_fastfood.png' },
  { id: 'seafood', name: 'Fruits de mer', icon: '🦐', image: '/images/ic_Seafood.png' },
  { id: 'chinese', name: 'Chinois', icon: '🥢', image: '/images/ic_chinese.png' },
  { id: 'dessert', name: 'Desserts', icon: '🍰', image: '/images/ic_dessert.png' },
];

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Sandwich Végétarien',
    price: 5.00,
    image: '/images/1.png',
    category: 'fast-food',
    isVeg: true
  },
  {
    id: 2,
    name: 'Riz aux Crevettes',
    price: 8.00,
    image: '/images/2.png',
    category: 'seafood',
    isVeg: false
  },
  {
    id: 3,
    name: 'Spring Noodle',
    price: 12.00,
    image: '/images/7.png',
    category: 'seafood',
    isVeg: false
  },
];

const MenuSection = ({ cartItems, setCartItems }: MenuSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('fast-food');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addToCart = (item: MenuItem) => {
    setCartItems((prev: any[]) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const filteredItems = menuItems
    .filter(item => item.category === selectedCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="mt-4 md:mt-0 w-full">
      <div className="bg-white rounded-lg shadow">
        {/* Catégories */}
        <div className="overflow-x-auto px-4">
          <div className="flex space-x-2 py-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  animate-zoom-in
                  cursor-pointer
                  flex flex-col items-center
                  min-w-[95px] h-[95px]
                  rounded-xl p-2.5
                  transition-all duration-300
                  ${selectedCategory === category.id 
                    ? 'bg-[#fbaf03]' 
                    : 'bg-white hover:bg-gray-50'}
                  ${index < 10 ? `animation-delay-${index}00` : ''}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-[50px] h-[50px] mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={`
                  text-xs font-semibold uppercase tracking-wider
                  ${selectedCategory === category.id ? 'text-white' : 'text-gray-800'}
                `}>
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="px-4 pb-4">
          <div className="relative bg-[#F4F5F8] rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Search className="text-gray-400 w-5 h-5" />
            </div>
            <input
              type="search"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 
                bg-transparent
                text-gray-800 
                placeholder-gray-400
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-[#fbaf03]
                focus:bg-white
                transition-all
                duration-300"
            />
          </div>
        </div>
      </div>

      {/* Grille des articles */}
      <div className="mt-4 px-1.5">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => addToCart(item)}
              className={`
                animate-zoom-in
                bg-white rounded-xl
                overflow-hidden
                cursor-pointer
                transition-all duration-300
                hover:shadow-lg
                ${index < 10 ? `animation-delay-${index}00` : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h2 className="text-[0.89rem] font-semibold text-gray-900 truncate">
                  {item.name}
                </h2>
                <div className="mt-2 flex items-center justify-between">
                  {item.isVeg && (
                    <img 
                      src="/images/ic_veg.png" 
                      alt="Végétarien" 
                      className="w-3.5 h-3.5"
                    />
                  )}
                  <span className="text-[0.75rem] font-medium text-gray-900">
                    {item.price.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;