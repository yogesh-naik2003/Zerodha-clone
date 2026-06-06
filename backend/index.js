require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const authRoute = require("./routes/AuthRoute");
const { authenticateUser } = require("./middlewares/AuthMiddleware");
const { validateOrderInput } = require("./utils/orderValidation");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", authRoute);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", authenticateUser, async (req, res) => {
  const allHoldings = await HoldingsModel.find({ userId: req.user._id }).sort({
    name: 1,
  });
  res.json(allHoldings);
});

app.get("/allPositions", authenticateUser, async (req, res) => {
  let allPositions = await PositionsModel.find({ userId: req.user._id }).sort({
    name: 1,
  });
  res.json(allPositions);
});

app.get("/allOrders", authenticateUser, async (req, res) => {
  let allOrders = await OrdersModel.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(allOrders);
});

app.post("/newOrder", authenticateUser, async (req, res) => {
  try {
    const { errors, value } = validateOrderInput(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const existingHolding = await HoldingsModel.findOne({
      userId: req.user._id,
      name: value.name,
    });

    if (value.mode === "SELL") {
      if (!existingHolding || existingHolding.qty < value.qty) {
        return res
          .status(400)
          .json({ message: "Not enough quantity available to sell." });
      }

      existingHolding.qty -= value.qty;
      existingHolding.price = value.price;
      existingHolding.day = "0.00%";

      if (existingHolding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: existingHolding._id });
      } else {
        await existingHolding.save();
      }
    }

    if (value.mode === "BUY") {
      if (existingHolding) {
        const oldInvestment = existingHolding.avg * existingHolding.qty;
        const newInvestment = value.price * value.qty;
        const nextQty = existingHolding.qty + value.qty;

        existingHolding.qty = nextQty;
        existingHolding.avg = (oldInvestment + newInvestment) / nextQty;
        existingHolding.price = value.price;
        existingHolding.net = "0.00%";
        existingHolding.day = "0.00%";
        await existingHolding.save();
      } else {
        await HoldingsModel.create({
          userId: req.user._id,
          name: value.name,
          qty: value.qty,
          avg: value.price,
          price: value.price,
          net: "0.00%",
          day: "0.00%",
        });
      }
    }

    let newOrder = new OrdersModel({
      userId: req.user._id,
      name: value.name,
      qty: value.qty,
      price: value.price,
      mode: value.mode,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order saved!", order: newOrder });
  } catch (err) {
    console.error("Order save failed:", err);
    res.status(500).json({ message: "Order could not be saved." });
  }
});

const startServer = async () => {
  try {
    if (!uri) {
      throw new Error("MONGO_URL is not configured.");
    }

    await mongoose.connect(uri);
    console.log("DB started!");

    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}!`);
    });
  } catch (err) {
    console.error("Failed to start backend:", err.message);
    process.exit(1);
  }
};

startServer();
