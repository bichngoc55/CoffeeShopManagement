import React, { useState, useEffect, useRef } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import "./Menu.css";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import DrinkCard from "../../components/drinkCard/drinkCard";
import Modal2 from "../../components/modal/modal";
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
import PrintSection from "./printSection";
import ModifyDialog from "../../components/ModifyDialog/ModifyDialog";

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
  const [shouldRenderPrintSection, setShouldRenderPrintSection] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auths.token);
  const user = useSelector((state) => state.auths.user);
  const Name = user.Name;
  const [availableTables, setAvailableTables] = useState([]);
  const [savedBillDetails, setSavedBillDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showModifyDialog, setShowModifyDialog] = useState(false);
  const [payment, setPayment] = useState("");

  //payment
  const handlePayment = async (type) => {
    if (type === "cash") {
      setPayment("Cash");
    } else if (type === "bank") {
      setPayment("Card");
    } else {
      setPayment("Digital");
    }
  };
  const selectedPaymentStyle = {
    border: "1px solid red",
  };

  //print function
  const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   onBeforePrint: async () => {
  //     if (billItems.length > 0) {
  //       const billId = await saveBillToDatabase();
  //       const savedBillDetails = await fetchBillDetails(billId);
  //       console.log(
  //         "savedBillDetails: ",
  //         JSON.stringify(savedBillDetails, null, 2)
  //       );
  //       setSavedBillDetails(savedBillDetails);
  //       setIsVisible(true);
  //     } else {
  //       alert("Nothing to print in the bill!");
  //     }
  //   },
  // });
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: async () => {
      if (billItems.length > 0) {
        const billId = await saveBillToDatabase();
        const savedBillDetails = await fetchBillDetails(billId);
        setSavedBillDetails(savedBillDetails);
        setIsVisible(true);

        // Wait for state to update
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });
      } else {
        alert("Nothing to print in the bill!");
        return false;
      }
    },
  });
  const updateTableStatus = async (tableId) => {
    try {
      await fetch(`http://localhost:3005/booking/${tableId}`, {
        method: "PATCH",
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
      // console.log("table data: ", data);
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
  useEffect(() => {
    if (isVisible) {
      setShouldRenderPrintSection(true);
    }
  }, [isVisible]);
  const fetchBillDetails = async (BillId) => {
    try {
      const response = await fetch(`http://localhost:3005/history/${BillId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const billDetails = await response.json();
      return billDetails;
    } catch (error) {
      console.error("Failed to get bill details:", error);
    }
  };
  const saveBillToDatabase = async () => {
    // console.log("billItems,", billItems);
    const items = billItems.map((item) => ({
      drink: item.drink._id,
      quantity: item.quantity,
      price: item.drink.Price,
      percentOfSugar: item.sugar,
      size: item.size,
      hotOrCold: item.mood,
      percentOfIce: item.ice,
    }));
    // console.log("items:", items);
    const tableNo = availableTables[0]._id;
    // console.log(tableNo);
    const postData = {
      items,
      totalAmount: totalPirce,
      PaymentMethod: payment,
      TableNo: tableNo,
      Staff: user._id,
      PhuThu: 0,
    };
    // console.log("postData: ", postData);
    try {
      const response = await fetch("http://localhost:3005/history/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      updateTableStatus(availableTables[0]._id);
      //   console.log("data: ", JSON.stringify(data, null, 2));
      return data._id;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateTotalPrice = (price) => {
    setTotalPrice(price);
  };
  const handleSetSelectedDrinkType = (drinkType) => {
    setSelectedDrinkType(drinkType);
  };
  useEffect(() => {
    fetchAvailableTables();
  }, []);
  const handleDrinkModify = (drinkModify) => {
    setSelectedDrink(drinkModify);
  };
  const handleUpdateChange = async (modifiedDrink) => {
    try {
      const response = await fetch(
        `http://localhost:3005/menu/${selectedDrink._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modifiedDrink),
        }
      );

      const data = await response.json();
      console.log(data);
      setDrinksData((prevDrinks) =>
        prevDrinks.map((drink) =>
          drink._id === selectedDrink._id ? { ...drink, ...data } : drink
        )
      );
      const updatedDrinks = await getDrinkInformation();
      setDrinksData(updatedDrinks);

      setShowModifyDialog(false);
      setSelectedDrink(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDrinkClick = (
    drink,
    selectedMood,
    selectedSize,
    selectedIce,
    selectedSugar
  ) => {
    if (
      selectedMood === "" ||
      selectedSize === "" ||
      selectedIce === "" ||
      selectedSugar === ""
    ) {
      alert("Please choose a mood, size, ice, and sugar percentage");
      return;
    }
    setClickCount(clickCount + 1);
    console.log("den day r");
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
  const handleShowModal = () => {
    setShowModal(false);
  };
  const handleHideModal = () => {
    setShowModal(false);
  };
  const handleAddDrink = (drink) => {
    setShowModal(true);
  };

  const handleDeleteDrink = (drinkId) => {
    const newBillItems = billItems.filter((item) => item.drink.id !== drinkId);
    setBillItems(newBillItems);
  };
  const handleShowModifyDialog = () => {
    setShowModifyDialog(true);
    // if(selectedDrink)
    console.log("Drink of selected: ", selectedDrink);
  };
  const handleHideModifyDialog = () => {
    setShowModifyDialog(false);
  };
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
            <div className="ButtonComponent">
              <button className="btn" onClick={handleAddDrink}>
                Thêm Món
              </button>
              <Modal2
                open={showModal}
                onClose={handleShowModal}
                handleAddDrink={handleAddDrink}
              />
              <button
                className="btn"
                onClick={() => handleDeleteDrink(selectedDrink._id)}
              >
                Xoá Món
              </button>
              <button className="btn" onClick={handleShowModifyDialog}>
                Sửa Món
              </button>
              {showModifyDialog && (
                <ModifyDialog
                  onClose={handleHideModifyDialog}
                  drink={selectedDrink}
                  handleUpdateChange={handleUpdateChange}
                />
              )}
            </div>
          </div>
          <Box className="cardDrink">
            <DrinkCard
              items={drinksData}
              searchItems={results}
              onDrinkClick={handleDrinkClick}
              onDrinkSelected={handleDrinkModify}
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
              <div
                className="momo"
                style={payment === "Digital" ? selectedPaymentStyle : {}}
              >
                <IconButton onClick={() => handlePayment("momo")}>
                  <WalletOutlinedIcon />
                </IconButton>
              </div>
              <div
                className="cash"
                style={payment === "Cash" ? selectedPaymentStyle : {}}
              >
                <IconButton onClick={() => handlePayment("cash")}>
                  <LocalAtmOutlinedIcon />
                </IconButton>
              </div>
              <div
                className="bank"
                onClick={() => handlePayment("bank")}
                style={payment === "Card" ? selectedPaymentStyle : {}}
              >
                <IconButton>
                  <AccountBalanceOutlinedIcon />
                </IconButton>
              </div>
            </div>
            <div className="button">
              <button
                className="add-to-payment"
                onClick={handlePrint}
                disabled={billItems.length === 0}
              >
                Print Bill
              </button>
            </div>
            {/* <div ref={componentRef}>
              {shouldRenderPrintSection && (
                <PrintSection
                  shouldRenderPrintSection={shouldRenderPrintSection}
                  Name={Name}
                  savedBill={savedBillDetails}
                />
              )}
            </div> */}
            <div style={{ display: "none" }}>
              <div ref={componentRef}>
                <PrintSection
                  shouldRenderPrintSection={shouldRenderPrintSection}
                  Name={Name}
                  savedBill={savedBillDetails}
                  billItems={billItems}
                  totalPrice={totalPirce}
                  payment={payment}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default MenuPage;
