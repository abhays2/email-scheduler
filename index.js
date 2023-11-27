require("dotenv").config();
const express = require("express");
const emailRoutes = require("./src/routes/emailRoutes");
const webhookRoutes = require("./src/routes/webhookRoutes");

const app = express();

app.use(express.json());
app.use("/api/v1", emailRoutes);
app.use("/mandrill", webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
