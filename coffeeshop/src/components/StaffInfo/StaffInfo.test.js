import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import StaffInfoComponent from "./StaffInfo.jsx";
import { updateUser } from "../../services/updateUserService";
import axios from "axios";

// Mock the dependencies
jest.mock("../../services/updateUserService");
jest.mock("axios");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
})); 
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);

describe("StaffInfoComponent", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auths: {
        user: {
          _id: "123",
          Name: "John Doe",
          Position: "staff",
          email: "john@example.com",
          Phone: "1234567890",
          dateOfBirth: "1990-01-01",
          location: "New York",
          gender: "nam",
          Ava: "avatar.jpg",
        },
      },
    });

    jest
      .spyOn(React, "useState")
      .mockImplementation(jest.requireActual("react").useState);
  });

  test("renders StaffInfoComponent correctly", () => {
    render(
      <Provider store={store}>
        <StaffInfoComponent />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your phone number")
    ).toBeInTheDocument();
  });

  test("updates user information when form is submitted", async () => {
    updateUser.mockResolvedValue({ success: true });

    render(
      <Provider store={store}>
        <StaffInfoComponent />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.click(screen.getByText("Lưu thay đổi"));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith(
        expect.objectContaining({
          Name: "Jane Doe",
          email: "jane@example.com",
        }),
        "123",
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  test("shows error messages for empty required fields", async () => {
    render(
      <Provider store={store}>
        <StaffInfoComponent />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Lưu thay đổi"));

    await waitFor(() => {
      expect(screen.getByText("*Please fill out the name")).toBeInTheDocument();
      expect(
        screen.getByText("*Please fill out the email")
      ).toBeInTheDocument();
    });
  });

  test("uploads new avatar when image is changed", async () => {
    axios.post.mockResolvedValue({ data: { url: "new-avatar.jpg" } });
    updateUser.mockResolvedValue({ success: true });

    render(
      <Provider store={store}>
        <StaffInfoComponent />
      </Provider>
    );

    const file = new File(["avatar"], "avatar.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Upload file");

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(screen.getByText("Lưu thay đổi"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://api.cloudinary.com/v1_1/dzdso60ms/image/upload",
        expect.any(FormData),
        expect.any(Object)
      );
      expect(updateUser).toHaveBeenCalledWith(
        expect.objectContaining({
          Ava: "new-avatar.jpg",
        }),
        "123",
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  test("resets form to initial values when cancel button is clicked", () => {
    render(
      <Provider store={store}>
        <StaffInfoComponent />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.click(screen.getByText("Hủy thay đổi"));

    expect(screen.getByPlaceholderText("Enter your username")).toHaveValue(
      "John Doe"
    );
  });
});
