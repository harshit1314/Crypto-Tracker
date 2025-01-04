import debounce from "lodash.debounce";
import React, { useContext, useState, useCallback, useEffect } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "./../context/CryptoContext";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  // Handle input changes and trigger the search function
  const handleInput = (e) => {
    e.preventDefault();
    const query = e.target.value.trim();
    setSearchText(query);

    if (query) {
      handleSearch(query);
    }
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      handleSearch(searchText);
    }
  };

  // Handle selection of a specific coin
  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData(); // Clear search results after selecting a coin
  };

  return (
    <>
      <form
        className="w-96 relative flex items-center ml-7 font-nunito"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          onChange={handleInput}
          value={searchText}
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan"
          placeholder="Search here..."
          aria-label="Search for cryptocurrencies"
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} className="w-full h-auto" alt="search" />
        </button>
      </form>

      {searchText.length > 0 && (
        <ul
          className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200"
        >
          {searchData ? (
            searchData.map((coin) => (
              <li
                key={coin.id}
                className="flex items-center ml-4 my-2 cursor-pointer"
                onClick={() => selectCoin(coin.id)}
              >
                <img
                  className="w-[1rem] h-[1rem] mx-1.5"
                  src={coin.thumb}
                  alt={coin.name}
                />
                <span>{coin.name}</span>
              </li>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      )}
    </>
  );
};

const Search = () => {
  const { getSearchResult } = useContext(CryptoContext);

  // Debounce function for better performance
  const debounceSearch = useCallback(
    debounce((query) => {
      if (query) getSearchResult(query);
    }, 500),
    []
  );

  // Cleanup debounce on component unmount
  useEffect(() => {
    return () => debounceSearch.cancel();
  }, [debounceSearch]);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceSearch} />
    </div>
  );
};

export default Search;
