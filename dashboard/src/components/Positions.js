import React, { useCallback, useEffect, useState } from "react";

import api from "../api";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadPositions = useCallback(() => {
    setIsLoading(true);
    setError("");

    api
      .get("/allPositions")
      .then((res) => {
        setAllPositions(Array.isArray(res.data) ? res.data : []);
        setError("");
      })
      .catch(() => {
        setAllPositions([]);
        setError("Positions could not be loaded because the backend is not reachable.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadPositions();
  }, [loadPositions]);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>
      {isLoading && <p className="empty-state">Loading positions...</p>}
      {error && (
        <div className="inline-status">
          <p className="api-error">{error}</p>
          <button type="button" className="btn btn-blue" onClick={loadPositions}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && allPositions.length === 0 && (
        <p className="empty-state">
          No positions yet. Buy a stock from the watchlist to create one.
        </p>
      )}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);
              const curValue = price * qty;
              const isProfit = curValue - avg * qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || stock.name || index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td className={profClass}>{(curValue - avg * qty).toFixed(2)}</td>
                  <td className={dayClass}>{stock.day || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
