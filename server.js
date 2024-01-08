const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");

const client = require("./configs/database.js");
const { swaggerSpec } = require("./configs/swagger");

const authRoutes = require("./routes/auth.routes.js");
const adminRoutes = require("./routes/admin.routes.js");
const userRoutes = require("./routes/user.routes.js");
const logsRoutes = require("./routes/logs.routes.js");
const imageUploadRoutes = require("./routes/imageUpload.routes");

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API WORK." });
});
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/logs", logsRoutes);
app.use("/image-upload", imageUploadRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await client.connect();
  console.log(`Server is Running On Port ${port}`);
});
