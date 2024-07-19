import Modal from "react-modal";
import React, { useEffect, useState, useCallback } from "react";
import "./modalTable.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { parseISO, format, isAfter, startOfToday } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Đặt các style cho Modal
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "470px",
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
const FormTable = ({
  isOpen,
  onClose,
  onCloseAndUpdate,
  data,
  tableNumber,
}) => {
  const [errors, setErrors] = useState({});
  const { token } = useSelector((state) => state.auths);
  const navigate = useNavigate();
  const [table, setTable] = useState({
    customerName: data.customerName,
    bookingDate: data.bookingDate,
    bookingTime: data.bookingTime,
    numberOfPeople: data.numberOfPeople,
    phoneNumberBooking: data.phoneNumberBooking,
    note: data.note,
    status: "booked",
  });
  const validateInputs = () => {
    let tempErrors = {};
    if (!table.customerName) tempErrors.customerName = true;
    if (!table.bookingDate) tempErrors.bookingDate = true;
    if (!table.bookingTime) tempErrors.bookingTime = true;
    if (!table.numberOfPeople) tempErrors.numberOfPeople = true;
    if (!table.phoneNumberBooking) tempErrors.phoneNumberBooking = true;
    if (!table.note) tempErrors.note = true;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setTable((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bookingDate") {
      const selectedDate = parseISO(value);
      const today = startOfToday();

      setTable((prevTable) => ({
        ...prevTable,
        [name]: value,
        status: isAfter(selectedDate, today) ? "booked" : "available",
      }));
    } else {
      setTable((prevTable) => ({
        ...prevTable,
        [name]: value,
      }));
    }
  };

  const capNhat = async () => {
    if (validateInputs()) {
      try {
        console.log("Update data");
        const response = await fetch(
          `http://localhost:3005/booking/${tableNumber}/${data._id}`,
          {
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
            }),
          }
        );

        if (response.ok) {
          onCloseAndUpdate();
        }
      } catch (error) {
        console.error("Request failed with error:", error);
      }
    } else {
      console.log(errors);
    }
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="closebtn">
        <label>Booking Infomation</label>
        <button className="buttonx" onClick={onClose}>
          x
        </button>
      </div>
      <div style={{ marginLeft: "5px", marginRight: "5px" }}>
        <div className="label-Input">
          <label style={{ fontWeight: "bold" }}>Table: </label>
          <input
            type="text"
            placeholder="Enter Table"
            className="inputH"
            value={tableNumber}
          />
        </div>

        <div className="label-Input">
          <label style={{ fontWeight: "bold" }}>Customer: </label>
          <input
            type="text"
            placeholder="Enter name"
            name="customerName"
            className={`input2 ${errors.customerName ? "error-input" : ""}`}
            value={table.customerName}
            onChange={(e) => {
              handleChange(e);
              console.log(errors);
              if (errors.customerName) {
                setErrors({ ...errors, customerName: false });
              }
            }}
          />
        </div>

        <div className="label-Input">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Booked date: </label>
            <input
              type="date"
              id="date"
              name="bookingDate"
              min={format(table.bookingDate, "yyyy-MM-dd")}
              className={`date-picker1 ${
                errors.bookingDate ? "error-input" : ""
              }`}
              value={
                table.bookingDate
                  ? format(parseISO(table.bookingDate), "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) => {
                handleChange(e);
                if (errors.bookingDate) {
                  setErrors({ ...errors, bookingDate: false });
                }
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Time: </label>
            <input
              type="time"
              className={`time ${errors.bookingTime ? "error-input" : ""}`}
              name="bookingTime"
              value={table.bookingTime}
              onChange={(e) => {
                handleChange(e);
                if (errors.bookingTime) {
                  setErrors({ ...errors, bookingTime: false });
                }
              }}
            />
          </div>
        </div>

        <div className="label-Input">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Phone Number: </label>
            <input
              type="text"
              className={`SDT ${
                errors.phoneNumberBooking ? "error-input" : ""
              }`}
              name="phoneNumberBooking"
              placeholder="Enter PN"
              onChange={(e) => {
                handleChange(e);
                // const input = e.target.value;

                //     // Kiểm tra nếu input chỉ chứa số
                //     if (/^\d*$/.test(input)) {
                //       setPhone(input.toString());

                //       // Kiểm tra nếu input có ít nhất 10 chữ số
                //       if (input.length >= 10) {
                //         console.log("hihi" + input.length);
                //         setErrors({ ...errors, phoneNumberBooking: false });
                //       } else {
                //         console.log(input.length);
                //         setErrors({ ...errors, phoneNumberBooking: true });
                //       }
                //     } else {
                //       // Nếu có ký tự không phải số, đặt lỗi
                //       setErrors({ ...errors, phone: true });
                //     }
              }}
              value={table.phoneNumberBooking}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Guest Number</label>
            <input
              type="number"
              min="1"
              name="numberOfPeople"
              max="100"
              step="1"
              className={`NumberCount ${
                errors.numberOfPeople ? "error-input" : ""
              }`}
              onChange={(e) => {
                handleChange(e);
                if (errors.numberOfPeople) {
                  setErrors({ ...errors, numberOfPeople: false });
                }
              }}
              value={table.numberOfPeople}
            />
          </div>
        </div>
        <label className="label-Input" style={{ fontWeight: "bold" }}>
          Choose status of table:{" "}
        </label>
        <RadioGroup
          row
          className={`RadioGroup ${errors.status ? "error-input" : ""}`}
          name="status"
          value={table.status}
          onChange={(e) => {
            handleChange(e);
            if (errors.status) {
              setErrors({ ...errors, status: false });
            }
          }}
        >
          <FormControlLabel
            value="available"
            control={<Radio />}
            label="Available"
          />
          <FormControlLabel
            value="occupied"
            control={<Radio />}
            label="Occupied"
          />
          <FormControlLabel value="booked" control={<Radio />} label="Booked" />
        </RadioGroup>
        <div className="label-Input">
          <label style={{ fontWeight: "bold" }}>Note: </label>
          <input
            type="text"
            placeholder="Enter note"
            name="note"
            className={`input3 ${errors.note ? "error-input" : ""}`}
            value={table.note}
            onChange={(e) => {
              handleChange(e);
              if (errors.note) {
                setErrors({ ...errors, note: false });
              }
            }}
          />
        </div>
        <button className="btnCN" onClick={() => capNhat()}>
          UPDATE
        </button>
      </div>
    </Modal>
  );
};

export default FormTable;
