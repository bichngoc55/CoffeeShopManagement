import React from "react";
import { useSelector } from "react-redux";

const componentRef = ({ billItems }) => {
  const { Name } = useSelector((state) => state.auths.user);
  fetch("http://localhost:3005/history/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key1: "value1",
      key2: "value2", // The body of your POST
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => console.log("Success:", data)) // Do something with the data
    .catch((error) => console.error("Error:", error)); // Catch any errors

  return (
    <div className="container">
      <div className="JavaJoy">
        <h1>Java Joy</h1>
      </div>
      <div className="HoaDon"> Hoá Đơn Thanh Toán</div>
      <div className="MaHoaDon">{}</div>
      <div className="date">Ngày: {new Date().toLocaleDateString()}</div>
      <div className="hour">Giờ thanh toán: {new Date().toLocaleString()}</div>
      {/* <div className='tableNumber'>Bàn số: {billItems.tableNumber}</div> */}
      <div className="staffName">Nhân viên: {Name}</div>
    </div>
  );
};

export default componentRef;
