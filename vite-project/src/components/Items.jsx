import React, { useState } from 'react';
import styles from '../Items.module.css'; // Import custom CSS module
import natıx from "../assets/natıx.jpg";
import tap from "../assets/tapprotocol.jpg";
import zkLink from "../assets/zkLink.jpg";
import Token from '../model/Token';
import { useNavigate } from 'react-router-dom';

export default function Items() {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const handleCardClick = (card) => {
        console.log(card)
        navigate('/info', { state: { card: {
            name: card.getName(),
            description: card.getDescription(),
            img: card.getImg(),
            details: card.getDetails()
        } } });
    };

    const tapObject = new Token(1, 'TAP', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt.', tap, ['100.000$ raised', 'Sold out', '07.04.2024']);
    const natıxObject = new Token(2, 'NATIX', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt scelerisque diam, nec ultricies ligula cursus in. Curabitur non turpis leo. Fusce ac nisi at elit convallis tristique. Phasellus pretium turpis eget ipsum ultricies, sed volutpat purus luctus. Aenean aliquet lacus sit amet lectus laoreet, non vehicula felis tincidunt. Vivamus vehicula sapien a malesuada porttitor. Sed id felis nec justo posuere consectetur. Suspendisse potenti. Mauris euismod, erat eget vehicula fermentum, augue quam sollicitudin ex, a consequat ex odio ac dolor. Donec in massa lectus. Etiam convallis.', natıx, ['350.000$ raised', 'Closed', '02.06.2024']);
    const zkLinkObject = new Token(3, 'zkLink', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt scelerisque diam, nec ultricies ligula cursus in. Curabitur non turpis leo. Fusce ac nisi at elit convallis tristique. Phasellus pretium turpis eget ipsum ultricies, sed volutpat purus luctus. Aenean aliquet lacus sit amet lectus laoreet, non vehicula felis tincidunt. Vivamus vehicula sapien a malesuada porttitor. Sed id felis nec justo posuere consectetur. Suspendisse potenti. Mauris euismod, erat eget vehicula fermentum, augue quam.', zkLink, ['150.000$ raised', '5 day remained', '27.07.2024']);

    const cards = [ zkLinkObject,tapObject, natıxObject];

    return (
        <div className={styles.itemsContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td colSpan="4">
                            <div className={`${styles.card} ${styles.shadow}`}>
                                <div className={styles.cardBody}>
                                    <div className="d-flex justify-content-center">
                                        <div style={{ fontSize: "20px", fontWeight: "bold" }} className='text-center'>LAST PROJECTS</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card, index) => (
                        <tr key={card.getId()}>
                            <td>
                                <div
                                    className={`${styles.cardContainer} ${hoveredCard !== null && hoveredCard !== index ? styles.dimmed : ''}`}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleCardClick(card)}
                                >
                                    <div className={`${styles.card} ${styles.shadow}`}>
                                        <div className={styles.cardBody}>
                                            <div className="d-flex">
                                                <div className={styles.imageContainer}>
                                                    <img src={card.getImg()} alt={card.getImg()} className={styles.image} />
                                                </div>
                                                <div className={`${styles.content} ms-3`}>
                                                    <div className={styles.cryptoName}>
                                                        <span className={styles.cryptoSymbol}>{card.getName()}</span>
                                                    </div>
                                                    <div className={`${styles.description} mt-2`}>
                                                        {card.getDescription()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.details} mt-3`}>
                                                {card.getDetails() && card.getDetails().map((detail, detailIndex) => (
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
