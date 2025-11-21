import React, { useState, useEffect } from 'react';
import styles from './ProductList.module.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual backend API endpoint
        const response = await fetch('http://localhost:5000/api/products'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Limit to a maximum of 8 cards
        setProducts(data.slice(0, 8)); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className={styles.container}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>New Arrivals</h2>
      <div className={styles.cardGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img 
                src={product.image} 
                alt={product.title} 
                className={styles.productImage} 
              />
            </div>
            <div className={styles.details}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.price}>LKR {product.price.toFixed(2)}</p>
              <div className={styles.ratings}>
                {renderStars(product.ratings)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;