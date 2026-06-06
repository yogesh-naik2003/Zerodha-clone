const test = require("node:test");
const assert = require("node:assert/strict");

const { validateOrderInput } = require("../utils/orderValidation");

test("accepts a valid buy order", () => {
  const result = validateOrderInput({
    name: " infy ",
    qty: "2",
    price: "1500.50",
    mode: "buy",
  });

  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.value, {
    name: "INFY",
    qty: 2,
    price: 1500.5,
    mode: "BUY",
  });
});

test("rejects invalid order fields", () => {
  const result = validateOrderInput({
    name: "",
    qty: 0,
    price: -1,
    mode: "HOLD",
  });

  assert.equal(result.errors.length, 4);
});
