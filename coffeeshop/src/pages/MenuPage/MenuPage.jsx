import React, { useState, useEffect } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import "./Menu.css";
import { Box, Typography } from "@mui/material";
import DrinkCard from "../../components/drinkCard/drinkCard";
import DrinkTypeCard from "../../components/drinkType/DrinkType";
import EmojiFoodBeverageOutlinedIcon from "@mui/icons-material/EmojiFoodBeverageOutlined";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import EggOutlinedIcon from "@mui/icons-material/EggOutlined";
import { getDrinkInformation } from "../../services/drinkService";
import SearchBar from "../../components/searchBar/searchbar";
import { SearchResultsList } from "../../components/searchBar/searchResultList";
const MenuPage = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [results, setResults] = useState([]);
  // const handleSearch = (drinks) => {
  //     setSearchTerm(drinks);
  // };
  useEffect(() => {
    getDrinkInformation().then((res) => {
      setDrinksData(res);
    });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <Box
        className="content"
        sx={{
          width: "100%",
          flexDirection: "row",
          backgroundColor: "#F9F8FB",
        }}
      >
        <div className="menu-section">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              className="headerText"
              fontSize={24}
              fontWeight={"bold"}
              color="#412D26"
            >
              Choose category
            </Typography>
            <SearchBar
              placeholder="Search category or menu"
              width="130%"
              height="24%"
              setResults={setResults}
            />
            {results && results.length > 0 && (
              <SearchResultsList results={results} />
            )}
          </Box>
          <Box
            className="drinkType"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "3%",
            }}
          >
            <DrinkTypeCard
              title="Coffee"
              icon={EmojiFoodBeverageOutlinedIcon}
            />
            <DrinkTypeCard title="Tea" icon={FreeBreakfastOutlinedIcon} />
            <DrinkTypeCard title="Juices" icon={LocalBarOutlinedIcon} />
            <DrinkTypeCard title="Topping" icon={EggOutlinedIcon} />
          </Box>
          <div className="coffeeMenu">
            <Typography
              className="coffeeMenuTitle"
              fontSize={22}
              fontWeight={"bold"}
              color="#412D26"
            >
              Coffee Menu
            </Typography>
          </div>
          <Box className="cardDrink" sx={{ display: "flex" }}>
            <DrinkCard items={drinksData} searchItems={results} />
          </Box>
        </div>
        <div className="bill-detail">
          <Typography>Jelllooo</Typography>
        </div>
      </Box>
    </Box>
  );
};

export default MenuPage;
{
  /* <div className="menu">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography className="headerText">Choose category</Typography>
            <SearchBar
              placeholder="Search category or menu"
              width="130%"
              height="24%"
              setResults={setResults}
            />
            {results && results.length > 0 && (
              <SearchResultsList results={results} />
            )}
          </Box>
          <div className="drinkType">
            <DrinkTypeCard
              title={"Coffee"}
              picture={EmojiFoodBeverageOutlinedIcon}
            />
            <DrinkTypeCard title={"Tea"} icon={FreeBreakfastOutlinedIcon} />
            <DrinkTypeCard title={"Juices"} icon={LocalBarOutlinedIcon} />
            <DrinkTypeCard title={"Topping"} icon={EggOutlinedIcon} />
          </div>
          <div className="coffeeMenu">
            <Typography className="coffeeMenuTitle">Coffee Menu</Typography>
          </div>
          <div className="cardDrink">
            <DrinkCard items={drinksData} searchItems={results} />
          </div>
        </div> */
}
