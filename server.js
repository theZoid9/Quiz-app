import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Serve static files (CSS, JS, images)
const dataPath = path.join(__dirname, 'data.json');


// API route that reads data.json
app.get('/api/questions/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataPath, 'utf8', (err, file) => {
    if (err) return res.status(500).json({ error: 'Failed to read questions' });
    const all = JSON.parse(file);
    const questions = all.filter(q => q['data-id'].toString() === id);
    res.json({ quizId: id, questions });
  });
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'project-root', 'index.html'));
});
app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'project-root', 'quiz.html'));
});
app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'project-root', 'categories.html'));
});

// 404 handler
app.use((req, res) => res.status(404).send('Page not found'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));