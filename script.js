// ✅ Quiz data
const quizData = [
  {
    question: "1. What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    question: "2. Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3,
  },
  {
    question: "3. What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Coded Style Sheets",
      "Computer Style Sheets",
    ],
    answer: 1,
  },
  {
    question: "4. What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None"],
    answer: 1,
  },
  {
    question: "5. Which HTML tag is used for the largest heading?",
    options: ["h6", "heading", "h1", "head"],
    answer: 2,
  },
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// ✅ Get saved progress
function getProgress() {
  const data = sessionStorage.getItem("progress");
  return data ? JSON.parse(data) : {};
}

// ✅ Save progress
function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// ✅ Render questions
function renderQuestions() {
  const progress = getProgress();
  questionsDiv.innerHTML = "";

  quizData.forEach((q, qIndex) => {
    const qDiv = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = q.question;
    qDiv.appendChild(title);

    q.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${qIndex}`;
      radio.value = optIndex;

      // restore checked state
      if (progress[qIndex] == optIndex) {
        radio.checked = true;
      }

      // save on change
      radio.addEventListener("change", () => {
        const updated = getProgress();
        updated[qIndex] = optIndex;
        saveProgress(updated);
      });

      label.appendChild(radio);
      label.append(` ${opt}`);

      qDiv.appendChild(label);
      qDiv.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(qDiv);
  });
}

// ✅ Calculate score
function calculateScore() {
  const progress = getProgress();
  let score = 0;

  quizData.forEach((q, index) => {
    if (progress[index] == q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // save to localStorage
  localStorage.setItem("score", score);
}

// ✅ Restore previous score
function restoreScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
  }
}

// ✅ Submit handler
submitBtn.addEventListener("click", calculateScore);

// ✅ Initial load
renderQuestions();
restoreScore();