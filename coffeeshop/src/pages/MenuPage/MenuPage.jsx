import React, { useState, useEffect, useRef } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import "./Menu.css";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import DrinkCard from "../../components/drinkCard/drinkCard";
import Modal2 from "../../components/modal/modal";
import DrinkTypeCard from "../../components/drinkType/DrinkType";
import { MdOutlineLocalDrink } from "react-icons/md";
import { TbCoffee } from "react-icons/tb";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { FaGlassMartiniAlt } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { LuMilk } from "react-icons/lu";

import { getDrinkInformation } from "../../services/drinkService";
import axios from "axios";
import SearchBar from "../../components/searchBar/searchbar";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { IconButton } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { SearchResultsList } from "../../components/searchBar/searchResultList";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import BillCard from "../../components/billCard/billCard";
import PrintSection from "./printSection";
import ModifyDialog from "../../components/ModifyDialog/ModifyDialog";
import { QRCodeDisplay } from "./QRCode";
import { DeleteConfirmationModal } from "../../components/DeleteConfirmationModal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
  const [showQRCode, setShowQRCode] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [deleteBillItem, setDeleteBillItem] = useState();
  const [deleteIndex, setDeleteIndex] = useState(0);
  const handleItemClick = (e, billItem, index) => {
    // Thực hiện các hành động bạn muốn ở đây
    console.log("Clicked item:", billItem);
    setAnchorEl(e.currentTarget);
    setDeleteBillItem(billItem);
    setDeleteIndex(index);
  };

  const increase1quantity = (itemIncrease, index) => {
    setBillItems(
      billItems.map((item, indexItem) => {
        if (item.drink._id === itemIncrease.drink._id && indexItem === index) {
          console.log(item);
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );
  };
  const delete1quantity = (itemDelete, index) => {
    if (itemDelete.quantity > 1) {
      setBillItems(
        billItems.map((item, indexItem) => {
          if (
            item.drink._id === itemDelete.drink._id &&
            indexItem === index &&
            itemDelete.quantity > 0
          ) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
      );
      console.log(deleteBillItem);
    } else {
      setBillItems(billItems.filter((_, index) => index !== deleteIndex));
      handleCloseMenu();
    }
  };
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
        if (payment === "Digital") setShowQRCode(true);
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
      // Get current date and time
      const currentDate = new Date().toISOString().split("T")[0];
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      const response = await fetch(`http://localhost:3005/booking/${tableId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "occupied" }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const bookingData = {
      //   customerName: "N/A",
      //   bookingDate: currentDate,
      //   bookingTime: currentTime,
      // };

      // const bookingResponse = await fetch(
      //   `http://localhost:3005/booking/add/hehe/${tableId}`,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     body: JSON.stringify(bookingData),
      //   }
      // );

      // if (!bookingResponse.ok) {
      //   throw new Error(`HTTP error! status: ${bookingResponse.status}`);
      // }

      // // console.log("Table status and booking information updated");
      // console.log("Table status updated", bookingResponse);
      // console.log("Table status updated", response);

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
      console.log("table data: ", data);
      // const availableData = data.filter(
      //   (table) => table.status === "available"
      // );
      // if (availableData.length === 0) {
      //   console.log("Không còn bàn trống");
      //   return;
      // }
      // setAvailableTables(availableData);
      const currentDate = new Date();
      const availableData = data.filter((table) => {
        if (table.status !== "available") return false;

        if (table.Booking.length === 0) return true;

        return !table.Booking.some((booking) => {
          const bookingDate = new Date(booking.bookingDate);
          const bookingTime = booking.bookingTime.split(":");
          bookingDate.setHours(
            parseInt(bookingTime[0]),
            parseInt(bookingTime[1])
          );
          if (
            bookingDate.getDate() === currentDate.getDate() &&
            bookingDate.getMonth() === currentDate.getMonth() &&
            bookingDate.getFullYear() === currentDate.getFullYear()
          ) {
            // Tính khoảng thời gian giữa thời gian hiện tại và bookingTime
            const timeDiff = (bookingDate - currentDate) / (1000 * 60 * 60); // Chuyển đổi thành giờ

            // Nếu khoảng thời gian nhỏ hơn 4 giờ, không thêm vào danh sách available
            return timeDiff >= 0 && timeDiff < 3;
          }
          return false;
        });
      });
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
    setClickCount(clickCount + 1);
    console.log("den day r");
    setSelectedDrink(drink);
    setMood(selectedMood);
    setSize(selectedSize);
    setIce(selectedIce);
    setSugar(selectedSugar);
    let adjustedPrice = drink.Price;
    if (selectedSize === "M") {
      adjustedPrice += 5;
    } else if (selectedSize === "L") {
      adjustedPrice += 10;
    }
    const existingItemIndex = billItems.findIndex(
      (item) =>
        item.drink._id === drink._id &&
        item.mood === selectedMood &&
        item.size === selectedSize &&
        item.ice === selectedIce &&
        item.sugar === selectedSugar
    );
    if (existingItemIndex !== -1) {
      const newBillItems = [...billItems];
      newBillItems[existingItemIndex].quantity += 1;
      setBillItems(newBillItems);
      console.log(billItems);
    } else {
      const newBillItem = {
        drink: { ...drink, Price: adjustedPrice },
        mood: selectedMood,
        size: selectedSize,
        ice: selectedIce,
        quantity: 1,
        sugar: selectedSugar,
      };

      setBillItems([...billItems, newBillItem]);
    }
  };
  // const handleSearch = (searchTerm) => {
  //   if (!searchTerm) {
  //     setResults([]);
  //     return;
  //   }

  //   const filteredResults = drinksData.filter((item) =>
  //     item.Name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setResults(filteredResults);
  // };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (!term) {
      setResults([]);
      return;
    }

    const filteredResults = drinksData.filter((item) =>
      item.Name.toLowerCase().includes(term.toLowerCase())
    );
    setResults(filteredResults);
    console.log(
      "Kết quả search của '" + term + "' là:",
      filteredResults.map((item) => item.Name).join(", ")
    );
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
  const handleResultClick = (result) => {
    // Thêm bất kỳ xử lý nào bạn muốn khi một kết quả được click
    setResults([]);
    console.log(`Selected: ${result.Name}`);
  };
  const handleAddDrink = async (drink) => {
    setShowModal(true);
    try {
      let photoUrl = null;

      if (drink.Photo) {
        const formdata = new FormData();
        formdata.append("file", drink.Photo);
        formdata.append("upload_preset", "Searn-musicapp");
        formdata.append("cloud_name", "dzdso60ms");

        try {
          const cloudinaryResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dzdso60ms/image/upload",
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          photoUrl = cloudinaryResponse.data.url;
          console.log("Photo uploaded to Cloudinary:", photoUrl);
        } catch (error) {
          console.error("Error uploading photo to Cloudinary:", error);
        }
      }

      const drinkData = {
        ...drink,
        Photo: photoUrl,
      };

      const response = await fetch("http://localhost:3005/menu/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(drinkData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("New drink added: ", data);
      setDrinksData((prevDrinks) => [...prevDrinks, data]);
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleConfirmDelete = async (id) => {
    if (selectedDrink) {
      try {
        const response = await fetch(
          `http://localhost:3005/menu/${selectedDrink._id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Deleted drink: ", data);
        setDrinksData((prevDrinks) =>
          prevDrinks.filter((drink) => drink._id !== selectedDrink._id)
        );
        setShowDeleteConfirmation(false);
        setSelectedDrink(null);
      } catch (error) {
        console.error("Error:", error);
      }
    }
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
          backgroundColor: "#4B3621",
          position: "relative",
        }}
      >
        <div className="menu-section">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontSize={28} fontWeight={"bold"} color="white">
              Menu Category
            </Typography>
            {/* <SearchBar
              placeholder="Search category or menu"
              width="130%"
              height="24%"
              setResults={handleSearch}
            />
            {results && results.length > 0 && (
              <SearchResultsList results={results} />
            )} */}
            <div
              style={{
                position: "relative",
                zIndex: 5,
              }}
            >
              <SearchBar
                placeholder="Search category or menu"
                width="130%"
                height="24%"
                setResults={handleSearch}
              />
              {results.length > 0 && (
                <SearchResultsList
                  results={results}
                  onResultClick={handleResultClick}
                />
              )}
            </div>
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
              title="All"
              icon={MdOutlineLocalDrink}
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Coffee"
              icon={TbCoffee}
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Tea"
              icon={MdOutlineEmojiFoodBeverage}
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Juice"
              icon={FaGlassMartiniAlt}
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Milk based"
              icon={LuMilk}
              onClick={handleSetSelectedDrinkType}
            />
            <DrinkTypeCard
              title="Topping"
              icon={FaBowlFood}
              onClick={handleSetSelectedDrinkType}
            />
          </Box>
          <div className="coffeeMenu">
            <Typography
              className="coffeeMenuTitle"
              fontSize={22}
              fontWeight={"bold"}
              color="white"
            >
              Menu Items
            </Typography>
            <div className="ButtonComponent">
              <button className="btn" onClick={handleAddDrink}>
                Add Drink
              </button>
              <Modal2
                open={showModal}
                onClose={handleShowModal}
                handleAddDrink={handleAddDrink}
              />
              <button
                className="btn"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                Delete Drink
              </button>
              <button className="btn" onClick={handleShowModifyDialog}>
                Modify Drink
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
        <div className="bill-detail-container">
          <div className="bill-detail">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: "5%",
                marginBottom: "5%",
              }}
            >
              <Typography
                color="#000009"
                fontSize="2em"
                fontWeight="bold"
                fontFamily={"Montserrat"}
              >
                Bill
              </Typography>
              <Button onClick={() => setBillItems([])}>
                <Typography
                  fontSize="1.2em"
                  fontFamily="Montserrat"
                  fontWeight="550"
                  color={"red"}
                >
                  Clear All
                </Typography>
              </Button>
            </div>

            {selectedDrink && (
              <BillCard
                billItems={billItems}
                calculateTotalPrice={calculateTotalPrice}
                clickItem={handleItemClick}
                inCrease1Quantity={increase1quantity}
                delete1quantity={delete1quantity}
              />
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  setBillItems(
                    billItems.filter((_, index) => index !== deleteIndex)
                  );
                  handleCloseMenu();
                }}
              >
                Delete drink
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
            </Menu>
            <div
              style={{
                borderWidth: "0.6px",
                borderColor: "black",
                margin: "5%",
                width: "90%",
              }}
            />
            {totalPirce > 0 && (
              <div className="totalPrice">
                <Typography
                  color="#000009"
                  fontSize="1.2em"
                  fontWeight="bold"
                  marginTop="4%"
                  fontFamily={"Montserrat"}
                >
                  Total
                </Typography>
                <div className="Price">{totalPirce}.000 VND</div>
              </div>
            )}
            <div className="payment">
              <Typography
                color="#000009"
                padding="10%"
                fontSize="1.5em"
                fontWeight="bold"
                fontFamily={"Montserrat"}
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
              {showQRCode && savedBillDetails && (
                <QRCodeDisplay
                  billId={savedBillDetails._id}
                  onClose={() => setShowQRCode(false)}
                />
              )}
            </div>
            {selectedDrink && (
              <DeleteConfirmationModal
                isOpen={showDeleteConfirmation}
                onClose={() => setShowDeleteConfirmation(false)}
                onConfirm={handleConfirmDelete}
                selectedDrink={selectedDrink}
              />
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default MenuPage;
