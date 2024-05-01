import React, { useState, useEffect, useRef } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import "./Menu.css";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import DrinkCard from "../../components/drinkCard/drinkCard";
import DrinkTypeCard from "../../components/drinkType/DrinkType";
import EmojiFoodBeverageOutlinedIcon from "@mui/icons-material/EmojiFoodBeverageOutlined";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import EggOutlinedIcon from "@mui/icons-material/EggOutlined";
import { getDrinkInformation } from "../../services/drinkService";
import SearchBar from "../../components/searchBar/searchbar";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { IconButton } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { SearchResultsList } from "../../components/searchBar/searchResultList";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import BillCard from "../../components/billCard/billCard";

const MenuPage = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [selectedMood, setMood] = useState("hot");
  const [selectedSize, setSize] = useState("M");
  const [selectedIce, setIce] = useState("100");
  const [billItems, setBillItems] = useState([]);
  const [selectedSugar, setSugar] = useState("100");
  const [selectedDrinkType, setSelectedDrinkType] = useState("");
  const [totalPirce, setTotalPrice] = useState(0);
  const { token, user } = useSelector((state) => state.auths);
  const { Name } = user.Name;
  const [availableTables, setAvailableTables] = useState([]);
  const [savedBill, setSavedBill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  //print function
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint: () => {
      saveBillToDatabase();
      setIsVisible(true);
    },
  });
  const updateTableStatus = async (tableId) => {
    try {
      await fetch(`http://localhost:3005/booking/${tableId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "occupied" }),
      });
      fetchAvailableTables();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchAvailableTables = async () => {
    try {
      const response = await fetch("http://localhost:3005/booking/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const availableData = data.filter(
        (table) => table.status === "available"
      );
      if (availableData.length === 0) {
        console.log("Không còn bàn trống");
        return;
      }
      setAvailableTables(availableData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const saveBillToDatabase = () => {
    const items = billItems.map((item) => ({
      drinkName: item.drink.Name,
      quantity: item.quantity,
    }));

    const notes = billItems.map((item) => ({
      percentOfSugar: item.sugar,
      size: item.size,
      hotOrCold: item.mood,
      percentOfIce: item.ice,
    }));

    const tableNo = availableTables[0].tableNumber;
    let data = {
      items,
      notes,
      totalAmount: totalPirce,
      TableNo: tableNo,
      Staff: user._id,
      PhuThu: 0,
    };
    fetch("http://localhost:3005/history/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        updateTableStatus(availableTables[0]._id);
        setSavedBill(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const calculateTotalPrice = (price) => {
    setTotalPrice(price);
  };
  const handleSetSelectedDrinkType = (drinkType) => {
    setSelectedDrinkType(drinkType);
  };
  useEffect(() => {
    setMood("hot");
    setSize("M");
    setSugar("100");
    setIce("100");
    fetchAvailableTables();
  }, [selectedSugar, selectedIce, selectedSize, selectedMood, availableTables]);
  const handleDrinkClick = (
    drink,
    selectedMood,
    selectedSize,
    selectedIce,
    selectedSugar
  ) => {
    setClickCount(clickCount + 1);
    setSelectedDrink(drink);
    setMood(selectedMood);
    setSize(selectedSize);
    setIce(selectedIce);
    setSugar(selectedSugar);
    const existingItemIndex = billItems.findIndex(
      (item) =>
        item.drink.id === drink.id &&
        item.mood === selectedMood &&
        item.size === selectedSize &&
        item.ice === selectedIce &&
        item.sugar === selectedSugar
    );
    if (existingItemIndex !== -1) {
      const newBillItems = [...billItems];
      newBillItems[existingItemIndex].quantity += 1;
      setBillItems(newBillItems);
    } else {
      const newBillItem = {
        drink: drink,
        mood: selectedMood,
        size: selectedSize,
        ice: selectedIce,
        quantity: 1,
        sugar: selectedSugar,
      };

      setBillItems([...billItems, newBillItem]);
    }
  };
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const filteredResults = drinksData.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredResults);
  };
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
              setResults={handleSearch}
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
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Tea"
              icon={FreeBreakfastOutlinedIcon}
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Juice"
              icon={LocalBarOutlinedIcon}
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Milk based"
              icon={EggOutlinedIcon}
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Topping"
              icon={EggOutlinedIcon}
              onClick={handleSetSelectedDrinkType}
            />
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
            <DrinkCard
              items={drinksData}
              searchItems={results}
              onDrinkClick={handleDrinkClick}
              selectedDrinkType={selectedDrinkType}
            />
          </Box>
        </div>
        <div className="bill-detail">
          <Typography
            color="#000009"
            padding="10%"
            fontSize="2em"
            fontWeight="bold"
          >
            Bill
          </Typography>
          {selectedDrink && (
            <BillCard
              billItems={billItems}
              calculateTotalPrice={calculateTotalPrice}
            />
          )}
          <div className="hehe">
            --------------------------------------------------
          </div>
          {totalPirce > 0 && (
            <div className="totalPrice">
              <Typography
                color="#000009"
                padding="10%"
                fontSize="1.7em"
                fontWeight="bold"
                paddingTop="4%"
                paddingBottom="0%"
                marginBottom="0%"
              >
                Total
              </Typography>
              <div className="Price">{totalPirce} VND</div>
            </div>
          )}
          <div className="payment">
            <Typography
              color="#000009"
              padding="10%"
              fontSize="1.7em"
              fontWeight="bold"
            >
              Payment Method
            </Typography>
            <div className="PaymentMethod">
              <div className="momo">
                <IconButton>
                  <WalletOutlinedIcon />
                </IconButton>
              </div>
              <div className="cash">
                <IconButton>
                  <LocalAtmOutlinedIcon />
                </IconButton>
              </div>
              <div className="bank">
                <IconButton>
                  <AccountBalanceOutlinedIcon />
                </IconButton>
              </div>
            </div>
            <div className="button">
              <button className="add-to-payment" onClick={handlePrint}>
                Print Bill
              </button>
            </div>
            {isVisible && (
              <div ref={componentRef}>
                <div className="container">
                  <div className="JavaJoy">
                    <h1>Java Joy</h1>
                  </div>
                  <div className="HoaDon"> Hoá Đơn Thanh Toán</div>
                  <div className="MaHoaDon">
                    Mã Hoá Đơn: {savedBill && savedBill._id}
                  </div>
                  <div className="date">
                    Ngày: {savedBill && savedBill.createdAt}
                  </div>
                  <div className="tableNumber">
                    Bàn số: {savedBill && savedBill.TableNo}
                  </div>
                  <div className="staffName">
                    Nhân viên: {savedBill && Name}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default MenuPage;
