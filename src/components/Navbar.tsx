import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Store size={24} />
            <span>SimpleShop</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-200 transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-indigo-200 transition-colors">
              Products
            </Link>
            <Link to="/cart" className="relative hover:text-indigo-200 transition-colors">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;