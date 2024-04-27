import { Card, CardContent, Typography } from "@mui/material";
// import { Image } from "react-bootstrap";
import "./drinkCard.css";
import { useState, useEffect } from "react";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import { getDrinkInformation } from "../../services/drinkService";
const DrinkCard = ({ items, searchTerm }) => {
  const [drinksData, setDrinksData] = useState([]);
  const [results, setResults] = useState([]);
  useEffect(() => {
    getDrinkInformation().then((data) => {
      setDrinksData(data);
    });
  }, []);
  useEffect(() => {
    if (searchTerm) {
      setResults(
        drinksData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setResults(drinksData);
    }
  }, [searchTerm, drinksData]);
  return (
    <div className="card">
      <div className="details">
        {items.map((item, id) => {
          return (
            <Card key={id}>
              <div className="photo">
                <img src={item.Photo} alt={item.name} />
              </div>
              <div className="details">
                <CardContent>
                  <Typography>{item.Name}</Typography>
                  <Typography>{item.Price}</Typography>
                  <Typography>{item.Description}</Typography>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="options">
        <div className="moodOption">
          <Typography
            sx={{ paddingBottom: "1%", paddingTop: "1%" }}
            className="optionTitle"
          >
            Mood
          </Typography>
          <div className="moodIcon">
            <div className="hotOption">
              <LocalFireDepartmentOutlinedIcon />
            </div>
            <div className="coldOption">
              <AcUnitOutlinedIcon />
            </div>
          </div>
        </div>
        <div className="sizeOption">
          <Typography
            sx={{ paddingBottom: "1%", paddingTop: "1%" }}
            className="optionTitle"
          >
            Size
          </Typography>
          <div className="sizeIcon">
            <div className="S">
              <Typography>S</Typography>
            </div>
            <div className="M">
              <Typography>M</Typography>
            </div>
            <div className="L">
              <Typography>L</Typography>
            </div>
          </div>
        </div>
        <div className="Sugar">
          <Typography
            sx={{ paddingBottom: "1%", paddingTop: "1%" }}
            className="optionTitle"
          >
            Sugar
          </Typography>
          <div className="sugarIcon">
            <div className="LeastSugar">
              <Typography>30</Typography>
            </div>
            <div className="MediumSugar">
              <Typography>50</Typography>
            </div>
            <div className="DefaultSugar">
              <Typography>100</Typography>
            </div>
          </div>
        </div>
        <div className="Ice">
          <Typography
            sx={{ paddingBottom: "1%", paddingTop: "1%" }}
            className="optionTitle"
          >
            Ice
          </Typography>
          <div className="iceIcon">
            <div className="LeastIce">
              <Typography>30</Typography>
            </div>
            <div className="MediumIce">
              <Typography>50</Typography>
            </div>
            <div className="DefaultIce">
              <Typography>100</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
