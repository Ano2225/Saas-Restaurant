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
  };exp