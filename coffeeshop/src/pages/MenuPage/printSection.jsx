import React from "react";
import "./printSection.css";
function PrintSection({ shouldRenderPrintSection, savedBill, Name }) {
  return (
    <div className="print-section">
      {shouldRenderPrintSection && (
        <div className="container2">
          <div className="JavaJoy">
            <h1>Java Joy</h1>
          </div>
          <div className="HoaDon">
            Hoá Đơn Thanh Toán
            <div className="MaHoaDon">
              Mã Hoá Đơn:{" "}
              {savedBill.current &&
                savedBill.current.items &&
                savedBill.current._id}
            </div>
            <div className="date">
              Ngày:{" "}
              {savedBill.current &&
                new Date(savedBill.current.createdAt).toLocaleString()}
            </div>
            <div className="tableNumber">
              Bàn số:{" "}
              {savedBill.current &&
                savedBill.current.items &&
                savedBill.current.TableNo.tableNumber}
            </div>
            <div className="staffName">
              Nhân viên: {savedBill.current && Name}
            </div>
          </div>
          <div className="TableDrink">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Drink Name</th>
                  <th>Notes</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {savedBill.current &&
                  savedBill.current.items &&
                  savedBill.current.items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Drinks.Name}</td>
                      <td>
                        {item.sugar} - {item.size} - {item.hotOrCold}
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.Drinks.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="totalPrice">
            <div className="TotalPrice">
              Total: {savedBill.current && savedBill.current.totalAmount}
            </div>
            <div className="PhuThu">
              Phụ thu: {savedBill.current && savedBill.current.PhuThu}
            </div>
            <div className="FinalPrice">
              Final Total:{" "}
              {savedBill.current &&
                savedBill.current.totalAmount + savedBill.current.PhuThu}
            </div>
          </div>
          <div className="wifi-password">Wifi: gautoi | Password: hehe</div>
          <div className="quote">See you again</div>
        </div>
      )}
    </div>
  );
}

export default PrintSection;
