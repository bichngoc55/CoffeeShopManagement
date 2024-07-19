import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InventoryRow from "./InventoryRow"; // Assuming the component is in the same directory

describe("InventoryRow Component", () => {
  const mockData = {
    _id: "1",
    name: "Ingredient 1",
    quantity: 10,
    BaoQuan: "Cool and dry place",
    unit: "kg",
    price: 20,
    StaffName: "Test User",
    NgayNhapKho: "2023-10-26T00:00:00.000Z",
    ExpiryDate: "2023-11-26T00:00:00.000Z",
  };
  const mockHandleEdit = jest.fn();

  test("modifies ingredient data and calls handleEdit on save", () => {
    render(
      <InventoryRow
        data={mockData}
        isEditing={false}
        setEditingId={() => {}}
        handleEdit={mockHandleEdit}
        handleDelete={() => {}}
      />
    );

    // 1. Enter Edit Mode
    const editButton = screen.getByRole("button", { name: /Edit ingredient/i });
    fireEvent.click(editButton);

    // 2. Find the input field (it's now visible)
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    fireEvent.change(nameInput, { target: { value: "Modified Ingredient" } });

    // 3. Save Changes
    fireEvent.click(editButton);

    // Assertions
    expect(mockHandleEdit).toHaveBeenCalledTimes(1);
    expect(mockHandleEdit).toHaveBeenCalledWith("1", {
      ...mockData,
      name: "Modified Ingredient",
    });
  });
  const mockHandleDelete = jest.fn();

  test("calls handleDelete when delete button is clicked", () => {
    render(
      <InventoryRow
        data={mockData}
        isEditing={false}
        setEditingId={() => {}}
        handleEdit={() => {}}
        handleDelete={mockHandleDelete}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /delete ingredient/i,
    });
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    expect(mockHandleDelete).toHaveBeenCalledWith(mockData._id);
  });
});
