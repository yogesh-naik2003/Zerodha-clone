import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import api from "../../api";

jest.mock("../../api", () => ({
  post: jest.fn(),
}));

jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  }),
  { virtual: true }
);

describe("auth form submissions", () => {
  beforeEach(() => {
    api.post.mockReset();
    localStorage.clear();
  });

  test("stores token after successful login", async () => {
    api.post.mockResolvedValue({
      data: {
        success: true,
        message: "Logged in",
        token: "login-token",
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { name: "email", value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { name: "password", value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/login", {
        email: "user@example.com",
        password: "password123",
      });
      expect(localStorage.getItem("token")).toBe("login-token");
    });
  });

  test("stores token after successful signup", async () => {
    api.post.mockResolvedValue({
      data: {
        success: true,
        message: "Signed up",
        token: "signup-token",
      },
    });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { name: "email", value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { name: "username", value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { name: "password", value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/signup", {
        email: "new@example.com",
        username: "newuser",
        password: "password123",
      });
      expect(localStorage.getItem("token")).toBe("signup-token");
    });
  });
});
