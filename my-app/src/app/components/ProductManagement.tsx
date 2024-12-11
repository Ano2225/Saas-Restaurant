'use client'

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash, ChevronLeft, ChevronRight, FolderPlus, X, Save } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { CategoryForm } from './Category';
import { DeleteModal } from './deleteProductModal';

interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  children: Category[];
  _count: {
    products: number;
  };
}

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  image: string;
  categoryId: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
}

interface PaginationData {
  total: number;
  pages: number;
  current: number;
  limit: number;
}


// Composant principal
const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 0,
    current: 1,
    limit: 10
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [searchQuery, selectedCategory]);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });

      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('categoryId', selectedCategory);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };


  const handleSaveCategory = async (data: any) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setShowCategoryForm(false);
        fetchCategories();
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la catégorie:', error);
    }
  };
  
  const handleSaveProduct = async (data: any) => {
    try {
      const response = await fetch(
        selectedProduct ? `/api/products/${selectedProduct.id}` : '/api/products',
        {
          method: selectedProduct ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      );
  
      if (response.ok) {
        const savedProduct = await response.json();
        
        // Mettre à jour l'état local
        if (selectedProduct) {
          // Mise à jour : remplacer le produit existant
          setProducts(prevProducts =>
            prevProducts.map(product =>
              product.id === savedProduct.id ? savedProduct : product
            )
          );
        } else {
          // Ajout : ajouter le nouveau produit au début de la liste
          setProducts(prevProducts => [savedProduct, ...prevProducts]);
          
          // Mettre à jour le total dans la pagination
          setPagination(prev => ({
            ...prev,
            total: prev.total + 1
          }));
        }
  
        setShowProductForm(false);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du produit:', error);
    }
  };
  
  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
  
    try {
      const response = await fetch(`/api/products/${productToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(prevProducts => 
          prevProducts.filter(product => product.id !== productToDelete)
        );
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1
        }));
        setShowDeleteModal(false);
        setProductToDelete(null);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

 

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, current: page }));
    fetchProducts(page);
  };

  return (
    <div className="p-4 space-y-6">
      {/* En-tête de la page */}
    <div className="page_title bg-white p-4 sm:p-6 border-l-4 border-[#fbaf03]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-[#4D4D4D] text-xl sm:text-2xl font-semibold">
                Produits  ({pagination.total})
            </h1>
        {/* Filtres et actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        {/* Recherche */}
        <div className="relative w-full sm:w-64">
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

        {/* Boutons */}
        <div className="flex gap-2">
            <select
            className="px-4 py-2 bg-[#F4F5F8] rounded-full focus:ring-2 focus:ring-[#fbaf03] transition-all"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
            ))}
            </select>
            
            <button
            onClick={() => setShowCategoryForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#F4F5F8] hover:bg-gray-200 rounded-full transition-all"
            >
            <FolderPlus className="w-5 h-5 text-[#898c97]" />
            <span className="hidden sm:inline">Nouvelle Catégorie</span>
            </button>
            
            <button
            onClick={() => {
                setSelectedProduct(undefined);
                setShowProductForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#fbaf03] text-white rounded-full hover:bg-[#e69d02] transition-all"
            >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Nouveau Produit</span>
            </button>
        </div>
        </div>
    </div>
    </div>
      {/* Liste des produits */}
    <div className="right_sidebar p-2 sm:p-6">
    <div className="bg-white rounded-lg overflow-hidden shadow">
        {/* Version desktop */}
        <div className="hidden md:block">
        {/* En-tête du tableau */}
        <div className="grid grid-cols-7 bg-[#F4F5F8] p-4 border-b border-[#fbaf03]">
            <div className="text-center text-[#898c97] text-sm font-medium uppercase">Image</div>
            <div className="text-left text-[#898c97] text-sm font-medium uppercase">Nom</div>
            <div className="text-left text-[#898c97] text-sm font-medium uppercase">SKU</div>
            <div className="text-left text-[#898c97] text-sm font-medium uppercase">Catégorie</div>
            <div className="text-right text-[#898c97] text-sm font-medium uppercase">Prix</div>
            <div className="text-right text-[#898c97] text-sm font-medium uppercase">Stock</div>
            <div className="text-right text-[#898c97] text-sm font-medium uppercase">Actions</div>
        </div>

        {/* Corps du tableau */}
        <div className="divide-y">
            {products.map((product, index) => (
            <div 
                key={product.id} 
                className="grid grid-cols-7 p-4 hover:bg-gray-50 animate-fadeIn items-center text-sm sm:text-base"
                style={{ animationDelay: `${index * 0.1}s` }}
            >
                <div className="text-center">
                <img 
                    src={product.image || '/placeholder.png'} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded inline-block"
                />
                </div>
                <div className="text-left text-[#4D4D4D] font-semibold">{product.name}</div>
                <div className="text-left text-[#4D4D4D]">{product.sku}</div>
                <div className="text-left text-[#4D4D4D]">{product.category.name}</div>
                <div className="text-right text-[#4D4D4D]">{product.price.toFixed(2)} XOF</div>
                <div className="text-right">
                <span className={`${
                    product.stock <= product.minStock ? 'text-red-500' : 'text-green-500'
                } font-medium`}>
                    {product.stock}
                </span>
                </div>
                <div className="flex justify-end space-x-2">
                <button 
                    onClick={() => {
                    setSelectedProduct(product);
                    setShowProductForm(true);
                    }}
                    className="p-2 hover:bg-blue-50 rounded-full"
                >
                    <Edit className="w-5 h-5 text-[#29B6FF]" />
                </button>
                <button 
                     onClick={() => handleDeleteClick(product.id)

                     }
                    className="p-2 hover:bg-red-50 rounded-full"
                >
                    <Trash className="w-5 h-5 text-red-500" />
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* Version mobile */}
        <div className="md:hidden">
        {products.map((product, index) => (
            <div key={product.id} className="p-4 border-b">
            <div className="flex justify-between items-start mb-2">
                <div>
                <div className="text-[#4D4D4D] font-semibold">{product.name}</div>
                <div className="text-sm text-[#898c97]">{product.sku}</div>
                </div>
                <img 
                src={product.image || '/placeholder.png'} 
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
                />
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
                <div className="text-[#4D4D4D]">{product.category.name}</div>
                <div className="text-[#4D4D4D] font-semibold">{product.price.toFixed(2)} XOF</div>
            </div>
            <div className="flex justify-between items-center">
                <span className={`text-sm ${
                product.stock <= product.minStock ? 'text-red-500' : 'text-green-500'
                } font-medium`}>
                Stock: {product.stock}
                </span>
                <div className="flex space-x-2">
                <button 
                    onClick={() => {
                    setSelectedProduct(product);
                    setShowProductForm(true);
                    }}
                    className="p-1.5 hover:bg-blue-50 rounded-full"
                >
                    <Edit className="w-4 h-4 text-[#29B6FF]" />
                </button>
                <button 
                    onClick={() => handleDeleteClick(product.id)}
                    className="p-2 hover:bg-red-50 rounded-full"
                    title="Supprimer"
                    >
                    <Trash className="w-5 h-5 text-red-500" />
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
            Affichage {(pagination.current - 1) * pagination.limit + 1}-
            {Math.min(pagination.current * pagination.limit, pagination.total)} sur {pagination.total} produits
            </span>
            <div className="flex items-center space-x-1 order-1 sm:order-2">
            <button 
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                onClick={() => handlePageChange(pagination.current - 1)}
                disabled={pagination.current === 1}
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => (
                <button 
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                    pagination.current === i + 1
                    ? 'bg-[#fbaf03] text-white'
                    : 'hover:bg-gray-100'
                }`}
                >
                {i + 1}
                </button>
            ))}
            <button 
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                onClick={() => handlePageChange(pagination.current + 1)}
                disabled={pagination.current === pagination.pages}
            >
                <ChevronRight className="w-5 h-5" />
            </button>
            </div>
        </div>
        </div>
    </div>
    </div>
      {showProductForm && (
        <ProductForm 
          onClose={() => setShowProductForm(false)}
          onSave={handleSaveProduct}
          product={selectedProduct}
        />
      )}
      {showCategoryForm && (
        <CategoryForm
          onClose={() => setShowCategoryForm(false)}
          onSave={handleSaveCategory}
        />
      )}
      {showDeleteModal && (<DeleteModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />)}
    </div>
  );
};

export default ProductManagement;