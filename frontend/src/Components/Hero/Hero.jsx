import React from 'react'
import styles from './Hero.module.css';
import defaultImg from '../../assets/main_img.jpg';
import { Link } from 'react-router-dom';



const Hero = () => {
  return (
    <div className={styles.section}>
        <div className={styles.img}>
            <img src={defaultImg} alt="" />
        </div>
        <div className={styles.heading}>
          <div className={styles.h1}>Style</div>
          <div className={styles.h1}>How To Style Winter</div>
          <div className={styles.h1}>Whites</div>
        </div>
        <div className={styles.Button}>
            <Link to="/productspage"  className={styles.button}>SHOP NOW</Link >
        </div>
    </div>
  )
}

export default Hero