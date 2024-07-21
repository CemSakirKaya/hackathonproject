import React, { useState } from 'react';
import styles from '../Items.module.css'; // Import custom CSS module
import ethereum from "../assets/ethereum.jpg";

export default function Items() {
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const cards = [
        {
            id: 1,
            name: 'ETH',
            description: 'Lorem.',
            details: ['1.000.000$', 'cba', '01.01.2027']
        },
        {
            id: 2,
            name: 'BTC',
            description: 'Lorem ipsum dLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameolor sit amet, ...',
            details: ['350.000$', 'abc', '12.11.2024']
        },
        {
            id: 3,
            name: 'LTC',
            description: 'Loremamet, Lorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameLorem ipsum dolor sit ameconssit amet, ...',
            details: ['20.000$', 'acb', '06.08.2025']
        } 
    ];

    return (
        <div className={styles.itemsContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td colSpan="4">
                            <div className={`${styles.card} ${styles.shadow}`}>
                                <div className={styles.cardBody}>
                                    <div className="d-flex justify-content-center">
                                        <div className='fw-bold text-center'>Last Projects</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card, index) => (
                        <tr key={card.id}>
                            <td>
                                <div 
                                    className={`${styles.cardContainer} ${hoveredCard !== null && hoveredCard !== index ? styles.dimmed : ''}`}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className={`${styles.card} ${styles.shadow}`}>
                                        <div className={styles.cardBody}>
                                            <div className="d-flex">
                                                <div className={styles.imageContainer}>
                                                    <img src={ethereum} alt="Ethereum" className={styles.image} />
                                                </div>
                                                <div className={`${styles.content} ms-3`}>
                                                    <div className={styles.cryptoName}>
                                                        <span className={styles.cryptoSymbol}>{card.name}</span>
                                                    </div>
                                                    <div className={`${styles.description} mt-2`}>
                                                        {card.description}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.details} mt-3`}>
                                                {card.details.map((detail, detailIndex) => (
                                                    <div className={styles.detail} key={detailIndex}>{detail}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
