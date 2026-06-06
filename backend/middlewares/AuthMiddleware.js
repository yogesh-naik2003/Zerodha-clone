const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../model/UserModel");

module.exports.userVerification = (req, res) => {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";
  const token = req.cookies.token || bearerToken;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    }

    const user = await User.findById(data.id);

    if (user) {
      return res.json({ status: true, user: user.username, email: user.email });
    }

    return res.json({ status: false });
  });
};
