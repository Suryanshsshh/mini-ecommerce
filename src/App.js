import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Filters from './components/Filters';
import { fetchProducts } from './utils/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply sort
    if (sortOrder === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // Cart operations
  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // If item exists and quantity is less than stock, increment
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prevCart; // Can't add more than stock
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCart(prevCart => {
      const product = products.find(p => p.id === productId);
      if (!product) return prevCart;

      // Ensure quantity doesn't exceed stock
      const maxQuantity = product.stock || 0;
      const quantity = Math.min(Math.max(1, newQuantity), maxQuantity);

      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  }, [products]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOrder('');
  }, []);

  // Calculate cart totals
  const cartTotals = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
  }, [cart]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mini E-Commerce</h1>
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          totals={cartTotals}
        />
      </header>
      <main className="app-main">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          categories={categories}
          clearFilters={clearFilters}
        />
        <ProductList
          products={filteredProducts}
          loading={loading}
          cart={cart}
          addToCart={addToCart}
        />
      </main>
    </div>
  );
}

export default App;

