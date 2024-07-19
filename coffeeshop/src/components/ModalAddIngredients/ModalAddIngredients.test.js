import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalAddIngredients from "./ModalAddIngredients";

describe("ModalAddIngredients", () => {
  const mockHandleClose = jest.fn();
  const mockHandleSubmit = jest.fn();

  const renderComponent = (open = true) => {
    render(
      <ModalAddIngredients
        open={open}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal when open is true", () => {
    renderComponent();
    expect(screen.getByText("Add New Ingredient")).toBeInTheDocument();
  });

  test("does not render modal when open is false", () => {
    renderComponent(false);
    expect(screen.queryByText("Add New Ingredient")).not.toBeInTheDocument();
  });

  test("calls handleClose when close button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("CloseIcon"));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("renders all input fields", () => {
    renderComponent();
    expect(
      screen.getByRole("textbox", { name: /ingredient name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /quantity/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /unit/i })).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /price/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/storage date/i)).toBeInTheDocument();
  });

  test("calls handleSubmit when form is submitted", () => {
    renderComponent();
    fireEvent.submit(screen.getByRole("form"));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("input fields have correct attributes", () => {
    renderComponent();
    expect(
      screen.getByRole("textbox", { name: /ingredient name/i })
    ).toBeRequired();
    expect(
      screen.getByRole("spinbutton", { name: /quantity/i })
    ).toHaveAttribute("type", "number");
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toHaveAttribute("rows", "3");
    expect(screen.getByRole("textbox", { name: /unit/i })).toBeRequired();
    expect(screen.getByRole("spinbutton", { name: /price/i })).toHaveAttribute(
      "type",
      "number"
    );
    expect(screen.getByLabelText(/expiry date/i)).toHaveAttribute(
      "type",
      "date"
    );
    expect(screen.getByLabelText(/storage date/i)).toHaveAttribute(
      "type",
      "date"
    );
  });

  test("submit button is present", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("form can be filled out", () => {
    renderComponent();
    fireEvent.change(
      screen.getByRole("textbox", { name: /ingredient name/i }),
      { target: { value: "Sugar" } }
    );
    fireEvent.change(screen.getByRole("spinbutton", { name: /quantity/i }), {
      target: { value: "500" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /description/i }), {
      target: { value: "Store in a cool, dry place" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /unit/i }), {
      target: { value: "grams" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: /price/i }), {
      target: { value: "2.50" },
    });
    fireEvent.change(screen.getByLabelText(/expiry date/i), {
      target: { value: "2023-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/storage date/i), {
      target: { value: "2023-06-01" },
    });

    expect(
      screen.getByRole("textbox", { name: /ingredient name/i })
    ).toHaveValue("Sugar");
    expect(screen.getByRole("spinbutton", { name: /quantity/i })).toHaveValue(
      500
    );
    expect(screen.getByRole("textbox", { name: /description/i })).toHaveValue(
      "Store in a cool, dry place"
    );
    expect(screen.getByRole("textbox", { name: /unit/i })).toHaveValue("grams");
    expect(screen.getByRole("spinbutton", { name: /price/i })).toHaveValue(2.5);
    expect(screen.getByLabelText(/expiry date/i)).toHaveValue("2023-12-31");
    expect(screen.getByLabelText(/storage date/i)).toHaveValue("2023-06-01");
  });
});
