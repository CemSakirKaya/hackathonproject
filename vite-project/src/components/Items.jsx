import { useEffect, useState } from "react";
import styles from "../Items.module.css"; // Import custom CSS module
import tap from "../assets/tapprotocol.jpg";
import Item from "../components/Item";
import { useNavigate } from "react-router-dom";
import { getLaunchPadData, listLaunchPadsAddress } from "../utils/binding";
import { ethers } from "ethers";

export default function Items() {
  const navigate = useNavigate();
  const [hoveredCardIndex, sethoveredCardIndex] = useState(null);
  const [cards, setCards] = useState([]);

  const handleMouseEnter = (index) => {
    sethoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    sethoveredCardIndex(null);
  };

  const handleCardClick = (address) => {
    navigate(`/info?launchPadAddress=${address}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await listLaunchPadsAddress();
        response.forEach(async (address) => {
          const signer = new ethers.BrowserProvider(window.ethereum);
          const card = await getLaunchPadData(signer, address);
          const cardInfo = {
            launchPadAddress: address,
            isStarted: card["0"],
            pools: card["1"],
            launchTokenAddress: card["2"],
            totalLaunchTokenAmount: card["3"],
            launchToken: card["4"],
            launchPadTime: card["5"],
            img: tap,
          };
          setCards([]);
          setCards((prev) => [...prev, cardInfo]);
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
          {cards?.map((card, index) => (
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
