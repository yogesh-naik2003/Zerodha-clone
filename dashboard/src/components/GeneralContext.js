import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (stock, mode) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState({ name: "", price: 0 });
  const [orderMode, setOrderMode] = useState("BUY");

  const handleOpenBuyWindow = (stock, mode = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStock(stock);
    setOrderMode(mode);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStock({ name: "", price: 0 });
    setOrderMode("BUY");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow mode={orderMode} stock={selectedStock} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
