import Modal from "react-modal";
import React, { useEffect, useState, useCallback } from "react";
import "./modalTable.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";

// Đặt các style cho Modal
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "430px",
    height: "440px",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: " 20px",
    background: "#fff",
    padding: "15px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Đặt màu nền cho phần bị che phủ
  },
};

// Component PopupDialog
const FormTable = ({ isOpen, onClose, id }) => {
  const { token } = useSelector((state) => state.auths);
  const [table, setTable] = useState({
    customerName: "",
    tableNumber: 0,
    bookingDate: new Date().toISOString(),
    bookingTime: "",
    numberOfPeople: 0,
    phoneNumberBooking: "",
    note: "",
    status: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTable((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const capNhat = async () => {
    try {
      console.log("Update data");
      const response = await fetch(`http://localhost:3005/booking/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerName: table.customerName,
          tableNumber: table.tableNumber,
          bookingDate: table.bookingDate,
          bookingTime: table.bookingTime,
          numberOfPeople: table.numberOfPeople,
          phoneNumberBooking: table.phoneNumberBooking,
          note: table.note,
          status: table.status,
        }),
      });

      if (response.ok) {
        response.json().then((data) => {
          alert("Cập nhật thành công, load lại trang nhé");
        });
      }
    } catch (error) {
      console.error("Request failed with error:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data table");
        const response = await fetch(`http://localhost:3005/booking/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTable({
            customerName: data.customerName,
            tableNumber: data.tableNumber,
            bookingDate: data.bookingDate,
            bookingTime: data.bookingTime,
            numberOfPeople: data.numberOfPeople,
            phoneNumberBooking: data.phoneNumberBooking,
            note: data.note,
            status: data.status,
          });
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Request failed with error:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="closebtn">
        <label>Thông tin đặt bàn</label>
        <button className="buttonx" onClick={onClose}>
          x
        </button>
      </div>
      <div style={{ marginLeft: "5px", marginRight: "5px" }}>
        <div className="label-Input">
          <label style={{ fontWeight: "bold" }}>Mã bàn: </label>
          <input
            type="text"
            placeholder="Nhập mã bàn"
            className="inputH"
            value={table.tableNumber}
          />
        </div>

        <div className="label-Input">
          <label style={{ fontWeight: "bold" }}>Tên khách hàng: </label>
          <input
            type="text"
            placeholder="Nhập họ tên"
            name="customerName"
            className="input2"
            defaultValue={table.customerName}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="label-Input">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Ngày đặt: </label>
            <input
              type="date"
              id="date"
              name="bookingDate"
              className="date-picker1"
              value={
                table.bookingDate
                  ? format(parseISO(table.bookingDate), "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Giờ đặt: </label>
            <input
              type="time"
              className="time"
              name="bookingTime"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="label-Input">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>SDT: </label>
            <input
              type="text"
              className="SDT"
              name="phoneNumberBooking"
              placeholder="Nhập số điện thoại"
              onChange={(e) => handleChange(e)}
              defaultValue={table.phoneNumberBooking}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Số lượng khách </label>
            <input
              type="number"
              min="1"
              name="numberOfPeople"
              max="100"
              step="1"
              className="NumberCount"
              onChange={(e) => handleChange(e)}
              defaultValue={table.numberOfPeople}
            />
          </div>
        </div>
        <label className="label-Input" style={{ fontWeight: "bold" }}>
          Chọn trạng thái bàn:{" "}
        </label>
        <RadioGroup
          row
          className="RadioGroup"
          name="status"
          defaultValue={table.status}
          onChange={(e) => handleChange(e)}
        >
          <FormControlLabel
            value="available"
            control={<Radio />}
            label="Trống"
          />
          <FormControlLabel
            value="occupied"
            control={<Radio />}
            label="Đang có khách"
          />
          <FormControlLabel
            value="booked"
            control={<Radio />}
            label="Đặt trước"
          />
        </RadioGroup>
        <div className="label-Input">
          <label style={{ fontWeight: "bold" }}>Note: </label>
          <input
            type="text"
            placeholder="Nhập ghi chú"
            name="note"
            className="input3"
            defaultValue={table.note}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="btnCN" onClick={() => capNhat()}>
          Cập nhật
        </button>
      </div>
    </Modal>
  );
};

export default FormTable;
