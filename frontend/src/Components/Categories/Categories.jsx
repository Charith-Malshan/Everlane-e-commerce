import React from 'react'
import styles from './Categories.module.css';
import SHIRTS from '../../assets/shirts.jpg';
import DENIM from '../../assets/denim.jpg';
import TEES from '../../assets/tees.jpg';
import PANTS from '../../assets/pants.jpg';
import SWEATERS from '../../assets/sweaters.jpg';
import OUTERWEAR from '../../assets/jacket.jpg';

const Categories = () => {
    return (
        <div className={styles.section}>
            <div className={styles.heading}><h1>Shop by Category</h1></div>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <img src={SHIRTS} alt="" />
                    <p className={styles.title}>SHIRTS</p>
                </div>
                <div className={styles.card}>
                    <img src={DENIM} alt="" />
                    <p className={styles.title}>DENIM</p>
                </div>
                <div className={styles.card}>
                    <img src={TEES} alt="" />
                    <p className={styles.title}>TEES</p>
                </div>
                <div className={styles.card}>
                    <img src={PANTS} alt="" />
                    <p className={styles.title}>PANTS</p>
                </div>
                <div className={styles.card}>
                    <img src={SWEATERS} alt="" />
                    <p className={styles.title}>SWEATERS</p>
                </div>
                <div className={styles.card}>
                    <img src={OUTERWEAR} alt="" />
                    <p className={styles.title}>OUTERWEAR</p>
                </div>
            </div>

        </div>
    )
}

export default Categories