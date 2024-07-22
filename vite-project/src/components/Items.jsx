import React, { useState } from 'react';
import styles from '../Items.module.css'; // Import custom CSS module
import natıx from "../assets/natıx.jpg";
import tap from "../assets/tap.png";
import zkLink from "../assets/zkLink.jpg";

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
            name: 'TAP',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt.',
            img : tap ,
            details: ['100.000$ raised', 'Sold out', '07.04.2024']
        },
        {
            id: 2,
            name: 'NATIX',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt scelerisque diam, nec ultricies ligula cursus in. Curabitur non turpis leo. Fusce ac nisi at elit convallis tristique. Phasellus pretium turpis eget ipsum ultricies, sed volutpat purus luctus. Aenean aliquet lacus sit amet lectus laoreet, non vehicula felis tincidunt. Vivamus vehicula sapien a malesuada porttitor. Sed id felis nec justo posuere consectetur. Suspendisse potenti. Mauris euismod, erat eget vehicula fermentum, augue quam sollicitudin ex, a consequat ex odio ac dolor. Donec in massa lectus. Etiam convallis.',
            img :  natıx ,
            details: ['350.000$ raised', 'Closed', '02.06.2024']
        },
        {
            id: 3,
            name: 'zkLink',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt scelerisque diam, nec ultricies ligula cursus in. Curabitur non turpis leo. Fusce ac nisi at elit convallis tristique. Phasellus pretium turpis eget ipsum ultricies, sed volutpat purus luctus. Aenean aliquet lacus sit amet lectus laoreet, non vehicula felis tincidunt. Vivamus vehicula sapien a malesuada porttitor. Sed id felis nec justo posuere consectetur. Suspendisse potenti. Mauris euismod, erat eget vehicula fermentum, augue quam.',
            img: zkLink ,
            details: ['150.000$ raised', '5 day remained', '27.07.2024']
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
                                        <div  style={{fontSize:"20px",fontWeight:"bold"}} className='text-center'>LAST PROJECTS</div>
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
                                                    <img src={card.img} alt={card.img} className={styles.image} />
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
