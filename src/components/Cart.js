import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity, totals }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (productId, change) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="cart-container">
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{totals.totalItems}</span>
        <span className="cart-total">${totals.totalPrice.toFixed(2)}</span>
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="close-cart" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img
                        src={item.image || 'https://via.placeholder.com/80'}
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80';
                        }}
                      />
                    </div>
                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      <div className="cart-item-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove from cart"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Total Items:</span>
                    <span className="summary-value">{totals.totalItems}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Price:</span>
                    <span className="summary-value">${totals.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;

