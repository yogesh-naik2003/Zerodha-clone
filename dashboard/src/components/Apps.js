import React from "react";

const Apps = () => {
  return (
    <>
      <h3 className="title">Apps</h3>
      <div className="apps-grid">
        <div className="app-card">
          <h4>Console</h4>
          <p>Reports, tax P&amp;L, contract notes, and account settings.</p>
          <button type="button" className="btn btn-blue">
            Open Console
          </button>
        </div>
        <div className="app-card">
          <h4>Coin</h4>
          <p>Mutual fund investments and portfolio tracking.</p>
          <button type="button" className="btn btn-blue">
            Open Coin
          </button>
        </div>
        <div className="app-card">
          <h4>Kite Connect</h4>
          <p>API access for building trading and analytics tools.</p>
          <button type="button" className="btn btn-blue">
            View API
          </button>
        </div>
      </div>
    </>
  );
};

export default Apps;
