// ================= QUIZ DATA =================
const quiz = [
  {
    q: "What does the term quid pro quo mean?",
    o: [
      "A. Helping without expecting anything",
      "B. Something for something",
      "C. Being kind to everyone",
      "D. Working alone"
    ],
    a: 1
  },
  {
    q: "Which sentence best explains quid pro quo?",
    o: [
      "A. Helping without any return",
      "B. Taking without giving",
      "C. Giving something to get something back",
      "D. Ignoring others"
    ],
    a: 2
  },
  {
    q: "Quid pro quo is based on which idea?",
    o: ["A. One-sided help", "B. Exchange", "C. Punishment", "D. Luck"],
    a: 1
  },
  {
    q: "In daily life, quid pro quo can be:",
    o: [
      "A. Always illegal",
      "B. Always harmful",
      "C. Normal and fair",
      "D. Impossible"
    ],
    a: 2
  },
  {
    q: "Which situation is a simple example?",
    o: [
      "A. Donating money secretly",
      "B. Helping a friend and expecting nothing",
      "C. I help you with homework, you help me later",
      "D. Being polite to strangers"
    ],
    a: 2
  },
  {
    q: "What moral value is important in quid pro quo?",
    o: ["A. Greed", "B. Fairness and consent", "C. Fear", "D. Competition"],
    a: 1
  },
  {
    q: "Why is consent important in quid pro quo?",
    o: [
      "A. To make it faster",
      "B. To avoid cheating",
      "C. To ensure fairness and choice",
      "D. To gain power"
    ],
    a: 2
  },
  {
    q: "Which example shows an unfair quid pro quo?",
    o: [
      "A. Two friends sharing notes",
      "B. A teacher forcing favors for marks",
      "C. Helping a classmate study",
      "D. Group project teamwork"
    ],
    a: 1
  },
  {
    q: "Is quid pro quo always wrong?",
    o: [
      "A. Yes, always",
      "B. No, it can be fair if both agree",
      "C. Only in schools",
      "D. Only between friends"
    ],
    a: 1
  },
  {
    q: "When does quid pro quo become unethical?",
    o: [
      "A. When both people are happy",
      "B. When it involves gifts",
      "C. When someone forces another using power",
      "D. When friends help each other"
    ],
    a: 2
  }
];

// ================= VARIABLES =================
let currentIndex = 0;
let score = 0;

// ================= ELEMENTS =================
const questionEl = document.getElementById("question");
const optionsList = document.getElementById("optionsList");
const responseText = document.getElementById("responseText");
const questionCount = document.getElementById("questionCount");
const scoreCount = document.getElementById("scoreCount");
const restartBtn = document.getElementById("restartBtn");

// ================= LOAD QUESTION =================
function loadQuestion() {
  responseText.style.display = "none";
  restartBtn.style.display = "none";

  const current = quiz[currentIndex];

  questionEl.innerText = current.q;
  questionCount.innerText = `Question ${currentIndex + 1} / ${quiz.length}`;
  optionsList.innerHTML = "";

  current.o.forEach((text, index) => {
    const li = document.createElement("li");
    li.className = "quizz-option";
    li.innerText = text;

    li.onclick = () => checkAnswer(li, index);

    optionsList.appendChild(li);
  });
}

// ================= CHECK ANSWER =================
function checkAnswer(selectedOption, selectedIndex) {
  const correctIndex = quiz[currentIndex].a;
  const options = document.querySelectorAll(".quizz-option");

  options.forEach(opt => opt.style.pointerEvents = "none");

  if (selectedIndex === correctIndex) {
    selectedOption.classList.add("correct");
    score++;
    responseText.innerText = "✅ Correct Answer!";
  } else {
    selectedOption.classList.add("wrong");
    options[correctIndex].classList.add("correct");
    responseText.innerText = "❌ Wrong Answer";
  }

  scoreCount.innerText = `Score: ${score}`;
  responseText.style.display = "block";

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quiz.length) {
      loadQuestion();
    } else {
      finishQuiz();
    }
  }, 1000);
}

// ================= FINISH QUIZ =================
function finishQuiz() {
  questionEl.innerText = "🎉 Quiz Completed!";
  questionEl.style.textAlign = "center";

  optionsList.innerHTML = "";
  responseText.style.display = "block";
  responseText.innerText = `Your Score: ${score} / ${quiz.length}`;
  responseText.style.textAlign = "center";

  restartBtn.style.display = "block";
}

// ================= RESTART =================
restartBtn.onclick = function () {
  currentIndex = 0;
  score = 0;
  scoreCount.innerText = "Score: 0";
  questionEl.style.textAlign = "left";
  loadQuestion();
};

// ================= START =================
loadQuestion();
