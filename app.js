const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "School Management API is running" });
});

app.use("/", schoolRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});