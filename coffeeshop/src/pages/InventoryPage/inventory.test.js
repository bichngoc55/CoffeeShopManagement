import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // Add this line if not using a setup file
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Inventory from "./Inventory";

// Mock the DashBoard component
jest.mock("../../components/dashBoard/dashBoard", () => {
  return function DummyDashBoard() {
    return <div data-testid="dashboard">Dashboard</div>;
  };
});

// Mock the redux store
const mockStore = configureStore([]);

describe("Inventory Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auths: {
        token: "mock-token",
        user: { Name: "Test User" },
      },
    });

    // Mock fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
  });

  test("renders Inventory component", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Inventory />
        </Provider>
      );
    });

    await waitFor(() => {
      // Check if the main header is rendered
      expect(
        screen.getByText("Màn Hình Nhập Kho/Nguyên Liệu")
      ).toBeInTheDocument();

      // Check if table headers are rendered
      expect(screen.getByText("Tên Nguyên Liệu")).toBeInTheDocument();
      expect(screen.getByText("Số Lượng")).toBeInTheDocument();
      expect(screen.getByText("Miêu Tả Bảo Quản")).toBeInTheDocument();
      expect(screen.getByText("Đơn vị")).toBeInTheDocument();
      expect(screen.getByText("Giá tiền")).toBeInTheDocument();
      expect(screen.getByText("Nhân Viên")).toBeInTheDocument();
      expect(screen.getByText("Ngày Nhập")).toBeInTheDocument();
      expect(screen.getByText("Ngày Hết Hạn")).toBeInTheDocument();
      expect(screen.getByText("Options")).toBeInTheDocument();
    });
  });
});
