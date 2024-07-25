import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../Info.module.css'; 

export default function Info() {
    const location = useLocation();
    console.log('Location:', location);

    const { card } = location.state || {};

    if (!card) {
        return <p>No card data available.</p>;
    }

    return (
        <div className={styles.infoContainer}>
            <div className={styles.details}>
                {card.details && card.details.map((detail, index) => (
                    <div key={index} className={styles.detail}>
                        {detail}
                    </div>
                ))}
            </div>
            <div className={styles.infoContent}>
                <div className={styles.imageContainer}>
                    <img src={card.img} alt={card.name} className={styles.image} />
                </div>
                <div className={styles.nameAndDescription}>
                    <h1>{card.name}</h1>
                    <p>{card.description}</p>
                </div>
            </div>
        </div>
    );
}
