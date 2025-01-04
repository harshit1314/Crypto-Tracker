import React, { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

const TableComponent = () => {
  const { cryptoData } = useContext(CryptoContext);

  // Function to handle price change color styling
  const getPriceChangeColor = (percentage) => {
    if (percentage !== undefined) {
      return percentage >= 0 ? "green" : "red";
    }
    return "gray";
  };

  // Function to format the values with a fallback if undefined
  const formatValue = (value) => {
    return value !== undefined ? value.toLocaleString() : "N/A";
  };

  // Function to format percentage change with fallback
  const formatPercentage = (percentage) => {
    return percentage !== undefined ? `${percentage.toFixed(2)}%` : "N/A";
  };

  return (
    <div className="flex flex-col mt-9 border border-gray-200 rounded">
      {cryptoData && cryptoData.length > 0 ? (
        <table className="w-full table-auto">
          <caption className="text-lg font-semibold py-2 text-gray-800">
            Cryptocurrency Market Data
          </caption>
          <thead className="bg-gray-100 text-sm font-medium text-gray-600 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4">Asset</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Total Volume</th>
              <th className="py-2 px-4">Market Cap Change</th>
              <th className="py-2 px-4">1H</th>
              <th className="py-2 px-4">24H</th>
              <th className="py-2 px-4">7D</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((data) => (
              <tr
                key={data.id}
                className="text-center text-sm border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 flex items-center justify-center uppercase">
                  <button
                    className="outline-none border-none bg-transparent cursor-pointer"
                    onClick={() => alert(`Clicked on ${data.name}`)} // Placeholder functionality
                  >
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-6 h-6 mx-2"
                    />
                  </button>
                </td>
                <td className="py-4 px-4">{data.name}</td>
                <td className="py-4 px-4">${formatValue(data.current_price)}</td>
                <td className="py-4 px-4">{formatValue(data.total_volume)}</td>
                <td className="py-4 px-4">
                  {formatPercentage(data.market_cap_change_percentage_24h)}
                </td>
                <td
                  className="py-4 px-4"
                  style={{
                    color: getPriceChangeColor(data.price_change_percentage_1h_in_currency),
                  }}
                >
                  {formatPercentage(data.price_change_percentage_1h_in_currency)}
                </td>
                <td
                  className="py-4 px-4"
                  style={{
                    color: getPriceChangeColor(data.price_change_percentage_24h_in_currency),
                  }}
                >
                  {formatPercentage(data.price_change_percentage_24h_in_currency)}
                </td>
                <td
                  className="py-4 px-4"
                  style={{
                    color: getPriceChangeColor(data.price_change_percentage_7d_in_currency),
                  }}
                >
                  {formatPercentage(data.price_change_percentage_7d_in_currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-6 text-gray-600">Loading data...</p>
      )}
    </div>
  );
};

export default TableComponent;
