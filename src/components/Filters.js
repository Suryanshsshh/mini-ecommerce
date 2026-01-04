import React, { useState, useEffect, useRef } from 'react';
import './Filters.css';

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  categories,
  clearFilters,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  // Update parent search term when debounced value changes
  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  // Sync local search term with parent when cleared
  useEffect(() => {
    if (!searchTerm) {
      setLocalSearchTerm('');
    }
  }, [searchTerm]);

  const hasActiveFilters = searchTerm || selectedCategory || sortOrder;

  return (
    <div className="filters">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="search" className="filter-label">
            Search Products
          </label>
          <input
            id="search"
            type="text"
            className="filter-input"
            placeholder="Search by name..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category" className="filter-label">
            Category
          </label>
          <select
            id="category"
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort" className="filter-label">
            Sort by Price
          </label>
          <select
            id="sort"
            className="filter-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default Filters;

