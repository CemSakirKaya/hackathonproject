import styles from "../Items.module.css"; // Import custom CSS module
import ethereum from "../assets/ethereum.jpg";

export default function Item({
  card,
  hoveredCardIndex,
  onMouseEnter,
  onMouseLeave,
  handleCardClick,
}) {
  console.log(card);
  return (
    <div
      className={`${styles.cardContainer} ${hoveredCardIndex != card.id ? "" : styles.dimmed}`}
      onMouseEnter={() => onMouseEnter(card.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => handleCardClick(card)}
    >
      <div className={`${styles.card} ${styles.shadow}`}>
        <div className={styles.cardBody}>
          <div className="d-flex">
            <div className={styles.imageContainer}>
              <img src={card.img} alt="Ethereum" className={styles.image} />
            </div>
            <div className={`${styles.content} ms-3`}>
              <div className={styles.cryptoName}>
                <span className={styles.cryptoSymbol}>{card?.name}</span>
              </div>
              <div className={`${styles.description} mt-2`}>
                {card?.description}
              </div>
            </div>
          </div>
          <div className={`${styles.details} mt-3`}>
            {card?.details?.map((detail, detailIndex) => (
              <div className={styles.detail} key={detailIndex}>
                {detail}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
