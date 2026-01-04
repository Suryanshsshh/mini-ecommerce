import React, { memo } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = memo(({ products, loading, cart, addToCart }) => {
  if (loading) {
    return (
      <div className="product-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h2>No products found</h2>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          cart={cart}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;

