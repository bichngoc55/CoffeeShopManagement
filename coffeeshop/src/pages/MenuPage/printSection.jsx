import React from "react";
import { Typography, Box, Divider } from "@mui/material";

const PrintSection = ({
  shouldRenderPrintSection,
  Name,
  savedBill,
  billItems,
  totalPrice,
  payment,
}) => {
  const currentDate = new Date().toLocaleString();

  return (
    <Box sx={{ padding: 2, maxWidth: "300px", margin: "auto" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Coffee Shop Receipt
      </Typography>

      <Typography variant="body2" align="center" gutterBottom>
        Date: {currentDate}
      </Typography>

      <Typography variant="body2" gutterBottom>
        Staff: {Name}
      </Typography>
      {savedBill && (
        <Box>
          <Typography variant="body2">Bill ID: {savedBill._id}</Typography>
          {/* <Typography variant="body2">Table No: {savedBill.TableNo.TableNumber}</Typography> */}
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h4" gutterBottom>
        Order Details:
      </Typography>

      {billItems.map((item, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography variant="h6">{item.drink.Name}</Typography>
          <Typography variant="body2">
            {item.quantity} x {item.drink.Price} ={" "}
            {item.quantity * item.drink.Price} VND
          </Typography>
          <Typography variant="body2">
            Size: {item.size} - Mood: {item.mood}
          </Typography>
          <Typography variant="body2">
            Ice: {item.ice}% - Sugar: {item.sugar}%
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Total: {totalPrice} VND
      </Typography>

      <Typography variant="body1" gutterBottom>
        Payment Method: {payment}
      </Typography>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Thank you for your purchase!
      </Typography>
    </Box>
  );
};

export default PrintSection;
