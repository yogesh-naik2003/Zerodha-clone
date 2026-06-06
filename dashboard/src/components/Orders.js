import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = useCallback(() => {
    setIsLoading(true);
    setError("");

    api
      .get("/allOrders")
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
        setError("");
      })
      .catch(() => {
        setOrders([]);
        setError("Orders could not be loaded because the backend is not reachable.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (isLoading) {
    return <p className="empty-state">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          {error && <p className="api-error">{error}</p>}
          {error && (
            <button type="button" className="btn btn-blue" onClick={loadOrders}>
              Retry
            </button>
          )}
          <p>You haven't placed any orders today</p>

          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      {error && (
        <>
          <p className="api-error">{error}</p>
          <button type="button" className="btn btn-blue" onClick={loadOrders}>
            Retry
          </button>
        </>
      )}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <p>{order.mode || "BUY"}</p>
                </td>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{Number(order.price || 0).toFixed(2)}</td>
                <td>Completed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
