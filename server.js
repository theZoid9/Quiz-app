import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use(helmet());

// Logging
app.use(morgan('combined'));

// Compress responses
app.use(compression());

// Serve static files
app.use(express.static(path.join(process.cwd(), 'public'), { maxAge: '1d' }));

// API route example
app.get('/api/questions/:id', (req, res) => {
  const id = req.params.id;
  // Here you would normally fetch from DB
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