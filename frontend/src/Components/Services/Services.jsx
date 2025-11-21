import React from 'react'
import styles from './Services.module.css';
import { TbHanger } from "react-icons/tb";
import { FaBox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Services = () => {
    return (
        <div className={styles.section}>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.icon}>< FaBox size={80} /></div>
                    <p className={styles.heading1}>Complimentary Shipping</p>
                    <p className={styles.heading2}>Enjoy free shipping on u.s orders over $100</p>

                </div>
                <div className={styles.card}>
                    <div className={styles.icon}><TbHanger size={80} /></div>
                        <p className={styles.heading1}>Consciously Crafted</p>
                        <p className={styles.heading2}>Designed with you and the planet in miind</p>
                    
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}><FaLocationDot size={80} /></div>
                    <p className={styles.heading1}>Come Say Hi</p>
                    <p className={styles.heading2}>We have 11 stores across the u.s</p>

                </div>
            </div>

        </div>
    )
}

export default Services