import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const NotificationButton = () => {
  const { token } = useSelector((state) => state.auths);
  const [expiredData, setExpiredData] = useState([]);

  const fetchExpiredData = async () => {
    try {
      const response = await fetch("http://localhost:3005/inventory/expired", {
        method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  
          },
      });
      if (response.ok) {
        const expired = await response.json();
        setExpiredData(expired.data);
      } else {
        console.error("Request get expire data failed with status:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch expired data:", error);
    }
  };

  useEffect(() => {
    fetchExpiredData();
  }, []);

  return (
    <div>
      {expiredData.length > 0 ? (
        expiredData.map((item) => (
          <div key={item._id} className="notification-item">
            {item.name} sắp hết hạn vào ngày {new Date(item.ExpiryDate).toLocaleDateString()}
            <div style={{borderWidth: "0.6px", borderColor:"white", margin:"5%",}}/>
          </div>
        ))
      ) : (
        <div className="notification-item">Không có nguyên liệu nào gần hết hạn.</div>
      )}
    </div>
  );
};

export default NotificationButton;