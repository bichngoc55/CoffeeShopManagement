import React from "react";

function Gachchan() {
  const divCount = 30; // Số lượng phần tử div cần tạo

  const divElements = [];
  for (let i = 0; i < divCount; i++) {
    divElements.push(
      <div
        key={i}
        style={{ width: "5px", height: "1px", backgroundColor: "black" }}
      />
    );
  }

  return <>{divElements}</>;
}

export default Gachchan;
