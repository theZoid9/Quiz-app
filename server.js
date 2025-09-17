import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;

//✅ Serve all static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Fallback route to serve index.html (or quiz.html) for unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'project-root', 'index.html'));
});



// API route example
app.get('/api/questions/:id', (req, res) => {
  const id = req.params.id;
  res.json({ quizId: id, questions: [] });
});

// Catch-all for unknown routes
app.use((req, res) => res.status(404).send('Page not found'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));