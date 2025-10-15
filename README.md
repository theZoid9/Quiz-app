# Quiz App

An interactive quiz application built with Express.js, HTML, CSS, and JavaScript.
The app is deployed and running on Render with a custom domain.

## Features

Category-based quizzes powered by a JSON dataset.

Backend API endpoint to serve questions by quiz ID.

Randomized multiple-choice answers for each question.

Score tracking with results displayed at the end of the quiz.

Simple navigation (restart quiz, return to categories, or back to the welcome page).

## Live Demo

The app is live here: https://quiz-app-1-3614.onrender.com

## How It Works

Frontend:
Static HTML pages rendered by the backend.
JavaScript dynamically displays questions, shuffles options, and validates answers.

Backend:

Express.js serves the frontend and quiz API.

API endpoint: /api/questions/:id → Returns quiz questions for a specific category.

CORS enabled to allow frontend and backend communication.

## Future Enhancements

Add a countdown timer per question.

Save high scores across sessions.

Admin panel for adding/editing questions.

Expand with leaderboards and multiplayer support.

## License

This project is licensed under the MIT License.
