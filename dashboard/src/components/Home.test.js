import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import api from "../api";

jest.mock("../api", () => ({
  post: jest.fn(),
}));

jest.mock("./TopBar", () => () => <div>TopBar</div>);
jest.mock("./Dashboard", () => () => <div>Dashboard</div>);

test("clears token and shows redirect message when session is invalid", async () => {
  jest.useFakeTimers();
  jest.spyOn(console, "error").mockImplementation(() => {});
  localStorage.setItem("token", "expired-token");
  api.post.mockRejectedValue(new Error("Unauthorized"));

  render(<Home />);

  await waitFor(() => {
    expect(localStorage.getItem("token")).toBeNull();
    expect(screen.getByText(/session expired/i)).toBeInTheDocument();
  });

  jest.clearAllTimers();
  console.error.mockRestore();
  jest.useRealTimers();
});
