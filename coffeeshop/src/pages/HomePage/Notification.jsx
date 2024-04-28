import React, { useState } from 'react';



const NotificationButton = () => {

  return (
    <div>
      <div className="notification-list" 
            style={{position: 'fixed' ,justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
        <div className="notification-item">Notification 1</div>
        <div className="notification-item">Notification 2</div>
        <div className="notification-item">Notification 3</div>
      </div>
    </div>

  );
};

export default NotificationButton;