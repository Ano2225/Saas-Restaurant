import { useState, useEffect } from 'react';
import { FormData, Product } from '@/app/types/index';

export const useProductForm = (initialProduct?: Product) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialProduct?.name || '',
    description: initialProduct?.description || '',
    sku: initialProduct?.sku || '',
    price: initialProduct?.price || '',
    cost: initialProduct?.cost || '',
    stock: initialProduct?.stock || '',
    minStock: initialProduct?.minStock || '',
    categoryId: initialProduct?.categoryId || '',
    image: initialProduct?.image || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.sku || !formData.categoryId) {
      throw new Error('Veuillez remplir tous les champs obligatoires');
    }

    if (Number(formData.price) < Number(formData.cost)) {
      throw new Error('Le prix doit être supérieur au coût');
    }
  };

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    handleChange,
    validateForm
  };
};