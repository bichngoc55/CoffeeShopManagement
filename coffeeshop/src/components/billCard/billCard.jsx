import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./billCard.css";

const BillCard = ({ billItems, calculateTotalPrice }) => {
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
                      <div className="mood">
                        Mood: <span className="value">{billItem.mood}</span>
                      </div>
                      <div className="size">
                        Size: <span className="value">{billItem.size}</span>
                      </div>
                    </div>
                    <div className="info-row">
                      <div className="ice">
                        Ice: <span className="value">{billItem.ice}</span>
                      </div>
                      <div className="sugar">
                        Sugar: <span className="value">{billItem.sugar}</span>
                      </div>
                    </div>
                    <div className="quantity">
                      Count: <span className="value">{billItem.quantity}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="price">{billItem.drink.Price}</div>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body1">No items in the billing</Typography>
      )}
    </div>
  );
};

export default BillCard;
