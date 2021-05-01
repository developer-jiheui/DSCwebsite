const express = require("express");
const connectDB = require("../config/db");
const cors = require('cors');

const app = express();
app.use(express.json({ extended: false }));
app.use(cors({
  origin: 'http:://localhost:3000'
}));

// Connection with database:
connectDB();

// Routes:
app.use("/login", require("./routes/login"));
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/posts", require("./routes/posts"));

app.get("/", (req, res) => {
  res.send("Hello from Express.js");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server up and running on port ${PORT}`);
});
