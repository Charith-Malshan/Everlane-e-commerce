import React, { useState } from 'react';
import OrderItem from '../../Components/OrderHistory/OrderItem'; // Path is correct based on the structure
import styles from './OrderHistoryPage.module.css';

// Dummy data representing MERN API response
const dummyOrders = [
  { id: 'ORD001', date: '2025-10-20', total: 7000.00, status: 'DELIVERED' },
  { id: 'ORD002', date: '2025-11-01', total: 12500.00, status: 'SHIPPED' },
  { id: 'ORD003', date: '2025-11-01', total: 3900.00, status: 'PROCESSING' },
  // Add more orders for a complete list
];

const OrderHistoryPage = () => {
  // In a real application, you would fetch data here using useEffect.
  const [orders, setOrders] = useState(dummyOrders); 

  return (
    <div className={styles.pageContainer}>
      
      {/* --- Left Sidebar (Grey Panel) --- */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>EVERLANE</div>
        <div className={styles.navMenu}>
          <p className={styles.profileHeader}>Profile</p>
          {/* Active link style applied to Order history */}
          <p className={styles.activeLink}>Order history</p>
        </div>
      </div>

      {/* --- Right Content Area --- */}
      <div className={styles.mainContent}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <span className={styles.headerIcon}>📜</span> 
          <h1 className={styles.headerTitle}>Your Order History</h1>
        </div>

        {/* Order List Mapping */}
        <div className={styles.orderList}>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;