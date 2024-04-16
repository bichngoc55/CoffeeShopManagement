import React from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };
  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const { data } = await axios.get(``);
  //         setSuggestions(data.products);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <SearchIcon sx={{}} />
      <button onClick={() => onSearch(searchTerm)}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;

// return (
//     <div>
//       <h1>My App</h1>
//       <SearchBar onSearch={handleSearch} />
//     </div>
//   );
