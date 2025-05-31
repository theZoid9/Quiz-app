window.onload = function () {
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
      questions = data.filter(q => q["data-id"] === selectedId);
      showQuestion();
    });

  function showQuestion() {
    // If no more questions, show completion message
    if (currentIndex >= questions.length) {
      questionEl.textContent = "🎉 Quiz Complete!";
      optionsEl.innerHTML = "";
      return;
    }

    const current = questions[currentIndex];
    // Use 'Possible' or 'options' key for answer choices
    const options = current.Possible || current.options || [];

    // Show question text
    questionEl.textContent = current.Question;

    // Clear previous options
    optionsEl.innerHTML = "";

    // Create a button for each answer option
    options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.className = "option-btn";
      btn.onclick = () => handleAnswer(option, current.answer);
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selected, correct) {
    alert(selected === correct ? "✅ Correct!" : `❌ Wrong! Correct answer: ${correct}`);
    currentIndex++;
    showQuestion();
  }
};