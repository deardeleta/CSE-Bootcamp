// Get DOM elements
const highscoreEl = document.getElementById("high-score");
const currentscoreEl = document.getElementById("current-score");
const guessInput = document.getElementById("guess");
const messageEl = document.getElementById("message");
const guesshistoryEl = document.getElementById("history");
const guessButton = document.getElementById("my-btn");

// Initialize game variables
let answer = Math.floor(Math.random() * 100) + 1;
console.log(answer);
let score = 10;
let guess_history = [];


// Load saved high score from localStorage
var savedHighScore = localStorage.getItem("highscore");
highscoreEl.textContent = savedHighScore ? savedHighScore : 0;

// Confetti function
function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Main game logic
function play() {
  const user_guess = parseInt(guessInput.value);

  const label = document.getElementById("input-label");
  label.classList.add("animate");

// Remove the class so the animation can be triggered again next time
setTimeout(() => {
  label.classList.remove("animate");
}, 600);

  // Validate input
  if (isNaN(user_guess) || user_guess < 1 || user_guess > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  if (guess_history.includes(user_guess)) {
    messageEl.textContent = "🔁 You've already guessed this number. Try again.";
    messageEl.style.color = "#eab308"; // soft yellow
    guessInput.value = "";
    return;
  }  

  // Add guess to history
  guess_history.push(user_guess);
  guesshistoryEl.textContent = "Guess History: " + guess_history.join(", ");

  // Check guess
  if (user_guess === answer) {
    messageEl.textContent = "🎉 Correct! You guessed it!";
    messageEl.style.color = "#16a34a"; // green
    if (score > parseInt(highscoreEl.textContent)) {
      highscoreEl.textContent = score;
      localStorage.setItem("highscore", score);
    }
    document.body.classList.add("win-bg");
    launchConfetti();
    guessButton.disabled = true;
  } else {
    // Incorrect guess
    score -= 1;
    currentscoreEl.textContent = score;

    messageEl.textContent = user_guess < answer ? "📉 Too low!" : "📈 Too high!";
    messageEl.style.color = "#dc2626"; // red
    if (score <= 0) {
      messageEl.textContent = "😞 Game over! The number was " + answer;
      document.querySelector("html").classList.add("lose-bg");
      guessButton.disabled = true;
    }
  }

  // Clear input
  guessInput.value = "";
}

// Attach game function to button
guessButton.onclick = play;

// Reset button logic
document.querySelector(".reset button").addEventListener("click", function () {
  score = 10;
  answer = Math.floor(Math.random() * 100) + 1;
  guess_history = [];
  messageEl.textContent = "";
  currentscoreEl.textContent = score;
  guesshistoryEl.textContent = "Guess History:";
  guessInput.value = "";
  guessButton.disabled = false;
  document.querySelector("html").classList.remove("lose-bg");
  document.body.classList.remove("win-bg");
  messageEl.style.color = "inherit";

});



