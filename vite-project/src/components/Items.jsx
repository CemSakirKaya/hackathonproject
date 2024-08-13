import { useState } from "react";
import styles from "../Items.module.css"; // Import custom CSS module
import natix from "../assets/natix.jpg";
import tap from "../assets/tapprotocol.jpg";
import zkLink from "../assets/zkLink.jpg";
import Token from "../model/Token";
import Item from "../components/Item";
import { useNavigate } from "react-router-dom";

export default function Items() {
  const navigate = useNavigate();
  const [hoveredCardIndex, sethoveredCardIndex] = useState(null);

  const handleMouseEnter = (index) => {
    sethoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    sethoveredCardIndex(null);
  };

  const handleCardClick = (card) => {
    navigate("/info", {
      state: {
        card: {
          name: card.getName(),
          description: card.getDescription(),
          img: card.getImg(),
          details: card.getDetails(),
        },
      },
    });
  };

  const tapObject = new Token(
    1,
    "TAP",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt.",
    tap,
    ["100.000$ raised", "Sold out", "07.04.2024"],
  );
  const natixObject = new Token(
    2,
    "NATIX",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt scelerisque diam, nec ultricies ligula cursus in. Curabitur non turpis leo. Fusce ac nisi at elit convallis tristique. Phasellus pretium turpis eget ipsum ultricies, sed volutpat purus luctus. Aenean aliquet lacus sit amet lectus laoreet, non vehicula felis tincidunt. Vivamus vehicula sapien a malesuada porttitor. Sed id felis nec justo posuere consectetur. Suspendisse potenti. Mauris euismod, erat eget vehicula fermentum, augue quam sollicitudin ex, a consequat ex odio ac dolor. Donec in massa lectus. Etiam convallis.",
    natix,
    ["350.000$ raised", "Closed", "02.06.2024"],
  );
  const zkLinkObject = new Token(
    3,
    "zkLink",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt scelerisque diam, nec ultricies ligula cursus in. Curabitur non turpis leo. Fusce ac nisi at elit convallis tristique. Phasellus pretium turpis eget ipsum ultricies, sed volutpat purus luctus. Aenean aliquet lacus sit amet lectus laoreet, non vehicula felis tincidunt. Vivamus vehicula sapien a malesuada porttitor. Sed id felis nec justo posuere consectetur. Suspendisse potenti. Mauris euismod, erat eget vehicula fermentum, augue quam.",
    zkLink,
    ["150.000$ raised", "5 day remained", "27.07.2024"],
  );

  const cards = [zkLinkObject, tapObject, natixObject];

  return (
    <div className={styles.itemsContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td colSpan="4">
              <div className={`${styles.name}`}>
                <div className={styles.cardBody}>
                  <div className="d-flex justify-content-center">
                    <div
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="text-center"
                    >
                      LAST PROJECTS
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td>
                <Item
                  card={card}
                  hoveredCardIndex={hoveredCardIndex}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  handleCardClick={handleCardClick}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
