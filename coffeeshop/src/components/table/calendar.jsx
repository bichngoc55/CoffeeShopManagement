import Modal from "react-modal";
import React, { useEffect, useState, useCallback } from "react";
import "./calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";

// Đặt các style cho Modal
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "80%",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: " 20px",
    background: "#fff",
    padding: "15px",
    zIndex: "5",
    position: "absolute",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Đặt màu nền cho phần bị che phủ
  },
};

// Component PopupDialog
const CalendarTable = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState([]);
  const { token } = useSelector((state) => state.auths);

  const fetchBookings = useCallback(async () => {
    const response = await fetch(`http://localhost:3005/booking/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const convertedEvents = convertToCalendarEvents(data);
      setEvents(convertedEvents);
    }
  });
  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen, fetchBookings]);
  const convertToCalendarEvents = (bookings) => {
    return bookings
      .filter((booking) => booking.status === "booked") // Lọc chỉ lấy các booking có status là "booked"
      .map((booking) => {
        // Kết hợp ngày và giờ
        const startDate = booking.bookingDate
          ? new Date(booking.bookingDate)
          : new Date();
        if (booking.bookingTime) {
          const [hours, minutes] = booking.bookingTime.split(":");
          startDate.setHours(parseInt(hours), parseInt(minutes));
        }
        console.log(booking);

        // Tạo ngày kết thúc (giả sử mỗi đặt bàn kéo dài 3 giờ)
        const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

        return {
          id: booking._id,
          title: `${booking.bookingTime || "NO TIME"} - Bàn ${
            booking.tableNumber || "N/A"
          }`,
          start: startDate,
          end: endDate,
          extendedProps: {
            customerName: booking.CustomerName,
            tableNumber: booking.tableNumber,
            bookingDate: booking.bookingDate,
            bookingTime: booking.bookingTime,
            numberOfPeople: booking.NumberOfPeople,
            phoneNumber: booking.PhoneNumberBooking,
            note: booking.Note || booking.note || "",
            status: booking.status,
          },
        };
      });
  };
  const renderEventContent = (eventInfo) => {
    const { extendedProps } = eventInfo.event;
    return (
      <>
        <b>
          {extendedProps.bookingTime || "NO TIME"} - Bàn{" "}
          {extendedProps.tableNumber || "N/A"}
        </b>
      </>
    );
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="closebtn">
        <label>Table Booking Schedule</label>
        <button className="buttonx" onClick={onClose}>
          x
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventContent={renderEventContent}
      />
    </Modal>
  );
};
export default CalendarTable;
