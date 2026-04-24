import express from "express";
import config from "./config.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    name: config.appName,
    version: "1.0.0",
    endpoints: ["/books"],
  });
});

export default app;
