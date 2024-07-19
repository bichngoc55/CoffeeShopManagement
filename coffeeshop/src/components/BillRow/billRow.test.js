import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BillRow from "./billRow";  

describe("BillRow Component", () => {
  const mockData = {
    _id: "test-id",
    items: [{ drink: { Name: "Test Drink" } }],
    TableNo: { tableNumber: "1" },
    Staff: { Name: "Test Staff" },
    totalAmount: 10,
    PaymentMethod: "Cash",
    createdAt: new Date(),
  };

  const mockHandleDelete = jest.fn();

  test("calls handleDelete when delete button is clicked", () => {
    render(<BillRow data={mockData} handleDelete={mockHandleDelete} />);

    const moreVertIcon = screen.getByRole("button", { name: /more/i });
    fireEvent.click(moreVertIcon);

    const deleteMenuItem = screen.getByRole("menuitem", { name: /delete/i });
    fireEvent.click(deleteMenuItem);

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    expect(mockHandleDelete).toHaveBeenCalledWith(mockData._id);
  });
});
