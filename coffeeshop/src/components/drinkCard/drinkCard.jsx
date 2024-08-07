import { Card, CardContent, Typography } from "@mui/material";
import "./drinkCard.css";
import { useState, useEffect } from "react";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import DescriptionText from "../DescriptionText//DescriptionText";
import { useReactToPrint } from "react-to-print";
import { IconButton } from "@mui/material";
const DrinkCard = ({
  items,
  searchTerm,
  onDrinkClick,
  onDrinkSelected,
  selectedDrinkType,
}) => {
  const [results, setResults] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMood, setMood] = useState("");
  const [selectedSize, setSize] = useState("");
  const [selectedIce, setIce] = useState("");
  const [selectedSugar, setSugar] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(null);
  const calculateAdjustedPrice = (basePrice, size) => {
    // console.log("size 3: ", size);
    switch (size) {
      case "M":
        return basePrice + 5;
      case "L":
        return basePrice + 10;
      default:
        return basePrice;
    }
  };

  const resetSelections = () => {
    setMood("");
    setSize("");
    setIce("");
    setSugar("");
    setSelectedCardId(null);
  };
  const handleCardClick = (id, item) => {
    if (id !== selectedCardId) {
      resetSelections();
    }
    setSelectedCardId(id);

    console.log(id);
    onDrinkSelected(item);
  };

  const handleMoodClick = (mood) => {
    setMood(mood);
    console.log(selectedMood);
  };
  const handleSizeClick = (size) => {
    setSize(size);
  };
  const handleIceClick = (ice) => {
    setIce(ice);
  };
  const handleSugarClick = (sugar) => {
    setSugar(sugar);
  };
  useEffect(() => {
    setIsLoading(true);
    let filteredItems = [...items];

    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDrinkType) {
      if (selectedDrinkType.title === "All") {
        filteredItems = filteredItems.filter(
          (item) =>
            item.LoaiDoUong === "Coffee" ||
            item.LoaiDoUong === "Tea" ||
            item.LoaiDoUong === "Topping" ||
            item.LoaiDoUong === "Milk based" ||
            item.LoaiDoUong === "Juice"
        );
      } else {
        filteredItems = filteredItems.filter(
          (item) => item.LoaiDoUong === selectedDrinkType.title
        );
      }
    }
    filteredItems = filteredItems.map((item) => ({
      ...item,
      isTopping: item.LoaiDoUong !== "Topping",
    }));

    setResults(filteredItems);
    setIsLoading(false);
  }, [searchTerm, items, selectedDrinkType]);

  return (
    <div className="container2">
      {isLoading ? (
        <div className="loading-container">
          <Typography variant="h6">Loading...</Typography>
        </div>
      ) : results.length > 0 ? (
        results.map((item, id) => {
          return (
            <div key={item._id} id={item._id} className="drink-card">
              <Card onClick={() => handleCardClick(item._id, item)}>
                <CardContent>
                  <div className="above">
                    <img
                      className="image"
                      src={
                        item.Photo.startsWith("http://res.cloudinary")
                          ? item.Photo
                          : `http://localhost:3005/assets/${item.Photo}`
                      }
                      alt={item.Name}
                    />{" "}
                    <div className="textComponent">
                      <Typography
                        fontWeight="bold"
                        fontSize="1.4em"
                        fontFamily="Montserrat"
                        padding-bottom="15%"
                      >
                        {item.Name}
                      </Typography>
                      <DescriptionText description={item.Description} />
                      <Typography
                        color="#62453A"
                        fontWeight="bold"
                        fontSize="1.3em"
                        fontFamily="Montserrat"
                        padding-top="15%"
                      >
                        {selectedCardId === item._id
                          ? calculateAdjustedPrice(item.Price, selectedSize)
                          : item.Price}{" "}
                        VND
                      </Typography>
                    </div>
                  </div>
                  {item.isTopping && (
                    <div className="below">
                      <div className="upperSection">
                        <div className="Mood">
                          <Typography
                            fontSize="1.2em"
                            fontFamily="Montserrat" 
                            fontWeight="bold"
                            paddingTop="8%"
                          >
                            Mood
                          </Typography>
                          <div className="Icon">
                            <div
                              className={`hot-icon ${
                                selectedCardId === item._id &&
                                selectedMood === "hot"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleMoodClick("hot")}
                            >
                              <IconButton>
                                <LocalFireDepartmentOutlinedIcon />
                              </IconButton>
                            </div>

                            <div
                              className={`cold-icon ${
                                selectedCardId === item._id &&
                                selectedMood === "cold"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleMoodClick("cold")}
                            >
                              {" "}
                              <IconButton
                                onClick={() => handleMoodClick("cold")}
                                className="cold-icon"
                              >
                                <AcUnitOutlinedIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                        <div className="Size">
                          <Typography
                            fontSize="1.2em"
                            fontFamily="Montserrat"
                            fontWeight="bold"
                            paddingRight="54%"
                            paddingTop="8%"
                          >
                            Size
                          </Typography>
                          <div className="SizeContent">
                            <div
                              className={`smallSize ${
                                selectedCardId === item._id &&
                                selectedSize === "S"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleSizeClick("S")}
                            >
                              <div className="option_text" onClick={() => handleSizeClick("S")}>
                                S
                              </div>
                            </div>
                            <div
                              className={`mediumSize ${
                                selectedCardId === item._id &&
                                selectedSize === "M"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleSizeClick("M")}
                            >
                              <div className="option_text" onClick={() => handleSizeClick("M")}>
                                M
                              </div>
                            </div>
                            <div
                              className={`largeSize ${
                                selectedCardId === item._id &&
                                selectedSize === "L"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleSizeClick("L")}
                            >
                              <div className="option_text" onClick={() => handleSizeClick("L")}>
                                L
                              </div>
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="belowSection">
                        <div className="Sugar">
                          <Typography
                            fontSize="1.2em"
                            fontFamily="Montserrat"
                            fontWeight="bold"
                            paddingRight="50%"
                            paddingTop="8%"
                          >
                            Sugar
                          </Typography>
                          <div className="sugarContent">
                            <div
                              className={`leastSugar ${
                                selectedCardId === item._id &&
                                selectedSugar === "30"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleSugarClick("30")}
                            >
                              <div className="option_text"
                                onClick={() => handleSugarClick("30")}>
                                30
                              </div>
                            </div>
                            <div
                              className={`mediumSugar ${
                                selectedCardId === item._id &&
                                selectedSugar === "50"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleSugarClick("50")}
                            >
                              <div className="option_text"
                                onClick={() => handleSugarClick("50")}
                              >
                                50
                              </div>
                            </div>
                            <div
                              className={`defaultSugar ${
                                selectedCardId === item._id &&
                                selectedSugar === "100"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleSugarClick("100")}
                            >
                              <div className="option_text"
                                onClick={() => handleSugarClick("100")}
                              >
                                100
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="Ice">
                          <Typography
                            fontSize="1.2em"
                            fontFamily="Montserrat"
                            fontWeight="bold"
                            paddingRight="50%"
                            paddingTop="8%"
                          >
                            Ice
                          </Typography>
                          <div className="iceContent">
                            <div
                              className={`leastIce ${
                                selectedCardId === item._id &&
                                selectedIce === "0"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleIceClick("0")}
                            >
                              <div className="option_text">0</div>
                            </div>
                            <div
                              className={`mediumIce ${
                                selectedCardId === item._id &&
                                selectedIce === "50"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleIceClick("50")}
                            >
                              <div className="option_text">50</div>
                            </div>
                            <div
                              className={`defaultIce ${
                                selectedCardId === item._id &&
                                selectedIce === "100"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleIceClick("100")}
                            >
                              <div className="option_text">100</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      onDrinkClick(
                        item,
                        selectedMood,
                        selectedSize,
                        selectedIce,
                        selectedSugar,
                        item._id
                      );
                      resetSelections();
                    }}
                    className="add-to-billing"
                  >
                    Add to Billing
                  </button>
                </CardContent>
              </Card>
            </div>
          );
        })
      ) : (
        <div className="no-results-container">
          <Typography variant="h6">No results found</Typography>
        </div>
      )}
    </div>
  );
};

export default DrinkCard;
