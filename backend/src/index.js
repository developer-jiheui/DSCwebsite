const express = require("express");
const connectDB = require("../config/db");

const app = express();

// Connection with database:
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from Express.js");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server up and running on port ${PORT}`);
});
