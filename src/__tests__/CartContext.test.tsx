import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import { Product } from '../types';

// Test component that uses the cart context
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, totalItems, totalPrice } = useCart();
  
  const testProduct: Product = {
    id: 1,
    name: "Test Product",
    price: 10.99,
    description: "Test description",
    image: "test.jpg",
    category: "Test"
  };
  
  return (
    <div>
      <div data-testid="cart-size">{cart.length}</div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="total-price">{totalPrice}</div>
      <button onClick={() => addToCart(testProduct)}>Add to Cart</button>
      <button onClick={() => removeFromCart(1)}>Remove from Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
  });
  
  it('should start with an empty cart', () => {
    expect(screen.getByTestId('cart-size').textContent).toBe('0');
    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
  });
  
  it('should add an item to the cart', () => {
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(screen.getByTestId('cart-size').textContent).toBe('1');
    expect(screen.getByTestId('total-items').textContent).toBe('1');
    expect(screen.getByTestId('total-price').textContent).toBe('10.99');
  });
  
  it('should increase quantity when adding the same item', () => {
    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(screen.getByTestId('cart-size').textContent).toBe('1');
    expect(screen.getByTestId('total-items').textContent).toBe('2');
    expect(screen.getByTestId('total-price').textContent).toBe('21.98');
  });
  
  it('should remove an item from the cart', () => {
    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Remove from Cart'));
    
    expect(screen.getByTestId('cart-size').textContent).toBe('0');
    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
  });
});