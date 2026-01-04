import React, { memo } from 'react';
import './ProductCard.css';

const ProductCard = memo(({ product, cart, addToCart }) => {
  const isInStock = product.stock > 0;
  const cartItem = cart.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    if (isInStock) {
      addToCart(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />
        <div className={`product-stock-badge ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className={`add-to-cart-btn ${!isInStock ? 'disabled' : ''} ${isInCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={!isInStock}
            title={!isInStock ? 'Out of stock' : isInCart ? 'Already in cart' : 'Add to cart'}
          >
            {!isInStock
              ? 'Out of Stock'
              : isInCart
              ? 'In Cart'
              : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

