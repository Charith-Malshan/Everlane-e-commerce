import React from 'react';
import styles from './OrderItem.module.css';

const OrderItem = ({ order }) => {
  // Status එක අනුව CSS Class එක තීරණය කිරීම.
  const getStatusClass = (status) => {
    switch (status) {
      case 'DELIVERED': return styles.delivered;
      case 'SHIPPED': return styles.shipped;
      case 'PROCESSING': return styles.processing;
      default: return styles.defaultStatus;
    }
  };

  return (
    <div className={styles.card}>
      {/* --- Order Details (Left Side) --- */}
      <div className={styles.details}>
        <p className={styles.detailItem}>
          <span className={styles.label}>Order ID:</span> <span className={styles.id}>{order.id}</span>
        </p>
        <p className={styles.detailItem}>
          <span className={styles.label}>Date:</span> {order.date}
        </p>
        <p className={styles.detailItem}>
          <span className={styles.label}>Total:</span> LKR {order.total.toFixed(2)}
        </p>
      </div>

      {/* --- Status and Action (Right Side) --- */}
      <div className={styles.actions}>
        <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
        <button className={styles.viewButton}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrderItem;