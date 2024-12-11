'use client'

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  category: Category;
  description: string;
  quantity?: number;
}

interface MenuSectionProps {
  cartItems: MenuItem[];
  setCartItems: any;
}

const MenuSection = ({ cartItems, setCartItems }: MenuSectionProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
        // Sélectionner la première catégorie par défaut
        if (data.length > 0) {
          setSelectedCategory(data[0].id.toString());
        }
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Charger les produits selon la catégorie et la recherche
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory) {
          params.append('categoryId', selectedCategory);
        }
        if (searchQuery) {
          params.append('search', searchQuery);
        }

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        setMenuItems(data.products);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory, searchQuery]);

  const addToCart = (item: MenuItem) => {
    setCartItems((prev: MenuItem[]) => {
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

  return (
    <div className="mt-4 md:mt-0 w-full">
      <div className="bg-white rounded-lg shadow">
        {/* Catégories */}
        <div className="overflow-x-auto px-4">
          <div className="flex space-x-2 py-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id.toString())}
                className={`
                  animate-zoom-in
                  cursor-pointer
                  flex flex-col items-center
                  min-w-[95px] h-[95px]
                  rounded-xl p-2.5
                  transition-all duration-300
                  ${selectedCategory === category.id.toString() 
                    ? 'bg-[#fbaf03]' 
                    : 'bg-white hover:bg-gray-50'}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-[50px] h-[50px] mb-3">
                  <Image 
                    src={category.image || '/placeholder.png'} 
                    alt={category.name}
                    className="w-full h-full object-contain"
                    width={90}
                    height={90}
                  />
                </div>
                <span className={`
                  text-xs font-semibold uppercase tracking-wider
                  ${selectedCategory === category.id.toString() ? 'text-white' : 'text-gray-800'}
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
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fbaf03]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {menuItems.map((item, index) => (
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
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-[160px] overflow-hidden">
                  <Image
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    fill
                  />
                </div>
                <div className="p-3">
                  <h2 className="text-[0.89rem] font-semibold text-gray-900 truncate">
                    {item.name}
                  </h2>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[0.75rem] font-medium text-gray-900">
                      {item.price.toFixed(2)} XOF
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && menuItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucun produit trouvé
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSection;