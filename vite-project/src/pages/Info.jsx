import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../Info.module.css"; // Ensure this path is correct

export default function Info() {
  const location = useLocation();
  console.log("Location:", location);

  const { card } = location.state || {};

  const [activeButton, setActiveButton] = useState(null);
  const [amount, setAmount] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (card) {
      // Retrieve saved data from local storage
      const savedCardId = localStorage.getItem(`savedCardId${card.id}`);
      const savedAmount = localStorage.getItem(`savedAmount${card.id}`);
      const savedButton = localStorage.getItem(`savedButton${card.id}`);

      // Check if the saved card ID matches the current card ID
      if (savedCardId == card.id) {
        if (savedAmount) {
          console.log(savedCardId == card.id, savedAmount, savedButton);
          setAmount(savedAmount);
        }
        if (savedButton) {
          setActiveButton(savedButton);
        }
      }
    }
  }, [card]);

  if (!card) {
    return <p>No card data available.</p>;
  }

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setErrorMessage(""); // Clear any existing error message
  };

  const toggleLock = () => {
    // Show error message if no button is selected
    if (!activeButton && amount !== "") {
      setErrorMessage("Please select a currency before locking the amount.");
    } else {
      setErrorMessage("");
      setIsLocked(!isLocked);

      // Save to local storage only if a button is selected
      if (activeButton) {
        localStorage.setItem(`savedCardId${card.id}`, card.id); // Save the current card ID
        localStorage.setItem(`savedAmount${card.id}`, amount);
        localStorage.setItem(`savedButton${card.id}`, activeButton);
      }
    }
  };

  // Handle the change event for the amount input
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      setAmount(value);
    }
  };

  // Get the current UNIX timestamp
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Assuming card.details[2] contains the date string in "DD.MM.YYYY" format
  const dateString = card.details[2];
  const [day, month, year] = dateString.split(".");

  // Convert to a Date object
  const cardDate = new Date(`${year}-${month}-${day}`);
  const cardTimestamp = Math.floor(cardDate.getTime() / 1000); // Convert to UNIX timestamp

  // Check if the card's date is greater than the current date
  const isDateInFuture = cardTimestamp > currentTimestamp;

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
        <a
          href={card.website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <i className="fas fa-globe"></i> Website
        </a>
        <a
          href={card.whitepaper}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <i className="fas fa-file-alt"></i> Whitepaper
        </a>
        <a
          href={card.ioResearchReport}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <i className="fas fa-search"></i> IO Research Report
        </a>
        <a
          href={card.detailedRules}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <i className="fas fa-list"></i> Detailed Rules
        </a>
        <a
          href={card.launchpoolTutorial}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
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

      {isDateInFuture ? (
        <div
          style={{
            border: "2px solid #373A40",
            borderRadius: "2em",
            textAlign: "center",
            padding: "1.5em",
          }}
        >
          <h1 style={{ color: "white", fontSize: "5em" }}>Lock</h1>
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
              type="number"
              className={`${styles.amountInput} ${isInputActive ? styles.activeInput : ""}`}
              value={amount}
              onFocus={() => setIsInputActive(true)}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLocked}
            />
            <button onClick={toggleLock} className={styles.lockButton}>
              {isLocked ? (
                <i className="fas fa-lock"></i>
              ) : (
                <i className="fas fa-lock-open"></i>
              )}
            </button>
          </div>
          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
        </div>
      ) : (
        <div className={styles.lockedAmountContainer}>
          <h2 style={{ marginBottom: "0.5em" }}>Locked Amount</h2>
          <p>
            {amount} {activeButton}
          </p>
          <h2 style={{ marginBottom: "0.5em" }}>Gained Amount</h2>
          <p>{/* Calculate and display gained amount here */}-</p>
          <button className={styles.claimButton}>Claim</button>
        </div>
      )}
    </div>
  );
}
