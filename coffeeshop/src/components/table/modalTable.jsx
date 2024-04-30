import React from "react";
import Modal from "react-modal";
import "./modalTable.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
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
const formTable = ({ isOpen, onClose }) => {
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
          <input type="text" placeholder="Nhập mã bàn" className="inputH" />
        </div>

        <div className="label-Input">
          <label style={{ fontWeight: "bold" }}>Tên khách hàng: </label>
          <input type="text" placeholder="Nhập họ tên" className="input2" />
        </div>

        <div className="label-Input">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Ngày đặt: </label>
            <input type="date" id="date" className="date-picker1" />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Giờ đặt: </label>
            <input type="time" className="time" />
          </div>
        </div>

        <div className="label-Input">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>SDT: </label>
            <input
              type="text"
              className="SDT"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Số lượng khách </label>
            <input
              type="number"
              min="1"
              max="100"
              step="1"
              className="NumberCount"
            />
          </div>
        </div>
        <label className="label-Input" style={{ fontWeight: "bold" }}>
          Chọn trạng thái bàn:{" "}
        </label>
        <RadioGroup row className="RadioGroup">
          <FormControlLabel value="empty" control={<Radio />} label="Trống" />
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
          <input type="text" placeholder="Nhập ghi chú" className="input3" />
        </div>
        <button className="btnCN">Cập nhật</button>
      </div>
    </Modal>
  );
};

export default formTable;
