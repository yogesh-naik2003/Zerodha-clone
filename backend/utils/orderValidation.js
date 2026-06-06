const VALID_ORDER_MODES = ["BUY", "SELL"];

const validateOrderInput = (body) => {
  const name = String(body.name || "").trim().toUpperCase();
  const qty = Number(body.qty);
  const price = Number(body.price);
  const mode = String(body.mode || "").trim().toUpperCase();
  const errors = [];

  if (!name) {
    errors.push("Stock name is required.");
  }

  if (!Number.isFinite(qty) || qty <= 0) {
    errors.push("Quantity must be greater than 0.");
  }

  if (!Number.isFinite(price) || price <= 0) {
    errors.push("Price must be greater than 0.");
  }

  if (!VALID_ORDER_MODES.includes(mode)) {
    errors.push("Mode must be BUY or SELL.");
  }

  return {
    errors,
    value: {
      name,
      qty,
      price,
      mode,
    },
  };
};

module.exports = {
  VALID_ORDER_MODES,
  validateOrderInput,
};
