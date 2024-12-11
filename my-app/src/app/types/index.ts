export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    parentId: number | null;
    children: Category[];
    _count: {
      products: number;
    };
  }
  
  export interface Product {
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
  
  export interface FormData {
    name: string;
    description: string;
    sku: string;
    price: string | number;
    cost: string | number;
    stock: string | number;
    minStock: string | number;
    categoryId: string | number;
    image: string;
  }