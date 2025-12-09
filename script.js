// This is Subha, editing js file to know about branch working process.

const grid = document.getElementById("grid");
const nextNumberSpan = document.getElementById("next-number");
const timerSpan = document.getElementById("timer");
const bestTimeSpan = document.getElementById("best-time");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");

// Celebration elements
const celebration = document.getElementById("celebration");
const playAgainBtn = document.getElementById("play-again");

let nextNumber = 1;
let startTime = null;
let timerInterval = null;
let gameActive = false;
let bestTime = null; // seconds

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createGrid() {
  grid.innerHTML = "";
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8]);

  numbers.forEach((num) => {
    const btn = document.createElement("button");
    btn.classList.add("number-btn");
    btn.textContent = num;
    btn.dataset.value = num;

    btn.addEventListener("click", () => handleNumberClick(btn));

    grid.appendChild(btn);
  });
}

function handleNumberClick(btn) {
  if (!gameActive) {
    // Start timer on first correct click
    if (parseInt(btn.dataset.value, 10) === 1) {
      startGame();
      checkNumber(btn);
    } else {
      showError("Start with 1!");
      shake(btn);
    }
    return;
  }

  checkNumber(btn);
}

function startGame() {
  gameActive = true;
  nextNumber = 1;
  nextNumberSpan.textContent = nextNumber;

  startTime = performance.now();
  timerInterval = setInterval(updateTimer, 100);
  message.textContent = "";
  message.className = "message";
}

function checkNumber(btn) {
  const value = parseInt(btn.dataset.value, 10);

  if (value === nextNumber) {
    btn.classList.add("correct");
    btn.classList.add("disabled");
    btn.disabled = true;

    if (nextNumber === 8) {
      finishGame();
    } else {
      nextNumber++;
      nextNumberSpan.textContent = nextNumber;
    }
  } else {
    showError(`Wrong number! Click ${nextNumber} next.`);
    shake(btn);
  }
}

function finishGame() {
  gameActive = false;
  clearInterval(timerInterval);
  timerInterval = null;

  const totalTime = ((performance.now() - startTime) / 1000).toFixed(1);

  if (bestTime === null || totalTime < bestTime) {
    bestTime = Number(totalTime);
    bestTimeSpan.textContent = `${bestTime.toFixed(1)} s`;
    localStorage.setItem("numberGameBestTime", bestTime.toString());
    showSuccess(`Amazing! You completed 1–8 in ${totalTime} s (new best time).`);
  } else {
    showSuccess(`Good job! You completed 1–8 in ${totalTime} s.`);
  }

  // Disable remaining buttons if any (safety)
  document.querySelectorAll(".number-btn").forEach((btn) => {
    btn.classList.add("disabled");
    btn.disabled = true;
  });

  // 🎉 Show "CONGRATULATIONS NEEHA" overlay with fireworks
  showCelebration();
}

function showCelebration() {
  celebration.classList.remove("hidden");
}

function updateTimer() {
  if (!startTime) return;
  const elapsed = (performance.now() - startTime) / 1000;
  timerSpan.textContent = elapsed.toFixed(1);
}

function resetGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  gameActive = false;
  nextNumber = 1;
  nextNumberSpan.textContent = "1";
  timerSpan.textContent = "0.0";
  message.textContent = "";
  message.className = "message";
  createGrid();
}

function showError(text) {
  message.textContent = text;
  message.className = "message error";
}

function showSuccess(text) {
  message.textContent = text;
  message.className = "message success";
}

function shake(element) {
  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 250);
}

// Load best time from localStorage if available
(function loadBestTime() {
  const saved = localStorage.getItem("numberGameBestTime");
  if (saved) {
    bestTime = Number(saved);
    bestTimeSpan.textContent = `${bestTime.toFixed(1)} s`;
  }
})();

// Initialize game
createGrid();

// Reset button
resetBtn.addEventListener("click", () => {
  resetGame();
  celebration.classList.add("hidden"); // just in case
});

// Play again from celebration overlay
playAgainBtn.addEventListener("click", () => {
  celebration.classList.add("hidden");
  resetGame();
});
greetings:async function fetchGreetings() {
  try {
    const response = await fetch('https://api.example.com/greetings');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.greetings;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return ['Hello', 'Hi', 'Greetings', 'Salutations'];
  }
}