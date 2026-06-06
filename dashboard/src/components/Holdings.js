import React, { useCallback, useState, useEffect } from "react";
import { VerticalGraph } from "./VerticalGraph";
import api from "../api";
import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState(holdings);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadHoldings = useCallback(() => {
    setIsLoading(true);
    setError("");

    api
      .get("/allHoldings")
      .then((res) => {
        if (res.data.length === 0) {
          setAllHoldings(holdings);
          setError("Showing demo holdings because no holdings are saved yet.");
          return;
        }

        setAllHoldings(res.data);
        setError("");
      })
      .catch(() => {
        setAllHoldings(holdings);
        setError("Showing demo holdings because the backend is not reachable.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadHoldings();
  }, [loadHoldings]);

  const formatNumber = (value) => Number(value || 0).toFixed(2);
  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );
  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );
  const totalPnl = currentValue - totalInvestment;
  const totalPnlPercent = totalInvestment ? (totalPnl / totalInvestment) * 100 : 0;

  const labels = allHoldings.map((subArray) => subArray.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price || 0)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      {isLoading && <p className="empty-state">Loading holdings...</p>}
      {error && (
        <div className="inline-status">
          <p className="api-error">{error}</p>
          <button type="button" className="btn btn-blue" onClick={loadHoldings}>
            Retry
          </button>
        </div>
      )}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);
              const curValue = price * qty;
              const isProfit = curValue - avg * qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || stock.name || index}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{formatNumber(avg)}</td>
                  <td>{formatNumber(price)}</td>
                  <td>{formatNumber(curValue)}</td>
                  <td className={profClass}>{formatNumber(curValue - avg * qty)}</td>
                  <td className={profClass}>{stock.net || "-"}</td>
                  <td className={dayClass}>{stock.day || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{formatNumber(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{formatNumber(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {formatNumber(totalPnl)} ({totalPnlPercent.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
