const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../model/UserModel");

const getAuthToken = (req) => {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";

  return req.cookies.token || bearerToken;
};

const authenticateUser = async (req, res, next) => {
  const token = getAuthToken(req);

  if (!token) {
    return res.status(401).json({ status: false, message: "Authentication required" });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(data.id);

    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid session" });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid or expired session" });
  }
};

const userVerification = async (req, res) => {
  const token = getAuthToken(req);

  if (!token) {
    return res.json({ status: false });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(data.id);

    if (!user) {
      return res.json({ status: false });
    }

    return res.json({ status: true, user: user.username, email: user.email });
  } catch (err) {
    return res.json({ status: false });
  }
};

module.exports = {
  authenticateUser,
  getAuthToken,
  userVerification,
};
