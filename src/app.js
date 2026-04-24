import express from "express";
import config from "./config.js";
import booksRouter from "./routers/books.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    name: config.appName,
    version: "1.0.0",
    endpoints: ["/books"],
  });
});
app.use("/books", booksRouter);
export default app;
