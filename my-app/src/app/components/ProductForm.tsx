'use client'

import React, { useState, useEffect } from 'react';
import { X, Save, ImagePlus, DollarSign, Package, AlertCircle } from 'lucide-react';

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

interface ProductFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  product?: Product;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSave, product }) => {
  

  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    sku: product?.sku || '',
    price: product?.price || '',
    cost: product?.cost || '',
    stock: product?.stock || '',
    minStock: product?.minStock || '',
    categoryId: product?.categoryId || '',
    image: product?.image || ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSku = async () => {
    try {
      // Récupérer la catégorie sélectionnée
      const category = categories.find(c => c.id === Number(formData.categoryId));
      if (!category) return;

      const prefix = category.name.substring(0, 3).toUpperCase();

      // Récupérer les produits existants dans cette catégorie pour déterminer le prochain numéro
      const response = await fetch(`/api/products?categoryId=${category.id}`);
      const { products } = await response.json();

      // Trouver le plus grand numéro existant dans les SKU de cette catégorie
      let maxNumber = 0;
      products.forEach((product: any) => {
        const match = product.sku.match(/\d+$/);
        if (match) {
          const num = parseInt(match[0]);
          if (num > maxNumber) maxNumber = num;
        }
      });

      // Générer le nouveau SKU
      const newNumber = maxNumber + 1;
      const newSku = `${prefix}-${newNumber.toString().padStart(3, '0')}`;

      // Mettre à jour le formulaire
      setFormData(prev => ({
        ...prev,
        sku: newSku
      }));
    } catch (error) {
      console.error('Erreur lors de la génération du SKU:', error);
    }
  };

  // Ajouter un useEffect pour générer le SKU quand la catégorie change
  useEffect(() => {
    if (formData.categoryId && !formData.sku) {
      generateSku();
    }
  }, [formData.categoryId]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      // Validation des données
      if (!formData.name || !formData.sku || !formData.categoryId) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }
  
      if (Number(formData.price) < Number(formData.cost)) {
        throw new Error('Le prix doit être supérieur au coût');
      }
  
      const url = product 
        ? `/api/products/${product.id}` 
        : '/api/products';
  
      const response = await fetch(url, {
        method: product ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          cost: Number(formData.cost),
          stock: Number(formData.stock),
          minStock: Number(formData.minStock),
          categoryId: Number(formData.categoryId),
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la sauvegarde');
      }
  
      setSuccess('Produit sauvegardé avec succès !');
      // Attendre un peu pour que l'utilisateur voie le message de succès
      setTimeout(() => {
        onSave(data);
        onClose();
      }, 1500);
  
    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue est survenue');
      console.log('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* En-tête */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {error && (
          <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 text-red-700">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 text-green-700">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{success}</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations principales */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                  placeholder="Nom du produit"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">SKU</label>
                <div className="relative flex gap-2">
                  <div className="relative flex-1">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                      placeholder="AUTO-001"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={generateSku}
                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Générer
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Le SKU est généré automatiquement à partir de la catégorie sélectionnée
                </p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Prix</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Coût</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Image du produit</label>
                <div className="flex items-center gap-4">
                  {/* Prévisualisation de l'image */}
                  <div className="w-24 h-24 border rounded-xl overflow-hidden bg-gray-50">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Aperçu" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImagePlus className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Input file */}
                  <div className="flex-1">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploading(true);
                            try {
                              const previewUrl = URL.createObjectURL(file);
                              setImagePreview(previewUrl);
                              
                              const formData = new FormData();
                              formData.append('file', file);
                              
                              const response = await fetch('/api/upload', {
                                method: 'POST',
                                body: formData
                              });
                              const data = await response.json();
                              
                              setFormData(prev => ({
                                ...prev,
                                image: data.url
                              }));
                            } catch (error) {
                              console.error('Erreur upload:', error);
                            } finally {
                              setUploading(false);
                            }
                          }
                        }}
                      />
                      <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                        <ImagePlus className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {uploading ? 'Chargement...' : 'Choisir une image'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Gestion du stock */}
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 space-y-4">
              <div className="flex items-center gap-2 text-yellow-700">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-medium">Gestion du stock</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Stock actuel</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                    min="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Seuil d'alerte</label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                rows={4}
                placeholder="Description du produit..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 font-medium transition-colors duration-200"
            >
              Annuler
            </button>
                      <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2.5 ${
              loading ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white rounded-xl font-medium flex items-center gap-2 transition-colors duration-200`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Enregistrer
              </>
            )}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};