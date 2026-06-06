const test = require("node:test");
const assert = require("node:assert/strict");

const { authenticateUser, getAuthToken } = require("../middlewares/AuthMiddleware");

test("gets bearer token from Authorization header", () => {
  const token = getAuthToken({
    headers: { authorization: "Bearer abc123" },
    cookies: {},
  });

  assert.equal(token, "abc123");
});

test("prefers cookie token over bearer token", () => {
  const token = getAuthToken({
    headers: { authorization: "Bearer abc123" },
    cookies: { token: "cookie-token" },
  });

  assert.equal(token, "cookie-token");
});

test("rejects protected requests without a token", async () => {
  const req = { headers: {}, cookies: {} };
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  let nextCalled = false;

  await authenticateUser(req, res, () => {
    nextCalled = true;
  });

  assert.equal(res.statusCode, 401);
  assert.equal(res.body.status, false);
  assert.equal(nextCalled, false);
});
