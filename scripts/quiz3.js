
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");

  // Get category ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedId = urlParams.get("id");

  let questions = [];
  let currentIndex = 0;

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

  // If no more questions, show completion message
  if (currentIndex >= questions.length) {
    questionEl.textContent = "🎉 Quiz Complete!";
    optionsEl.innerHTML = "";
    return;
  }

  const current = questions[currentIndex];
  const options = current.Possible || current.options || [];

  // Show the current question
  questionEl.textContent = current.Question;

  // Clear previous options
  optionsEl.innerHTML = "";

  // Create buttons for answer options
  options.forEach(option => {
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
  } else {
    msg.textContent = `❌ Wrong! Correct answer: ${correct}`;
  }

  currentIndex++;

  setTimeout(showQuestion, 1700);
 }

 document.addEventListener("DOMContentLoaded", () => {
   // Show the first question when the page loads
   showQuestion();
})