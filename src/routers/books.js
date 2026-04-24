import { Router } from "express";
import { readData, writeData } from "../db.js";

const router = Router();
router.get("/", async (req, res) => {
  const books = await readData();
  const { status } = req.query;
  const result = status ? books.filter((t) => t.status === status) : books;
  res.json(result);
});

router.post("/", async (req, res) => {
  const body = req.body;
  if (!body.title) {
    return res.status(400).json({ error: "title is required" });
  }
  if (!body.author) {
    return res.status(400).json({ error: "author is required" });
  }
  const books = await readData();
  const newBook = {
    id: Date.now(),
    title: body.title,
    author: body.author,
    status: "reading",
    createdAt: new Date().toISOString(),
  };
  books.push(newBook);
  await writeData(books);
  res.status(201).json(newBook);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const books = await readData();
  const book = books.find((t) => t.id === id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  res.json(book);
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const books = await readData();
  const book = books.find((t) => t.id === id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  const updated = { ...book, ...req.body, id };
  const newBooks = books.map((t) => (t.id === id ? updated : t));
  await writeData(newBooks);
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const books = await readData();
  const book = books.find((t) => t.id === id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  const newBooks = books.filter((t) => t.id !== id);
  await writeData(newBooks);
  res.status(204).send();
});
export default router;
