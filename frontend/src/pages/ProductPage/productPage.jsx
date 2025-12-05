import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import styles from "./productPage.module.css";
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'


export default function Product() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const mockProduct = {
        id: 1,
        name: "Relaxed Cardigan",
        price: 1600.0,
        rating: 5,
        availability: true,
        description:
          "A Relaxed Cardigan is a soft, loose-fitting sweater designed for comfort and casual style. It typically features an open front, long sleeves, and a cozy feel, making it perfect for layering over casual or dressy outfits. Ideal for cool weather or relaxed days.",
        image:
          "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop",
      };

      setProduct(mockProduct);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const mockReviews = [
        {
          id: 1,
          firstName: "Ane",
          lastName: "",
          rating: 5,
          comment: "Lorem Ipsum is text",
          likes: 0,
          date: "3 May 2021",
        },
      ];

      setReviews(mockReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const incrementQuantity = () => setQuantity((p) => p + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity((p) => p - 1);

  const renderStars = (rating) =>
    [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={18}
        fill={index < rating ? "#FFD700" : "none"}
        stroke={index < rating ? "#FFD700" : "#D3D3D3"}
      />
    ));

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      
      <Navbar />

      <div className={styles.productSection}>
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
        </div>

        <div className={styles.productInfo}>
          <div className={styles.starsContainer}>{renderStars(product.rating)}</div>

          <h1 className={styles.productName}>{product.name}</h1>

          <p className={styles.price}>LKR {product.price.toFixed(2)}</p>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.quantitySection}>
            <button onClick={decrementQuantity} className={styles.quantityBtn}>-</button>
            <div className={styles.quantityDisplay}>{quantity}</div>
            <button onClick={incrementQuantity} className={styles.quantityBtn}>+</button>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.addToCartBtn}>Add to cart</button>
            <button className={styles.buyNowBtn}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Customers Feedback</h2>

        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewBox}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewerInfo}>
                <span className={styles.reviewerName}>
                  {review.firstName} {review.lastName}
                </span>
                <div className={styles.reviewStars}>{renderStars(review.rating)}</div>
              </div>

              <span className={styles.reviewDate}>{review.date}</span>
            </div>

            <p className={styles.reviewComment}>{review.comment}</p>

            <div className={styles.reviewFooter}>
              <button className={styles.likeBtn}>👍 {review.likes}</button>
              <button className={styles.likeBtn}>Reply</button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
