import React, { useState } from 'react';
import styles from './SearchBar.module.css'; // Import the CSS module

const CATEGORIES = [
  { value: 'all', label: 'Category' }, // Default label as seen in image
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home', label: 'Home Goods' },
  { value: 'books', label: 'Books' },
  // Add more categories as needed
];

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].value);

  // This function simulates the search action
  const handleSearch = () => {
    // 1. **Data to Send to Backend:**
    // The `searchParams` object contains the data your MERN backend needs.
    const searchParams = {
      keyword: keyword.trim(),
      category: category === 'all' ? null : category,
    };

    console.log('Searching with params:', searchParams);

    // 2. **Execute Search Logic:**
    // In a real application, you would call an API endpoint here:
    // Example: onSearch(searchParams);
    // You can use the 'onSearch' prop to pass the search parameters up 
    // to a parent component (like your ProductList page) which will 
    // then call your MERN backend API (e.g., /api/products?keyword=X&category=Y)
    
    // For now, we'll just log the action
    if (onSearch) {
        onSearch(searchParams);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        {/* Search Input Area */}
        <div className={styles.searchInputGroup}>
          {/* Unicode magnifying glass icon */}
          <span className={styles.searchIcon}>🔍</span> 
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products by title or keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        
        {/* Search Button */}
        <button 
          className={styles.searchButton} 
          onClick={handleSearch}
        >
          Search
        </button>

        {/* Category Dropdown */}
        <div className={styles.categorySelect}>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;