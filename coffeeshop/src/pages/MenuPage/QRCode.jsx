// import QRCode from "qrcode.react"; // You might need to install this package

export const QRCodeDisplay = ({ billId, onClose }) => {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* <QRCode value={`http://yourwebsite.com/bill/${billId}`} /> */}
        <img
          style={{
            width: "300px",
            height: "300px",
            margin: "20px",
            objectFit: "contain",
          }}
          className="image"
          src={"http://localhost:3005/assets/qr2.png"}
        />
        <p>Scan to complete digital payment</p>
      </div>
    </div>
  );
};
