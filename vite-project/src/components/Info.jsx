import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../Info.module.css"; // Ensure this path is correct

export default function Info() {
  const location = useLocation();
  console.log("Location:", location);

  const { card } = location.state || {};

  const [activeButton, setActiveButton] = useState(null);
  const [amount, setAmount] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);

  if (!card) {
    return <p>No card data available.</p>;
  }

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoContent}>
        <div className={styles.imageContainer}>
          <img src={card.img} alt={card.name} className={styles.image} />
        </div>
        <div className={styles.nameAndDescription}>
          <h1>{card.name}</h1>
          <p>{card.description}</p>
        </div>
      </div>

      <div className={styles.links}>
        <a href={card.website} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <i className="fas fa-globe"></i> Website
        </a>
        <a href={card.whitepaper} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <i className="fas fa-file-alt"></i> Whitepaper
        </a>
        <a href={card.ioResearchReport} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <i className="fas fa-search"></i> IO Research Report
        </a>
        <a href={card.detailedRules} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <i className="fas fa-list"></i> Detailed Rules
        </a>
        <a href={card.launchpoolTutorial} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <i className="fas fa-graduation-cap"></i> Launchpool Tutorial
        </a>
      </div>

      <div className={styles.details}>
        {card.details &&
          card.details.map((detail, index) => (
            <div key={index} className={styles.detail}>
              {detail}
            </div>
          ))}
      </div>
      <div style={{border:"2px solid #373A40",borderRadius:"2em",textAlign:"center",padding:"1.5em"} }>
        <h1 style={{color:"white", fontSize:"5em"}}>Lock</h1>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.btnCustom} ${activeButton === "EDU" ? styles.activeButton : ""}`}
          onClick={() => handleButtonClick("EDU")}
        >
          EDU
        </button>
        <button
          className={`${styles.btnCustom} ${activeButton === "USDC" ? styles.activeButton : ""}`}
          onClick={() => handleButtonClick("USDC")}
        >
          USDC
        </button>
        <button
          className={`${styles.btnCustom} ${activeButton === "USDT" ? styles.activeButton : ""}`}
          onClick={() => handleButtonClick("USDT")}
        >
          USDT
        </button>
      </div>
               
      <div className={styles.amountContainer}>
        <input
          type="text"
          className={`${styles.amountInput} ${isInputActive ? styles.activeInput : ''}`}
          value={isInputActive ? amount : "Amount"}
          onClick={() => setIsInputActive(true)}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={toggleLock} className={styles.lockButton}>
          {isLocked ? <i className="fas fa-lock"></i> : <i className="fas fa-lock-open"></i>}
        </button>
      </div>

      </div>
      
    </div>
  );
}
