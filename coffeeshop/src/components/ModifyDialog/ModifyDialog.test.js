import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ModifyDialog from "./ModifyDialog.jsx";
import "@testing-library/jest-dom";
import { act } from "react";
describe("ModifyDialog Component", () => {
  const mockDrink = {
    Name: "Espresso",
    Price: 2.5,
    LoaiDoUong: "Coffee",
    Description: "Strong coffee",
  };

  const mockOnClose = jest.fn();
  const mockHandleUpdateChange = jest.fn();

  beforeEach(() => {
    render(
      <ModifyDialog
        onClose={mockOnClose}
        drink={mockDrink}
        handleUpdateChange={mockHandleUpdateChange}
      />
    );
  });

  test("renders with correct initial values", () => {
    expect(screen.getByLabelText("Drink Name")).toHaveValue("Espresso");
    expect(screen.getByLabelText("Price")).toHaveValue(2.5);
    expect(screen.getByLabelText("Description")).toHaveValue("Strong coffee");

    expect(screen.getByLabelText("Drink Type")).toHaveTextContent("Coffee");
  });

  test("updates state when input changes", () => {
    fireEvent.change(screen.getByLabelText("Drink Name"), {
      target: { value: "Latte" },
    });
    expect(screen.getByLabelText("Drink Name")).toHaveValue("Latte");
  });

  test("calls handleUpdateChange with modified drink when Save Changes is clicked", () => {
    fireEvent.change(screen.getByLabelText("Drink Name"), {
      target: { value: "Latte" },
    });
    fireEvent.click(screen.getByText("Save Changes"));
    expect(mockHandleUpdateChange).toHaveBeenCalledWith(
      expect.objectContaining({ Name: "Latte" })
    );
  });

  test("calls onClose when close button is clicked", () => {
    fireEvent.click(screen.getByTestId("CloseIcon"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
