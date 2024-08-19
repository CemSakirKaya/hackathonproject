import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../CreateLaunchpad.module.css"; // Import CSS for this component
import { createLaunchPadFromExist } from "../utils/binding";

export default function CreateLaunchpad() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialAddress = queryParams.get("address") || "";

  const [address, setAddress] = useState(initialAddress);
  const [period, setPeriod] = useState(null);
  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [newPool, setNewPool] = useState({
    tokenAddress: "",
    totalAmount: "",
    maxAmountPerPerson: "",
  });

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleAddPool = () => {
    // Ensure all fields are filled before adding a new pool
    if (
      newPool.tokenAddress &&
      newPool.totalAmount &&
      newPool.maxAmountPerPerson
    ) {
      setPools([...pools, newPool]);
      setNewPool({
        tokenAddress: "",
        totalAmount: "",
        maxAmountPerPerson: "",
      });
      setSelectedPool(null); // Reset selected pool after adding
    }
  };

  const handleRemovePool = () => {
    if (selectedPool !== null) {
      setPools(pools.filter((_, i) => i !== selectedPool));
      setSelectedPool(null); // Reset selected pool after removing
    }
  };

  const handlePoolClick = (index) => {
    setSelectedPool(index);
  };

  const handleCreateLaunchPad = async () => {
    if (period == null || address == null || address == "") {
      console.log("can not be null");
    }
    if (pools.length < 1) {
      console.log("there must be at least one pool");
    }

    //---------
    //get signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    //-------

    const result = await createLaunchPadFromExist(signer, "", [], 500);
    console.log(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow only positive integers for specific fields
    if (["totalAmount", "maxAmountPerPerson"].includes(name)) {
      if (/^\d*$/.test(value)) {
        // Only accept digits
        setNewPool({
          ...newPool,
          [name]: value,
        });
      }
    } else {
      setNewPool({
        ...newPool,
        [name]: value,
      });
    }
  };

  // Handle changes for the address input
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className={styles.createLaunchpadContainer}>
      <div className={styles.formContainer}>
        <div className={styles.row}>
          <div className={styles.fieldContainer}>
            <label htmlFor="address">Token Contract Address</label>
            <input
              type="text"
              id="address"
              value={address}
              readOnly={Boolean(initialAddress)} // Make readOnly only if initialAddress is not empty
              placeholder="Enter token contract address"
              className={styles.inputField}
              onChange={handleAddressChange} // Allow changes if editable
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="periodTime">Period Time</label>
            <input
              type="text"
              id="periodTime"
              name="periodTime"
              value={period}
              onChange={handlePeriodChange}
              placeholder="Enter period time"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.buttonRow}>
          <button
            className={`${styles.button} ${styles.addButton}`}
            onClick={handleAddPool}
          >
            Add Pool
          </button>
          <button
            className={`${styles.button} ${styles.removeButton}`}
            onClick={handleRemovePool}
            disabled={selectedPool === null}
          >
            Remove Pool
          </button>
        </div>

        <div className={styles.newPoolContainer}>
          <div className={styles.fieldContainer}>
            <label htmlFor="newTokenAddress">Token Contract Address</label>
            <input
              type="text"
              id="newTokenAddress"
              name="tokenAddress"
              value={newPool.tokenAddress}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="newTotalAmount">Total Amount</label>
            <input
              type="text"
              id="newTotalAmount"
              name="totalAmount"
              value={newPool.totalAmount}
              onChange={handleChange}
              placeholder="Enter total amount"
              className={styles.inputField}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="newMaxAmountPerPerson">Max Amount Per Person</label>
            <input
              type="text"
              id="newMaxAmountPerPerson"
              name="maxAmountPerPerson"
              value={newPool.maxAmountPerPerson}
              onChange={handleChange}
              placeholder="Enter max amount per person"
              className={styles.inputField}
            />
          </div>
        </div>

        {pools.length > 0 && (
          <div className={styles.poolsContainer}>
            {pools.map((pool, index) => (
              <div
                key={index}
                className={`${styles.poolCard} ${selectedPool === index ? styles.selected : ""}`}
                onClick={() => handlePoolClick(index)}
              >
                <div className={styles.fieldContainer}>
                  <label htmlFor={`tokenAddress-${index}`}>
                    Token Contract Address
                  </label>
                  <input
                    type="text"
                    id={`tokenAddress-${index}`}
                    value={pool.tokenAddress}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.fieldContainer}>
                  <label htmlFor={`totalAmount-${index}`}>Total Amount</label>
                  <input
                    type="text"
                    id={`totalAmount-${index}`}
                    value={pool.totalAmount}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.fieldContainer}>
                  <label htmlFor={`maxAmountPerPerson-${index}`}>
                    Max Amount Per Person
                  </label>
                  <input
                    type="text"
                    id={`maxAmountPerPerson-${index}`}
                    value={pool.maxAmountPerPerson}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className={`${styles.button} ${styles.addButton}`}
        onClick={handleCreateLaunchPad}
      >
        Create LaunchPad
      </button>
    </div>
  );
}
