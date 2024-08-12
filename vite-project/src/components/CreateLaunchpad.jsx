import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "../CreateLaunchpad.module.css"; // Import CSS for this component

export default function CreateLaunchpad() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const address = queryParams.get('address');

  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [newPool, setNewPool] = useState({
    tokenAddress: '',
    totalAmount: '',
    maxAmountPerPerson: ''
  });

  const handleAddPool = () => {
    // Ensure all fields are filled before adding a new pool
    if (newPool.tokenAddress && newPool.totalAmount && newPool.maxAmountPerPerson) {
      setPools([...pools, newPool]);
      setNewPool({
        tokenAddress: '',
        totalAmount: '',
        maxAmountPerPerson: ''
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

  const handleChange = (e) => {
    setNewPool({
      ...newPool,
      [e.target.name]: e.target.value
    });
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
              value={address || ''}
              readOnly
              className={styles.inputField}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="periodTime">Period Time</label>
            <input
              type="text"
              id="periodTime"
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
              type="number"
              id="newTotalAmount"
              name="totalAmount"
              value={newPool.totalAmount}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="newMaxAmountPerPerson">Max Amount Per Person</label>
            <input
              type="number"
              id="newMaxAmountPerPerson"
              name="maxAmountPerPerson"
              value={newPool.maxAmountPerPerson}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
        </div>

        {pools.length > 0 && (
          <div className={styles.poolsContainer}>
            {pools.map((pool, index) => (
              <div
                key={index}
                className={`${styles.poolCard} ${selectedPool === index ? styles.selected : ''}`}
                onClick={() => handlePoolClick(index)}
              >
                <div className={styles.fieldContainer}>
                  <label htmlFor={`tokenAddress-${index}`}>Token Contract Address</label>
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
                    type="number"
                    id={`totalAmount-${index}`}
                    value={pool.totalAmount}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.fieldContainer}>
                  <label htmlFor={`maxAmountPerPerson-${index}`}>Max Amount Per Person</label>
                  <input
                    type="number"
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
    </div>
  );
}
