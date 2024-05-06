import React, { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { IconButton } from "@mui/material";
import "./searchBar.css";

const SearchBar = ({ width, height, setResults, placeholder }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:3005/menu/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const results = json.filter((item) => {
          return item && item.Name.toLowerCase().includes(value.toLowerCase());
        });
        setResults(results);
      });
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="search-bar">
      <input
        placeholder={placeholder}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <IconButton className="search-icon">
        <SearchIcon className="fa fa-search" />
      </IconButton>
    </div>
  );
};

export default SearchBar;
