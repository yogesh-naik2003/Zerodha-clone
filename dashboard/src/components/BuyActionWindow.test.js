import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BuyActionWindow from "./BuyActionWindow";
import GeneralContext from "./GeneralContext";
import api from "../api";

jest.mock("../api", () => ({
  post: jest.fn(),
}));

test("places a buy order with selected stock values", async () => {
  const closeBuyWindow = jest.fn();
  api.post.mockResolvedValue({ data: { message: "Order saved!" } });

  render(
    <GeneralContext.Provider value={{ closeBuyWindow }}>
      <BuyActionWindow mode="BUY" stock={{ name: "INFY", price: 1555.45 }} />
    </GeneralContext.Provider>
  );

  fireEvent.change(screen.getAllByRole("spinbutton")[0], {
    target: { value: "2" },
  });
  fireEvent.click(screen.getByRole("button", { name: /^buy$/i }));

  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith("/newOrder", {
      name: "INFY",
      qty: 2,
      price: 1555.45,
      mode: "BUY",
    });
    expect(closeBuyWindow).toHaveBeenCalled();
  });
});
