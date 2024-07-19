import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal2 from "./modal.jsx";

describe("Modal2 Component", () => {
  const mockHandleAddDrink = jest.fn();

  const mockData = {
    Name: "Mock Drink",
    Description: "This is a mock drink",
    Price: "10",
    Photo: new File(["mock-image.png"], "mock-image.png", {
      type: "image/png",
    }),
    LoaiDoUong: "Coffee",
  };

  test("calls handleAddDrink with correct data when Add button is clicked", () => {
    render(
      <Modal2
        open={true}
        onClose={() => {}}
        handleAddDrink={mockHandleAddDrink}
      />
    ); 
    const nameInput = screen.getByRole("textbox", { name: /Drink Name/i });
    fireEvent.change(nameInput, { target: { value: mockData.Name } });

    const descriptionInput = screen.getByRole("textbox", {
      name: /Description/i,
    });
    fireEvent.change(descriptionInput, {
      target: { value: mockData.Description },
    });

    const priceInput = screen.getByRole("textbox", { name: /Drink Price/i });
    fireEvent.change(priceInput, { target: { value: mockData.Price } });

    const fileInput = screen.getByRole("button", { name: /Choose file/i });
    fireEvent.change(fileInput, { target: { files: [mockData.Photo] } });

    const typeSelect = screen.getByRole("combobox", { name: /Type/i });
    fireEvent.select(typeSelect, { target: { value: mockData.LoaiDoUong } });
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.click(addButton);

    expect(mockHandleAddDrink).toHaveBeenCalledTimes(1);
    expect(mockHandleAddDrink).toHaveBeenCalledWith({
      Name: "",
      Description: "",
      Price: "",
      Photo: null,
      LoaiDoUong: "",
    });
  });
});
