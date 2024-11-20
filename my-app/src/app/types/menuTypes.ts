//Menu Section

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    isVeg: boolean;
    quantity: number;
  }
  
  export interface MenuSectionProps {
    cartItems: MenuItem[];
    setCartItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  }
  
  export interface OrderSectionProps {
    orderState: 'no-order' | 'item-list' | 'payment';
    cartItems: MenuItem[];
    onAddOrder: () => void;
    onCancelOrder: () => void;
    onPlaceOrder: () => void;
    onEditOrder: () => void;
    onSubmitOrder: () => void;
  }