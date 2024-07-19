import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddStaffComponent from "./addStaff.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

// Mock the axios module
jest.mock("axios");

// Mock the registerUser function
jest.mock("../../services/registerService", () => ({
  registerUser: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({});

describe("AddStaffComponent", () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddStaffComponent />
        </BrowserRouter>
      </Provider>
    );
  };

  test("renders AddStaffComponent", () => {
    renderComponent();
    expect(screen.getByText("Fullname")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
  });

  test("validates form inputs", async () => {
    renderComponent();
    const addButton = screen.getByText("Thêm");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("*Please pick a image")).toBeInTheDocument();
      expect(screen.getByText("*Please fill out the name")).toBeInTheDocument();
      expect(
        screen.getByText("*Please fill out the email")
      ).toBeInTheDocument();
      expect(
        screen.getByText("*Please fill out the phone number")
      ).toBeInTheDocument();
      expect(
        screen.getByText("*Please fill out the location")
      ).toBeInTheDocument();
      expect(
        screen.getByText("*Please fill out the password at least 8 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("*Please fill out the password confirmation")
      ).toBeInTheDocument();
    });
  });

  test("updates input values", () => {
    renderComponent();
    const nameInput = screen.getByPlaceholderText("Enter full name");
    const emailInput = screen.getByPlaceholderText("Nhập email");
    const phoneInput = screen.getByPlaceholderText("Enter phone number");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(phoneInput.value).toBe("1234567890");
  });

  test("resets form fields when cancel button is clicked", () => {
    renderComponent();
    const nameInput = screen.getByPlaceholderText("Enter full name");
    const cancelButton = screen.getByText("Quay lại");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    fireEvent.click(cancelButton);
    expect(nameInput.value).toBe("");
  });
});
