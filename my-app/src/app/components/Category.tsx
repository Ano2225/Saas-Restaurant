'use client'

import React, { useState, useEffect } from 'react';
import { X, Save, Folder, Link, FolderTree } from 'lucide-react';

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

interface CategoryFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  category?: Category;
}



export const CategoryForm: React.FC<CategoryFormProps> = ({ onClose, onSave, category }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    parentId: category?.parentId || ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      // Générer le slug uniquement quand le nom change
      const slug = value.toLowerCase()
        .replace(/[éèê]/g, 'e')
        .replace(/[àâ]/g, 'a')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
  
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: slug
      }));
    } else {
      // Pour les autres champs (slug et parentId)
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSave(formData);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* En-tête */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-800">
            {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations de la catégorie */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nom de la catégorie</label>
              <div className="relative">
                <Folder className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                  placeholder="Nom de la catégorie"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Slug</label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                  placeholder="slug-de-la-categorie"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 ml-1">
                Utilisé pour l'URL de la catégorie
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Catégorie parente</label>
              <div className="relative">
                <FolderTree className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="parentId"
                  value={formData.parentId}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-200"
                >
                  <option value="">Aucune catégorie parente</option>
                  {categories.map((cat) => (
                    <option 
                      key={cat.id} 
                      value={cat.id}
                      disabled={cat.id === category?.id}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500 ml-1">
                Optionnel - Sélectionnez une catégorie parente pour créer une sous-catégorie
              </p>
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
              className="px-6 py-2.5 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 font-medium flex items-center gap-2 transition-colors duration-200"
            >
              <Save className="w-5 h-5" />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};