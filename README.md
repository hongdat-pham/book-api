# 📚 Book API

A simple REST API to manage your reading list, built with **Node.js** and **Express.js** .

## Tech Stack

- Node.js (ESM)
- Express.js
- File-based storage (JSON)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/hongdat-pham/book-api.git
cd book-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
PORT=3000
NODE_ENV=development
APP_NAME=Book API
```

### 4. Run the server

```bash
npm start
```

Server will be running at `http://localhost:3000`

---

## API Endpoints

### General

| Method | URL | Description                      |
| ------ | --- | -------------------------------- |
| GET    | `/` | API info and available endpoints |

### Books

| Method | URL                     | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/books`                | Get all books          |
| GET    | `/books?status=reading` | Filter books by status |
| POST   | `/books`                | Add a new book         |
| GET    | `/books/:id`            | Get a single book      |
| PATCH  | `/books/:id`            | Update a book          |
| DELETE | `/books/:id`            | Delete a book          |

---

## Book Object

```json
{
  "id": 1700000000000,
  "title": "The Pragmatic Programmer",
  "author": "David Thomas",
  "status": "reading",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Status values:** `reading` | `done` | `wishlist`

---

## Example Requests

### Add a book

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean Code", "author": "Robert C. Martin"}'
```

Response `201`:

```json
{
  "id": 1700000000000,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "status": "reading",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Get all books

```bash
curl http://localhost:3000/books
```

### Filter by status

```bash
curl http://localhost:3000/books?status=done
```

### Update a book

```bash
curl -X PATCH http://localhost:3000/books/1700000000000 \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'
```

### Delete a book

```bash
curl -X DELETE http://localhost:3000/books/1700000000000
```

Response: `204 No Content`

---

## Project Structure

```
book-api/
├── src/
│   ├── app.js          # Express app setup
│   ├── server.js       # Start server
│   ├── config.js       # Environment config
│   ├── db.js           # File-based data store
│   └── routers/
│       └── books.js    # Books routes
├── data/
│   └── books.json      # Data storage
├── .env                # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## Error Responses

| Status | Meaning                                   |
| ------ | ----------------------------------------- |
| 400    | Missing required fields (title or author) |
| 404    | Book not found                            |
| 500    | Internal server error                     |
