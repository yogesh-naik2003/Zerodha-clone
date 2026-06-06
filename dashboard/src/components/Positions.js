import React, { useEffect, useState } from "react";

import { positions } from "../data/data";
import api from "../api";

const Positions = () => {
  const [allPositions, setAllPositions] = useState(positions);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/allPositions")
      .then((res) => {
        if (res.data.length === 0) {
          setAllPositions(positions);
          setError("Showing demo positions because no positions are saved yet.");
          return;
        }

        setAllPositions(res.data);
        setError("");
      })
      .catch(() => {
        setAllPositions(positions);
        setError("Showing demo positions because the backend is not reachable.");
      });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>
      {error && <p className="api-error">{error}</p>}

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
