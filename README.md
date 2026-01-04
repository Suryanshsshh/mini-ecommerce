# Mini E-Commerce Product & Cart

A React-based mini e-commerce application demonstrating component design, state management, and React fundamentals.

## Features

### Product Listing
- Display 15-20 products in a responsive grid layout
- Each product shows: name, price, category, stock status, and Add to Cart button
- Products fetched from [dummyjson.com/products](https://dummyjson.com/products) API

### Filters & Search
- **Search**: Search products by name (with debouncing for performance)
- **Category Filter**: Filter products by category
- **Price Sort**: Sort products by price (Low → High, High → Low)
- **Clear Filters**: Button to reset all filters
- All filters work together seamlessly

### Shopping Cart
- Add items to cart
- Remove items from cart
- Update item quantity (with stock validation)
- Display total items and total price
- Quantity cannot exceed available stock
- Real-time cart updates

### UI & State Management
- Optimized to prevent unnecessary re-renders
- Clean state management using React hooks
- Empty states for "No products found" and "Empty cart"
- Modern, responsive UI design

### Bonus Features
- ✅ **localStorage Persistence**: Cart persists across page refreshes
- ✅ **Debounced Search**: Search input is debounced for better performance
- ✅ **Product Details**: Product information displayed in cards

## Key Implementation Details

### State Management
- Uses `useState` and `useMemo` for efficient state management
- Cart state is memoized to prevent unnecessary re-renders
- Product list uses `React.memo` to optimize rendering

### Performance Optimizations
- Memoized filtered products list
- Memoized cart totals
- React.memo for product components

### Data Flow
1. Products fetched on component mount
2. Filters applied via `useMemo` for filtered products
3. Cart operations use `useCallback` to maintain referential equality
4. localStorage syncs cart state automatically

### How to run
- npm start


