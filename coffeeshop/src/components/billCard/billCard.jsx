import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./billCard.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
const BillCard = ({
  billItems,
  calculateTotalPrice,
  clickItem,
  inCrease1Quantity,
  delete1quantity,
}) => {
  const totalPrice = billItems.reduce((total, billItem) => {
    return total + billItem.drink.Price * billItem.quantity;
  }, 0);
  useEffect(() => {
    calculateTotalPrice(totalPrice);
  }, [billItems, calculateTotalPrice]);

  return (
    <div className="bill-container">
      {billItems.length > 0 ? (
        <div className="bill-items">
          {billItems.map((billItem, index) => (
            <div key={index} className="bill-item-card">
              <img
                className="imgDrink"
                onClick={(e) => {
                  clickItem(e, billItem, index);
                }}
                src={`http://localhost:3005/assets/${billItem.drink.Photo}`}
                alt="billItem.drink.Name"
              />
              <div className="leftInfo">
                <div color="#241C19" className="name">
                  {billItem.drink.Name}
                </div>
                {billItem.drink.LoaiDoUong !== "Topping" && (
                  <div className="notes">
                    <div className="info-row">
                      <div className="option">
                        Mood: <span className="value">{billItem.mood}</span>
                      </div>
                      <div className="option">
                        Size: <span className="value">{billItem.size}</span>
                      </div>
                    </div>
                    <div className="info-row">
                      <div className="option">
                        Ice: <span className="value">{billItem.ice}</span>
                      </div>
                      <div className="option">
                        Sugar: <span className="value">{billItem.sugar}</span>
                      </div>
                    </div>
                    <div className="option">
                      Count:{" "}
                      <IconButton>
                        <RemoveIcon onClick={() => delete1quantity(billItem,index)} />
                      </IconButton>{" "}
                      <span className="value">{billItem.quantity}</span>{" "}
                      <IconButton onClick={() => inCrease1Quantity(billItem, index)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
              <div className="price">{billItem.drink.Price}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="option">No items in the billing</div>
      )}
    </div>
  );
};

export default BillCard;
