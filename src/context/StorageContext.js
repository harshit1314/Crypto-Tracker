/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

// create context object
export const StorageContext = createContext({});

// create the provider component
export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState(null);

  const { currency, sortBy } = useContext(CryptoContext);

  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins")) || [];
    if (!oldCoins.includes(coinId)) {
      const newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins")) || [];
    const newCoin = oldCoins.filter((coin) => coin !== coinId);
    setAllCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  };

  const getSavedData = async (totalCoins = allCoins) => {
    try {
      if (totalCoins.length === 0) {
        setSavedData([]);
        return;
      }

      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((json) => json);

      setSavedData(data);
    } catch (error) {
      console.error("Error fetching saved data:", error);
      setSavedData([]);
    }
  };

  const resetSavedResult = () => {
    getSavedData();
  };

  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setSavedData([]);
    }
  }, [allCoins, currency, sortBy]);

  useLayoutEffect(() => {
    const storedCoins = JSON.parse(localStorage.getItem("coins")) || [];
    setAllCoins(storedCoins);

    if (storedCoins.length > 0) {
      getSavedData(storedCoins);
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        saveCoin,
        allCoins,
        removeCoin,
        savedData,
        resetSavedResult,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
