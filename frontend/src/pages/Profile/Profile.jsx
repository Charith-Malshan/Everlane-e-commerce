import React from 'react';
import styles from './Profile.module.css'; // Importing styles object

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      {/* Header Bar - Assuming this will be the reusable Navbar component */}
      {/* For this specific screen, I'm including the elements shown in the image */}
      <header className={styles.headerBar}>
        <div className={styles.logo}>EVERLANE</div>
        <nav className={styles.navMenu}>
          <span className={styles.frameName}>Frame 57</span>
          {/* Note: In a real app, you would use the <Navbar /> component here */}
          <a href="#" className={styles.navLink}>Home</a>
          <a href="#" className={styles.navLink}>Products</a>
          <a href="#" className={styles.navLink}>Contacts</a>
        </nav>
        <div className={styles.icons}>
          <span className={styles.icon}>🔍</span> 
          <span className={styles.icon}>🛒</span> 
          <span className={styles.icon}>👤</span>
        </div>
      </header>
      
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <div className={`${styles.sidebarItem} ${styles.activeLink}`}>Profile</div>
          <div className={styles.sidebarItem}>Oder history</div>
        </aside>
        
        {/* Right Profile Details Area */}
        <main className={styles.profileDetails}>
          <div className={styles.profileHeader}>
            <span className={styles.profileIcon}>👤</span>
            <h2>Your profile</h2>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="name" className={styles.label}>Name :</label>
            <input type="text" id="name" className={styles.profileInput} disabled />
          </div>

          <div className={styles.formRow}>
            <label htmlFor="email" className={styles.label}>E mail :</label>
            <input type="email" id="email" className={styles.profileInput} disabled />
          </div>

          <div className={styles.formRow}>
            <label htmlFor="contact" className={styles.label}>Contact no :</label>
            <input type="text" id="contact" className={styles.profileInput} disabled />
          </div>

          <div className={styles.formRow}>
            <label htmlFor="address" className={styles.label}>Adrees :</label>
            <input type="text" id="address" className={`${styles.profileInput} ${styles.largeInput}`} disabled />
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.editButton}>Edit profile</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;