import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="text-gray-500 hover:text-indigo-600 p-1"
        >
          <Minus size={16} />
        </button>
        
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="text-gray-500 hover:text-indigo-600 p-1"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="text-base font-medium text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="mt-1 text-sm text-red-500 hover:text-red-700 flex items-center justify-end"
        >
          <Trash2 size={16} className="mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;