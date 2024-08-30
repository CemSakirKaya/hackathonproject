import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../Create.module.css";
import { ethers } from "ethers";
import { createToken } from "../utils/binding";

export default function Create() {
  const [image, setImage] = useState(null);
  const [tokenName, setTokenName] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCreateToken = async () => {
    // Convert tokenSupply to a number
    const supply = parseFloat(tokenSupply);

    // Log current state for debugging
    console.log("Current State:", {
      image,
      tokenName,
      tokenSupply,
      supply,
    });

    if (!image || !tokenName || supply <= 0) {
      alert(
        "All fields must be filled and token supply must be greater than zero.",
      );
      return;
    }

    // Proceed with token creation
    console.log("Creating token:", {
      image,
      tokenName,
      tokenSupply: supply,
    });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const response = await createToken(signer, tokenName, tokenSupply);

    navigate(
      `/createlaunchpad?address=${encodeURIComponent(response.logs[0].address)}`,
    );
  };

  return (
    <>
      <h1 className={styles.createh1}>Create Token</h1>
      <div className={styles.formContainer}>
        <div
          className={styles.imageSection}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label htmlFor="imageUpload" className={styles.imageLabel}>
            {image ? (
              <img src={image} alt="Token" className={styles.previewImage} />
            ) : (
              <div className={styles.placeholder}>Upload Image</div>
            )}
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.imageInput}
          />
        </div>
        <div className={styles.inputSection}>
          <input
            type="text"
            placeholder="Token Name"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="number"
            placeholder="Token Supply"
            value={tokenSupply}
            onChange={(e) => setTokenSupply(e.target.value)}
            className={styles.inputField}
            min="1"
          />
        </div>
      </div>
      <button className={styles.createButton} onClick={handleCreateToken}>
        Create Token
      </button>
    </>
  );
}
