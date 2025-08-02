
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");

  // Get category ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedId = urlParams.get("id");

  let questions = [];
  let currentIndex = 0;
  let correctCount = 0; // Initialize score counter

  // Load all questions from JSON
  fetch("../data.json")
    .then(res => res.json())
    .then(data => {
      // Filter questions by category ID (data-id)
      questions = data.filter(question  => question ["data-id"] === selectedId);
      showQuestion();
      
    });

function showQuestion() {
  const msg = document.getElementById("output");

  // Clear the feedback message when showing a new question
  msg.textContent = "";

  // Shuffle questions if starting a new quiz
  if (currentIndex === 0 && questions.length > 0) {
    questions = [...questions].sort(() => Math.random() - 0.5);
  }

  if (currentIndex >= questions.length) {
    questionEl.textContent = "🎉 Quiz Complete!";
    showEndButtons();
    return;
  }

  const current = questions[currentIndex];
  const options = current.Possible || current.options || [];

  // Shuffle options array
  const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

  // Show the current question
  questionEl.textContent = current.Question;

  optionsEl.innerHTML = "";

  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => handleAnswer(option, current.answer);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(selected, correct) {
  const msg = document.getElementById("output");

  if (selected === correct) {
    msg.textContent = "✅ Correct!";
    correctCount++; // Increment score
  } else {
    msg.textContent = `❌ Wrong! Correct answer: ${correct}`;
  }

  currentIndex++;

  setTimeout(showQuestion, 1700);
 }


 function showEndButtons() {
  // Clear previous buttons if any
  optionsEl.innerHTML = "";

  // Create Restart Quiz button
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.className = "control-btn";
  restartBtn.onclick = () => {
    currentIndex = 0;
       correctCount = 0; // Reset score
    showQuestion();
  };

  // Create View Scores button (if you’re tracking score)
  const viewScoresBtn = document.createElement("button");
  viewScoresBtn.textContent = "View Scores";
  viewScoresBtn.className = "control-btn";
  viewScoresBtn.onclick = () => {
    const msg = document.getElementById("output");
    msg.textContent = `You answered ${correctCount} out of ${questions.length} questions.`;
  };

  // Append buttons
  optionsEl.appendChild(restartBtn);
  optionsEl.appendChild(viewScoresBtn);
}

 document.addEventListener("DOMContentLoaded", () => {

   showQuestion();
})