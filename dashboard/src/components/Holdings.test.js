import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Holdings from "./Holdings";
import api from "../api";

jest.mock("../api", () => ({
  get: jest.fn(),
}));

jest.mock("./VerticalGraph", () => ({
  VerticalGraph: () => <div data-testid="holdings-chart" />,
}));

test("renders holdings returned by the backend", async () => {
  api.get.mockResolvedValue({
    data: [
      {
        _id: "holding-1",
        name: "INFY",
        qty: 2,
        avg: 100,
        price: 120,
        net: "20.00%",
        day: "1.00%",
      },
    ],
  });

  render(<Holdings />);

  expect(screen.getByText(/loading holdings/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("INFY")).toBeInTheDocument();
    expect(screen.getAllByText("240.00").length).toBeGreaterThan(0);
    expect(screen.getByTestId("holdings-chart")).toBeInTheDocument();
  });
});
