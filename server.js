import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

// -----------------------------------------------------
// STATIC FILES
// -----------------------------------------------------

// Serve everything in /src/public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "src", "public")));

// Expose /src/data/data.json at /data/data.json
app.use("/data", express.static(path.join(__dirname, "src", "data")));

// Serve src folder too (so quiz.js is reachable)
app.use("/src", express.static(path.join(__dirname, "src")));
app.use(cors({ origin: 'https://quiz-app-1-3614.onrender.com' }));
// -----------------------------------------------------
// API ROUTE FOR FILTERED QUESTIONS
// -----------------------------------------------------
const dataPath = path.join(__dirname, "src", "data", "data.json");

app.get("/api/questions/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(dataPath, "utf8", (err, file) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read questions" });
    }

    const all = JSON.parse(file);
    const filtered = all.filter(q => q["data-id"].toString() === id);

    res.json({ quizId: id, questions: filtered });
  });
});


// -----------------------------------------------------
// HTML ROUTES
// -----------------------------------------------------

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public", "index.html"));
});

app.get("/categories", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public", "categories.html"));
});

app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public", "quiz.html"));
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public", "result.html"));
});


// -----------------------------------------------------
// 404
// -----------------------------------------------------

app.use((req, res) => res.status(404).send("Page not found"));


// -----------------------------------------------------

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
