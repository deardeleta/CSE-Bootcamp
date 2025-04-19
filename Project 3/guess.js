// Get DOM elements
var highscoreEl = document.getElementById("high-score");
var currentscoreEl = document.getElementById("current-score");
var guessInput = document.getElementById("guess");
var messageEl = document.getElementById("message");
var guesshistoryEl = document.getElementById("history");
var guessButton = document.getElementById("my-btn");

// Game variables
var answer = Math.floor(Math.random() * 100) + 1;
var score = 10;
var guess_history = [];

// Load saved high score from localStorage
var savedHighScore = localStorage.getItem("highscore");
highscoreEl.textContent = savedHighScore ? savedHighScore : 0;

// Confetti function
function launchConfetti() {
  var duration = 2 * 1000;
  var end = Date.now() + duration;

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
  var user_guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(user_guess) || user_guess < 1 || user_guess > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  // Add guess to history
  guess_history.push(user_guess);
  guesshistoryEl.textContent = "Guess History: " + guess_history.join(", ");

  // Check guess
  if (user_guess === answer) {
    messageEl.textContent = "🎉 Correct! You guessed it!";
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

    if (score <= 0) {
      messageEl.textContent = "😞 Game over! The number was " + answer;
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

  messageEl.textContent = "Guess a number between 1 and 100.";
  currentscoreEl.textContent = score;
  guesshistoryEl.textContent = "Guess History:";
  guessInput.value = "";
  guessButton.disabled = false;
  document.body.classList.remove("win-bg");
});



