import React, { useContext, useState } from "react";
import GeneralContext from "./GeneralContext";
import api from "../api";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ stock, mode = "BUY" }) => {
  const generalContext = useContext(GeneralContext);
  const stockName = stock?.name || "";
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(stock?.price || 0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderClick = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      await api.post("/newOrder", {
        name: stockName,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode,
      });

      generalContext.closeBuyWindow();
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response) {
        setError("Order could not be placed. Please try again.");
      } else {
        setError("Order could not be placed because the backend is not reachable.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h3 className="order-window-title">
          {mode} {stockName}
        </h3>
        {error && <p className="api-error">{error}</p>}
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              min="0.05"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required Rs. 140.65</span>
        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleOrderClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing..." : mode}
          </button>
          <button type="button" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
